const TOGETHER_API_KEY = "5316d579348ed5b6554c830bf9ac5417f921f991019bfc04851a28a00d293d2e"; // Optional: dotenv ya manually

const togetherChat = async (userPrompt) => {
  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOGETHER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // Supported model
      messages: [
        {
          role: "system",
          content: "You are a helpful travel planner. ONLY return valid JSON (no markdown or explanation).",
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content || "";

  // JSON Repair Logic
  let tripResp;
  try {
    const match = responseText.match(/\{[\s\S]*\}/); // Extract JSON block
    if (!match) throw new Error("No JSON object found in response.");

    let cleanedJSON = match[0]
      .replace(/\\n/g, "")
      .replace(/\\"/g, '"')
      .replace(/,\s*}/g, "}") // Remove trailing commas
      .replace(/,\s*]/g, "]")
      .trim();

    // Fix unbalanced brackets
    const openBraces = (cleanedJSON.match(/{/g) || []).length;
    const closeBraces = (cleanedJSON.match(/}/g) || []).length;
    const openBrackets = (cleanedJSON.match(/\[/g) || []).length;
    const closeBrackets = (cleanedJSON.match(/]/g) || []).length;

    while (openBraces > closeBraces) cleanedJSON += "}";
    while (openBrackets > closeBrackets) cleanedJSON += "]";

    tripResp = JSON.parse(cleanedJSON);
  } catch (err) {
    console.error("❌ JSON Parse Error:", err);
    console.log("❌ Raw AI Response (malformed JSON):", responseText);
    throw new Error("The AI response was not in valid JSON format.");
  }

  return tripResp;
};

export default togetherChat;

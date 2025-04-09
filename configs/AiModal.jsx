const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Location: New York USA, for 1 Days and 1 Night for Family with a Luxury budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating. descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 1 days and 1 night with each day plan with best time to visit in JSON format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "I cannot provide real-time flight and hotel booking information, including URLs, prices, and availability.  These details change constantly.  I also cannot access and display images directly.  This response provides a structured JSON framework that you can populate with information from your preferred booking sites.  Remember to check for the latest pricing and availability before booking.\n\n```json\n{\n  \"tripName\": \"Luxury New York City Family Getaway (1 Day, 1 Night)\",\n  \"travelDates\": {\n    \"arrival\": \"YYYY-MM-DD\",\n    \"departure\": \"YYYY-MM-DD\"\n  },\n  \"familyMembers\": [\n    {\"name\": \"Member 1\", \"age\": 0},\n    {\"name\": \"Member 2\", \"age\": 0},\n    {\"name\": \"Member 3\", \"age\": 0}\n    //Add more family members as needed\n  ],\n  \"flightDetails\": {\n    \"airline\": \"Airline Name\",\n    \"flightNumber\": \"Flight Number\",\n    \"departureAirport\": \"Departure Airport Code\",\n    \"arrivalAirport\": \"Arrival Airport Code (e.g., JFK, LGA)\",\n    \"departureTime\": \"YYYY-MM-DD HH:MM\",\n    \"arrivalTime\": \"YYYY-MM-DD HH:MM\",\n    \"price\": {\n      \"adult\": 0, \n      \"child\": 0\n    },\n    \"bookingUrl\": \"Insert Booking URL Here (replace with actual URL)\"\n  },\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The Peninsula New York\",\n      \"hotelAddress\": \"700 Fifth Ave, New York, NY 10019\",\n      \"pricePerNight\": 0,  // Replace with actual price from booking site\n      \"hotelImageUrl\": \"Insert Hotel Image URL Here\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.767,\n        \"longitude\": -73.979\n      },\n      \"rating\": 4.5,\n      \"description\": \"Luxury hotel with stunning city views.\",\n      \"nearbyPlaces\": [\n        {\n          \"placeName\": \"Central Park\",\n          \"placeDetails\": \"Iconic park with walking trails, playgrounds, and more.\",\n          \"placeImageUrl\": \"Insert Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": 40.7829,\n            \"longitude\": -73.9654\n          },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"15 minutes\"\n        }\n      ]\n    },\n    {\n      \"hotelName\": \"The Ritz-Carlton New York, Central Park\",\n      \"hotelAddress\": \"50 Central Park South, New York, NY 10019\",\n      \"pricePerNight\": 0, // Replace with actual price\n      \"hotelImageUrl\": \"Insert Hotel Image URL Here\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7646,\n        \"longitude\": -73.9732\n      },\n      \"rating\": 4.8,\n      \"description\": \"Luxury hotel with Central Park views.\",\n      \"nearbyPlaces\": [\n        {\n          \"placeName\": \"MoMA\",\n          \"placeDetails\": \"Museum of Modern Art\",\n          \"placeImageUrl\": \"Insert Image URL Here\",\n          \"geoCoordinates\": {\n            \"latitude\": 40.7614,\n            \"longitude\": -73.9777\n          },\n          \"ticketPricing\": \"Check MoMA website for pricing\",\n          \"travelTime\": \"20 minutes\"\n        }\n      ]\n    }\n    // Add more hotels as needed\n  ],\n  \"dailyPlan\": [\n    {\n      \"day\": 1,\n      \"morning\": {\n        \"activity\": \"Arrive at Hotel, Check-in, Relax\",\n        \"time\": \"08:00 - 11:00\"\n      },\n      \"afternoon\": {\n        \"activity\": \"Visit Central Park or another chosen attraction\",\n        \"time\": \"11:00 - 17:00\"\n      },\n      \"evening\": {\n        \"activity\": \"Fine Dining Experience\",\n        \"time\": \"18:00 - 21:00\"\n      }\n    }\n  ],\n  \"bestTimeToVisit\": \"Spring or Fall for pleasant weather\"\n}\n```\n\nRemember to replace the placeholder values with actual data from your travel planning resources.  Consider using a travel planning website or app to easily gather and organize this information.\n"},
        ],
      },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());

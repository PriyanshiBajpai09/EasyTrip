import { View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import togetherChat from '../../configs/AiModal'; // ✅ import updated
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import Constants from 'expo-constants';

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData) {
      GenerateAiTrip();
    }
  }, [tripData]);

  const GenerateAiTrip = async () => {
    try {
      setLoading(true);

      console.log("🔑 API Key:", Constants.expoConfig.extra?.expoPublicGeminiApiKey || "Not Found");

      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.destination || "Unknown")
        .replaceAll('{totalDays}', tripData.totalNoOfDays)
        .replaceAll('{totalNight}', tripData.totalNoOfDays - 1)
        .replace('{traveler}', tripData.traveler?.title || "Family")
        .replace('{budget}', tripData.budget || "Standard") +
        "\n\nRespond ONLY with a valid minified JSON object. Do not include any explanation, markdown, or extra formatting.";

      console.log("-- ✏️ Final Prompt Sent to Together AI --\n", FINAL_PROMPT);

      const responseText = await togetherChat(FINAL_PROMPT); // ✅ call updated function

      console.log("-- 🧠 Raw AI Response (300 chars)--\n", responseText.slice(0, 300));

      if (!responseText || responseText.length < 20) {
        throw new Error("AI response was empty or too short.");
      }

      let tripResp;
      try {
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}');
        const cleanedJSON = responseText.slice(jsonStart, jsonEnd + 1);
        tripResp = JSON.parse(cleanedJSON);
      } catch (err) {
        console.error("❌ JSON Parse Error:", err);
        console.log("❌ Raw AI Response (malformed JSON):", responseText);
        throw new Error("The AI response was not in valid JSON format.");
      }

      const docId = Date.now().toString();
      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user?.email || "guest",
        tripPlan: tripResp,
        tripData: JSON.stringify(tripData),
        createdAt: new Date().toISOString(),
        docId: docId,
      });

      router.push('(tabs)/mytrip');
    } catch (error) {
      console.error("🔥 Error while generating trip:", error.message || error);
      Alert.alert(
        "Trip Generation Failed",
        "Sorry! Something went wrong while generating your trip. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      backgroundColor: Colors.WHITE,
      height: '100%',
      justifyContent: 'center'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 35,
        textAlign: 'center'
      }}>
        Please Wait...
      </Text>

      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
      }}>
        We are working to generate your dream trip
      </Text>

      <Image 
        source={require('./../../assets/images/plane.gif')}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'contain',
          marginTop: 20,
        }}
      />

      <ActivityIndicator 
        size={'large'} 
        style={{ marginTop: 50 }} 
        color={Colors.PRIMARY} 
      />

      <Text style={{
        fontFamily: 'outfit',
        color: Colors.GRAY,
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20
      }}>
        Do not go back or close the app
      </Text>
    </View>
  );
}

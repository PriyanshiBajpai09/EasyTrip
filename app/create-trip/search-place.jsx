import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  const fetchLocations = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${text}`,
          {
            headers: {
              "User-Agent": "YourAppName/1.0 (your@email.com)", // Replace with your app details
            },
          }
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <TextInput
        placeholder="Search Place"
        value={query}
        onChangeText={fetchLocations}
        style={{
          height: 50,
          borderWidth: 1,
          borderColor: Colors.GRAY,
          borderRadius: 5,
          paddingHorizontal: 10,
        }}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setTripData({ ...tripData, location: item.display_name });
              router.push('/create-trip/select-traveler'); // 🔥 Fixed Route
            }}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: Colors.LIGHT_GRAY,
            }}
          >
            <Text>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

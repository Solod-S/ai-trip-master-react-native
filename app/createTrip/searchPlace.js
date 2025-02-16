import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "../../context";

export default function SearchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
      headerBackTitleVisible: false,
      headerBackTitle: "back",
      headerTintColor: "black",
    });
  }, []);

  useEffect(() => {
    console.log(`tripData`, tripData);
  }, [tripData]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        padding: 20,
        paddingTop: 60,
      }}
      edges={["top"]}
    >
      <GooglePlacesAutocomplete
        placeholder="Search Place"
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          setTripData({
            name: data.description,
            coordinates: details?.geometry.location,
            photoRef: details?.photos[0]?.photo_reference,
            url: details?.url,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
        styles={{
          textInputContainer: {
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 20,
          },
        }}
      />
    </SafeAreaView>
  );
}

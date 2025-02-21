import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "../../context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Text, View } from "react-native";

export default function SearchPlace() {
  const route = useRouter();
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      // headerTitle: "Search",
      headerTitle: "",
      headerBackTitleVisible: false,
      headerBackTitle: "back",
      headerTintColor: "black",
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        padding: 20,
        paddingTop: 40,
      }}
      edges={["top"]}
    >
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(4) }}>
          Choose place
        </Text>
      </View>

      <GooglePlacesAutocomplete
        placeholder="Search Place"
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          setTripData({
            locationInfo: {
              name: data.description,
              coordinates: details?.geometry.location,
              photoRef: details?.photos[0]?.photo_reference,
              url: details?.url,
            },
          });
          route.push("createTrip/selectTraveler");
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

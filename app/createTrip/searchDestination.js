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
import { Platform, Text, ToastAndroid, View } from "react-native";
import Toast from "react-native-toast-message";

const isIphone = Platform.OS === "ios";

export default function SearchDestination() {
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
          Destination:
        </Text>
      </View>

      <GooglePlacesAutocomplete
        placeholder="Search Place"
        enablePoweredByContainer={false}
        minLength={2}
        fetchDetails={true}
        onPress={(data, details = null) => {
          try {
            if (
              !details?.photos?.[0]?.photo_reference ||
              !data.description ||
              !details?.geometry?.location ||
              !details?.photos[0]?.photo_reference ||
              !details?.url
            ) {
              if (isIphone) {
                Toast.show({
                  type: "error",
                  position: "top",
                  text1: "This location cannot be selected...",
                  //  text2: "",
                  visibilityTime: 2000,
                  autoHide: true,
                  topOffset: 50,
                });
              } else {
                ToastAndroid.show(
                  "This location cannot be selected...",
                  ToastAndroid.LONG
                );
              }
              return;
            }

            setTripData(prev => ({
              ...prev,
              locationInfo: {
                name: data.description,
                coordinates: details?.geometry.location,
                photoRef: details?.photos[0]?.photo_reference,
                url: details?.url,
              },
            }));
            route.push("createTrip/selectTraveler");
          } catch (error) {
            if (isIphone) {
              Toast.show({
                type: "error",
                position: "top",
                text1: "This location cannot be selected...",
                //  text2: "",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
              });
            } else {
              ToastAndroid.show(
                "This location cannot be selected...",
                ToastAndroid.LONG
              );
            }
          }
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

import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "../../context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";

const isIphone = Platform.OS === "ios";

export default function SearchStartLocation() {
  const navigation = useNavigation();
  const router = useRouter();
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
      <View style={{ marginTop: 10, flex: 1 }}>
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(4) }}>
          Start Location:
        </Text>
        <GooglePlacesAutocomplete
          placeholder="Search Source Location"
          enablePoweredByContainer={false}
          minLength={2}
          debounce={200}
          fetchDetails={true}
          onFail={error => console.log(error)}
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
                    text2: "This location cannot be selected...",
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

              setTripData({
                srcLocationInfo: {
                  name: data.description,
                  coordinates: details?.geometry.location,
                  photoRef: details?.photos[0]?.photo_reference,
                  url: details?.url,
                },
              });

              router.push("/createTrip/searchDestination");
            } catch (error) {
              if (isIphone) {
                Toast.show({
                  type: "error",
                  position: "top",
                  text2: "This location cannot be selected...",
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
              borderColor: Colors.black,
              borderRadius: 5,
              marginTop: 25,
            },
            textInput: {
              marginBottom: 0,
            },
            listView: {
              position: "absolute",
              top: 80,
              left: -10,
              zIndex: 2, // Bring the dropdown in front of other components
              backgroundColor: Colors.white, // Ensure it's not transparent
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
}

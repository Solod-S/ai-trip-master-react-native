import { Platform, Text, ToastAndroid, View } from "react-native";
import axios from "axios";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "../../context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { db, auth } from "../../config/fireBaseConfig";
import moment from "moment";
import { Loading } from "../../components/CreateTrip";
import { chatSession, prompt, openAIprompt } from "../../config/GeminiResponse";
import { UsePreventBack } from "../../hooks";
import { generateTripWithGeminiAI, generateTripWithOpenAI } from "../../utils";

const isIphone = Platform.OS === "ios";

export default function GenerateTrip() {
  const router = useRouter();
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext);
  const [isLoading, setIsLoading] = useState();
  const user = auth.currentUser;

  // const GenerateAITrip = async () => {
  //   setIsLoading(true);
  //   try {
  //     let generatedSuccess = null;
  //     const openAIresult = await generateTripWithOpenAI(tripData);

  //     if (openAIresult) {
  //       generatedSuccess = true;
  //     } else {
  //       const geminiAIresult = await generateTripWithGeminiAI(tripData);

  //       if (geminiAIresult) {
  //         generatedSuccess = true;
  //       }
  //     }

  //     if (!generatedSuccess) {
  //       if (isIphone) {
  //         Toast.show({
  //           type: "error",
  //           position: "top",
  //           text2: "Error Occurred! AI could not create trip.",
  //           //  text2: "",
  //           visibilityTime: 2000,
  //           autoHide: true,
  //           topOffset: 50,
  //         });
  //       } else {
  //         ToastAndroid.show("Error Occurred! AI could not create trip.");
  //       }

  //       router.replace("/createTrip/generateTripError");
  //       return;
  //     }

  //     router.replace("(tabs)/myTrips");
  //   } catch (error) {
  //     console.error(
  //       "An error occurred in Gemini response/ Firebase save:",
  //       error
  //     );
  //     router.replace("/createTrip/generateTripError");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const GenerateAITrip = async () => {
    setIsLoading(true);

    try {
      let generatedSuccess = await attemptToGenerateTrip();

      if (!generatedSuccess) {
        handleGenerationError();
        return;
      }

      router.replace("(tabs)/myTrips");
    } catch (error) {
      console.error(
        "An error occurred in Gemini response/ Firebase save:",
        error
      );
      router.replace("/createTrip/generateTripError");
    } finally {
      setIsLoading(false);
    }
  };

  const attemptToGenerateTrip = async () => {
    const geminiAIresult = await generateTripWithGeminiAI(tripData);
    if (geminiAIresult) {
      return true;
    }
    const openAIresult = await generateTripWithOpenAI(tripData);
    return openAIresult ? true : false;
  };

  const handleGenerationError = () => {
    const errorMessage = "Error Occurred! AI could not create trip.";

    if (isIphone) {
      Toast.show({
        type: "error",
        position: "top",
        text2: errorMessage,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    } else {
      ToastAndroid.show(errorMessage);
    }

    router.replace("/createTrip/generateTripError");
  };

  UsePreventBack();

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      headerLeft: () => null,
    });
  }, [navigation]);

  useEffect(() => {
    if (
      !tripData ||
      !tripData.locationInfo ||
      !tripData.travelerCount ||
      !tripData.startDate ||
      !tripData.endDate
    ) {
      console.error("Invalid trip data:", tripData);
      if (isIphone) {
        Toast.show({
          type: "error",
          position: "top",
          text2: "Incomplete trip data. Please go back and try again.",
          //  text2: "",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
      } else {
        ToastAndroid.show(
          "Incomplete trip data. Please go back and try again.",
          ToastAndroid.LONG
        );
      }

      return;
    }
    GenerateAITrip();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        padding: 20,
        paddingTop: 50,
        gap: 30,
        alignItems: "center",
      }}
      edges={["top"]}
    >
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(4) }}>
          Please Wait...
        </Text>
        <Text
          style={{
            marginTop: 40,
            fontFamily: "outfit-bolt",
            fontSize: hp(2.5),
            textAlign: "center",
          }}
        >
          We are working to generate your dream trip
        </Text>
        <View style={{ width: wp(100) }}>
          <Loading />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "outfit-bolt",
            fontSize: hp(2.5),
            textAlign: "center",
            color: Colors.gray,
          }}
        >
          Do not Go Back
        </Text>
      </View>
    </SafeAreaView>
  );
}

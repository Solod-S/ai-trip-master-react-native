import {
  FlatList,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
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
import { LoadingV2 } from "../../components/CreateTrip";
import { chatSession, prompt } from "../../config/GeminiResponse";
import { UsePreventBack } from "../../hooks";

const isIphone = Platform.OS === "ios";

export default function GenerateTripError() {
  const route = useRouter();
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [isLoading, setIsLoading] = useState();
  const user = auth.currentUser;

  UsePreventBack();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        padding: 20,
        paddingTop: 30,
        gap: 30,
        alignItems: "center",
      }}
      edges={["top"]}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "outfit-bolt",
            fontSize: hp(4),
            color: Colors.red,
          }}
        >
          Oops!
        </Text>
        {/* <Text
          style={{
            marginTop: 40,
            fontFamily: "outfit-bolt",
            fontSize: hp(2.5),
            textAlign: "center",
          }}
        >
          We couldn't generate your trip. Please adjust your trip details or try
          again later.
        </Text> */}
        <View style={{ width: wp(100), marginTop: 20 }}>
          <LoadingV2 />
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
          We couldn't generate your trip. Please adjust your trip details or try
          again later.
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          onPress={() => route.push("/myTrip")}
          style={{
            padding: 15,
            paddingHorizontal: 30,
            backgroundColor: Colors.primary,
            borderRadius: 25,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.white,
              fontFamily: "outfit-medium",
              fontSize: hp(2.5),
            }}
          >
            Go Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

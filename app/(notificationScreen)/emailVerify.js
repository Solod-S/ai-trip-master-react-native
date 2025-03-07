import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { Colors } from "../../constants/Colors";

export default function GenerateTripError() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        padding: 20,
        paddingTop: 30,
        gap: 30,
        alignItems: "center",
      }}
      edges={["top"]}
    >
      <View style={{ alignItems: "center" }}>
        <Animated.Text
          entering={FadeInDown.delay(200).springify()}
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: hp(3.2),
            fontFamily: "outfit-bolt",
          }}
        >
          Verify Your Email
        </Animated.Text>

        <View style={{ width: wp(80), marginTop: 20 }}>
          <View style={{ aspectRatio: 1 }}>
            <LottieView
              style={{ flex: 1 }}
              source={require("../../assets/images/email.json")}
              autoPlay
              loop
              speed={0.7}
            />
          </View>
        </View>
      </View>
      <Animated.View entering={FadeInDown.delay(300).springify()}>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: hp(2),
            color: "gray",
            fontFamily: "outfit",
          }}
        >
          Please check your email and verify your account before proceeding. If
          you haven't received a verification email, please check your spam
          folder or resend the email from your account settings.
        </Text>
      </Animated.View>
      <Animated.View
        style={{ width: "100%" }}
        entering={FadeInDown.delay(400).springify()}
      >
        <TouchableOpacity
          onPress={() => router.replace("home")}
          // emailVerify
          style={{
            marginTop: hp(4),
            padding: 15,
            backgroundColor: "black",
            borderRadius: 99,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.white,
              fontFamily: "outfit",
              fontSize: wp(5),
            }}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

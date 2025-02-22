import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  FadeIn,
  FadeInUp,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

export function Login() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
        style="light"
      />
      <Animated.Image
        entering={FadeInUp.delay(100).duration(500).springify()}
        style={{ width: wp(100), height: hp(65) }}
        source={require("../assets/images/login.jpg")}
      />
      <Animated.View
        style={styles.container}
        entering={FadeInDown.delay(100).duration(500).springify()}
      >
        <Animated.Text
          entering={FadeInDown.delay(200).duration(500).springify()}
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: hp(3.2),
            fontFamily: "outfit-bolt",
          }}
        >
          Ai Trip Master
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(300).duration(500).springify()}
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: hp(2),
            color: "gray",
            fontFamily: "outfit",
          }}
        >
          Plan your perfect trip with the power of AI. Get personalized
          recommendations and travel insights effortlessly!
        </Animated.Text>
        <TouchableOpacity
          onPress={() => router.push("auth/login")}
          style={styles.button}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.white,
              fontFamily: "outfit",
              fontSize: wp(5),
            }}
          >
            Sign In By Email
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    marginTop: -20,
    padding: 22,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  button: {
    marginTop: hp(4),
    padding: 15,
    backgroundColor: "black",
    borderRadius: 99,
  },
});

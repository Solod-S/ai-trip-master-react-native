import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export function Login() {
  const router = useRouter();
  return (
    <View>
      <Image
        style={{ width: wp(100), height: hp(60) }}
        source={require("../assets/images/login2.jpg")}
      />
      <View style={styles.container}>
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: hp(3.2),
            fontFamily: "outfit-bolt",
          }}
        >
          Ai Trip Master
        </Text>
        <Text
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
        </Text>
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
      </View>
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
  },
  button: {
    marginTop: "20%",
    padding: 15,
    backgroundColor: "black",
    borderRadius: 99,
  },
});

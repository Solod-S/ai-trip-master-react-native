import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";

export default function LogIn() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, paddingTop: 10 }}
      edges={["top"]}
    >
      <View style={{ padding: 25 }}>
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(3.5) }}>
          Let's Sign You In
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: hp(3.5),
            color: Colors.gray,
            marginTop: 20,
          }}
        >
          Welcome Back
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: hp(3.5),
            color: Colors.gray,
            marginTop: 20,
          }}
        >
          You've been missed
        </Text>
      </View>
    </SafeAreaView>
  );
}

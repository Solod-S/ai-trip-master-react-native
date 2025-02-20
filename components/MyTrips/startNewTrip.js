import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export function StartNewTrip() {
  const route = useRouter();
  return (
    <View
      style={{
        padding: 15,
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Ionicons name="location" size={30} color="black" />
      <Text style={{ fontFamily: "outfit-medium", fontSize: hp(3) }}>
        No trips scheduled yet
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: hp(2),
          textAlign: "center",
          color: Colors.gray,
        }}
      >
        Looks like it's time to plan your next adventure. Start now and create
        unforgettable memories!
      </Text>
      <TouchableOpacity
        onPress={() => route.push("/createTrip/searchPlace")}
        style={{
          padding: 15,
          paddingHorizontal: 30,
          backgroundColor: Colors.primary,
          borderRadius: 25,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: hp(2.5),
            textAlign: "center",
            color: Colors.white,
          }}
        >
          Start new trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}

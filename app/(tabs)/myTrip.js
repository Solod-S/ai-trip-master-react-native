import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StartNewTrip } from "../../components";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        padding: 20,
        paddingTop: 10,
      }}
      edges={["top"]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(3.5) }}>
          myTrip
        </Text>
        <Ionicons name="add-circle" size={40} color="black" />
      </View>
      {userTrips?.length === 0 ? <StartNewTrip /> : null}
    </SafeAreaView>
  );
}

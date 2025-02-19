import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../constants/Colors";

export function OptionCard({ option, SelectBudgetOption }) {
  return (
    <View
      style={[
        {
          padding: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: Colors.lightGray,
          borderRadius: 15,
        },
        SelectBudgetOption?.id === option.id && { borderWidth: 3 },
      ]}
    >
      <View>
        <Text style={{ fontFamily: "outfit-bold", fontSize: hp(3) }}>
          {option.title}
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: hp(2), color: Colors.gray }}
        >
          {option.desc}
        </Text>
      </View>
      <Text style={{ fontSize: hp(4), color: Colors.gray }}>{option.icon}</Text>
    </View>
  );
}

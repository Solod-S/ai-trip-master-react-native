import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const TransportInfo = ({ transportData }) => {
  return (
    transportData && (
      <View
        style={{
          marginTop: 20,
          backgroundColor: Colors.lightGray,
          padding: 15,
          borderRadius: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: hp(2.8),
            }}
          >
            Transport
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          {transportData.map((data, index) => (
            <View
              style={{
                marginTop: 10,
              }}
              key={index}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: hp(1.8),
                }}
              >
                {data.mode_of_transportation}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit-semibold",
                  fontSize: hp(1.8),
                  color: Colors.gray,
                }}
              >
                ≈ {data.price_estimate} {data.currency}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
  );
};

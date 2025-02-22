import { View, Text, Linking } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const FlightInfo = ({ flightData }) => {
  const handleExternalLink = data => {
    if (data?.booking_url?.includes("example.com")) {
      const query = encodeURIComponent(data.airline);
      const googleSearchUrl = `https://www.google.com/search?q=${query}`;
      Linking.openURL(googleSearchUrl).catch(err =>
        alert("Failed to open URL", err.message)
      );
    } else {
      Linking.openURL(data?.booking_url).catch(err =>
        alert("Failed to open URL", err.message)
      );
    }
  };

  return (
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
          Flights
        </Text>
      </View>

      {flightData &&
        flightData.map((data, index) => (
          <View
            key={index}
            style={{
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit",
                    fontSize: hp(1.8),
                  }}
                >
                  {data.airline} ✈️
                </Text>

                <Text
                  style={{
                    fontFamily: "outfit-semibold",
                    fontSize: hp(1.8),
                    color: Colors.gray,
                  }}
                >
                  Cost: ≈ {data.price}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleExternalLink(data)}
                style={{
                  backgroundColor: Colors.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit",
                    fontSize: hp(1.8),
                    color: Colors.white,
                    textAlign: "center",
                  }}
                >
                  Book Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
    </View>
  );
};

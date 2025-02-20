import {
  FlatList,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
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
import moment from "moment";

const isIphone = Platform.OS === "ios";

export default function ReviewTrip() {
  const route = useRouter();
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      // headerTitle: "Trip Review",
      headerTitle: "",
      headerBackTitleVisible: false,
      headerBackTitle: "back",
      headerTintColor: "black",
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        padding: 20,
        paddingTop: 50,
        gap: 60,
      }}
      edges={["top"]}
    >
      {/* Header */}
      <View>
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(4) }}>
          Review your trip
        </Text>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(2) }}>
            Review before generating your trip.
          </Text>
        </View>
      </View>

      {/* Data */}
      <View>
        {/* Place info */}
        <View
          style={{
            // marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="location-sharp" size={34} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: hp(2.5),
                color: Colors.gray,
              }}
            >
              Destination
            </Text>
            <Text style={{ fontFamily: "outfit-medium", fontSize: hp(2.5) }}>
              {tripData?.locationInfo?.name}
            </Text>
          </View>
        </View>

        {/* Dates info */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="calendar-sharp" size={34} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: hp(2.5),
                color: Colors.gray,
              }}
            >
              Travel date
            </Text>
            <Text style={{ fontFamily: "outfit-medium", fontSize: hp(2.2) }}>
              {moment(tripData?.startDate).format("DD MMM") +
                " - " +
                moment(tripData?.endDate).format("DD MMM YYYY")}{" "}
              ({tripData?.totalNoOfDays} day(s))
            </Text>
          </View>
        </View>

        {/* Who is Traveling */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="bus" size={34} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: hp(2.5),
                color: Colors.gray,
              }}
            >
              Who is Traveling
            </Text>
            <Text style={{ fontFamily: "outfit-medium", fontSize: hp(2.2) }}>
              {tripData?.travelerCount?.title}
            </Text>
          </View>
        </View>

        {/* Budget */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <Ionicons name="cash" size={34} color="black" />
          <View>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: hp(2.5),
                color: Colors.gray,
              }}
            >
              Budget
            </Text>
            <Text style={{ fontFamily: "outfit-medium", fontSize: hp(2.2) }}>
              {tripData?.budget?.title}
            </Text>
          </View>
        </View>
      </View>

      {/* Btn */}
      <View>
        <TouchableOpacity
          disabled={!tripData}
          onPress={() => route.replace("/createTrip/generateTrip")}
          style={{
            padding: 15,
            paddingHorizontal: 30,
            backgroundColor: Colors.primary,
            borderRadius: 25,
            marginTop: 20,
            opacity: !tripData ? 0.1 : 1,
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
            Generate My Trip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

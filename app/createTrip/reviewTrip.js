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
import { SelectBudgetOptions } from "../../constants/Options";
import { OptionCard } from "../../components/CreateTrip";
import moment from "moment";

const isIphone = Platform.OS === "ios";

export default function ReviewTrip() {
  const route = useRouter();
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);

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
        paddingTop: 60,
      }}
      edges={["top"]}
    >
      <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(4) }}>
        Review your trip
      </Text>

      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(2) }}>
          Review before generating your trip.
        </Text>
        {/* Place info */}
        <View
          style={{
            marginTop: 20,
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
      </View>
    </SafeAreaView>
  );
}

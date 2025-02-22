import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { CreateTripContext } from "../../context";
import {
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import moment from "moment/moment";
import Toast from "react-native-toast-message";

const isIphone = Platform.OS === "ios";

export default function selectDates() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const route = useRouter();
  const navigation = useNavigation();
  const { setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      // headerTitle: "Select Dates",
      headerTitle: "",
      headerBackTitleVisible: false,
      headerBackTitle: "back",
      headerTintColor: "black",
    });
  }, []);

  const handleDateSelectionContinue = () => {
    if (!startDate || !endDate) {
      if (isIphone) {
        Toast.show({
          type: "info",
          position: "top",
          text1: "Please select Start and End Date",
          //  text2: "",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
      } else {
        ToastAndroid.show(
          "Please select Start and End Date",
          ToastAndroid.LONG
        );
      }
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, "days");
    if (isNaN(totalNoOfDays)) {
      if (isIphone) {
        Toast.show({
          type: "info",
          position: "top",
          text1: "Please select Start and End Date",
          //  text2: "",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
      } else {
        ToastAndroid.show(
          "Please select Start and End Date",
          ToastAndroid.LONG
        );
      }
      return;
    }

    setTripData(prev => ({
      ...prev,
      startDate,
      endDate,
      totalNoOfDays: totalNoOfDays + 1,
    }));
    route.push("/createTrip/selectBudget");
  };
  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else if (type === "END_DATE") {
      setEndDate(moment(date));
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        paddingTop: 50,
      }}
      edges={["top"]}
    >
      <Text
        style={{
          paddingHorizontal: 20,
          fontFamily: "outfit-bolt",
          fontSize: hp(4),
        }}
      >
        Who's Traveling:
      </Text>
      <View style={{ marginTop: 30 }}>
        <CalendarPicker
          // previousTitle={null}
          // nextTitle={null}
          allowRangeSelection={true}
          onDateChange={onDateChange}
          minDate={new Date()}
          maxRangeDuration={7}
          // scrollable={true}
          selectedDayTextStyle={{ color: Colors.white }}
          selectedRangeStyle={{ backgroundColor: Colors.primary }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          disabled={!endDate || !startDate}
          onPress={() => handleDateSelectionContinue()}
          style={{
            padding: 15,
            paddingHorizontal: 30,
            backgroundColor: Colors.primary,
            borderRadius: 25,
            marginTop: 35,
            opacity: !endDate || !startDate ? 0.1 : 1,
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
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

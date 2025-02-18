import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "../../context";
import { Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function selectDates() {
  const route = useRouter();
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Select Dates",
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
        Who's Traveling
      </Text>
      <View style={{ marginTop: 30 }}>
        <CalendarPicker
          allowRangeSelection={true}
          onDateChange={this.onDateChange}
        />
      </View>
    </SafeAreaView>
  );
}

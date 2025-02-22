import { View, Text, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { TripScheduleTimeline } from "../../components/tripSchedule";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function TripSchedule() {
  const navigation = useNavigation();
  const router = useRouter();

  const [parsedItinerary, setParsedItinerary] = useState();
  const { itinerary } = useLocalSearchParams();

  useEffect(() => {
    if (itinerary) {
      const parsedItineraryObject = JSON.parse(itinerary);
      // console.log(
      //   "Parsed Itinerary Object:",
      //   parsedItineraryObject,
      //   typeof parsedItineraryObject
      // );
      setParsedItinerary(parsedItineraryObject);
    }
  }, [itinerary]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      // headerTitle: "Search",
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
      }}
      edges={["top"]}
    >
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.mainView}>
          <Text style={styles.mainViewText}>Trip Schedule</Text>

          <View style={styles.itineraryView}>
            {parsedItinerary?.map((itinerary, index) => (
              <TripScheduleTimeline
                key={index}
                singleParsedItinerary={itinerary}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TripSchedule;

const styles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
    // paddingBottom: 100,
  },
  backButton: {
    marginBottom: 10,
    marginLeft: 20,
  },
  mainView: {
    padding: 20,
  },
  mainViewText: {
    fontFamily: "outfit-bold",
    fontSize: 25,
    fontSize: hp(4),
  },
  itineraryView: {
    marginTop: 35,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
});

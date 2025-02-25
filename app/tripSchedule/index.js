import { View, Text, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { TripScheduleTimeline } from "../../components/tripSchedule";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

function TripSchedule() {
  const navigation = useNavigation();

  const [parsedItinerary, setParsedItinerary] = useState();
  const { itinerary } = useLocalSearchParams();

  useEffect(() => {
    if (itinerary) {
      const parsedItineraryObject = JSON.parse(itinerary);
      setParsedItinerary(parsedItineraryObject);
    }
  }, [itinerary]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: false,
      // headerTitle: "Search",
      headerTitle: "Trip Schedule",
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
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainView}>
          {/* <Text style={styles.mainViewText}>Trip Schedule</Text> */}

          <View style={styles.itineraryView}>
            {parsedItinerary?.map((itinerary, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.duration(400)
                  .delay(index * 200)
                  .springify()
                  .damping(6)}
              >
                <TripScheduleTimeline singleParsedItinerary={itinerary} />
              </Animated.View>
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
    padding: 10,
  },
  mainViewText: {
    fontFamily: "outfit-bold",
    fontSize: hp(4),
  },
  itineraryView: {
    marginTop: 35,
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
});

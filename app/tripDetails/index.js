import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import {
  FlightInfo,
  HotelInfo,
  TransportInfo,
  PlacesInfo,
  RestaurantInfo,
} from "../../components/TripDetails";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import moment from "moment";

function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();

  const [imgUrl, setImgUrl] = useState("");
  const [parsedTrip, setParsedTrip] = useState(null);
  const [parsedTripData, setParsedTripData] = useState(null);

  useEffect(() => {
    if (trip) {
      try {
        const tripObject = typeof trip === "string" ? JSON.parse(trip) : trip;
        setParsedTrip(tripObject);
        if (tripObject?.tripData) {
          const tripDataObject =
            typeof tripObject.tripData === "string"
              ? JSON.parse(tripObject.tripData)
              : tripObject.tripData;
          setParsedTripData(tripDataObject);
        }
      } catch (error) {
        console.error("Error parsing trip or tripData:", error);
      }
    }
  }, [trip]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: false,
      headerTitle: "Trip Details",
      headerBackTitleVisible: false,
      headerBackTitle: "back",
      headerTintColor: "black",
    });
  }, []);

  useEffect(() => {
    if (parsedTripData?.locationInfo?.photoRef) {
      const photoRef = parsedTripData.locationInfo.photoRef;
      const placesImageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1500&photoreference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}`;

      fetch(placesImageURL, { method: "HEAD" })
        .then(response => {
          if (response.ok) {
            setImgUrl(placesImageURL);
          } else {
            console.warn(`Image not available (status: ${response.status})`);
          }
        })
        .catch(error => console.error("Error checking image:", error));
    }
  }, [parsedTripData]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        // alignItems: "center",
      }}
      edges={["top"]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {imgUrl ? (
          <Image style={styles.image} source={{ uri: imgUrl }} />
        ) : (
          <Image
            source={require("../../assets/images/vacation.jpg")}
            style={styles.defaultImage}
          />
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.tripName}>
            {parsedTripData?.locationInfo?.name || "No Name Available"}
          </Text>
          <Text style={styles.tripDates}>
            {moment(parsedTripData?.startDate).format("DD MMM, yyyy") ||
              "1st January 2024"}{" "}
            to{" "}
            {moment(parsedTripData?.endDate).format("DD MMM, yyyy") ||
              "1st January 2024"}
          </Text>

          <View style={styles.travellerInfo}>
            {parsedTripData?.travelerCount?.icon === "/images/family.png" ? (
              <Image
                style={styles.icon}
                source={require("../../assets/images/family.png")}
              />
            ) : (
              <Text style={styles.iconText}>
                {parsedTripData?.travelerCount?.icon}
              </Text>
            )}
            <Text style={styles.travellerCount}>
              {parsedTripData?.travelerCount?.people}
            </Text>
          </View>

          {/* <Text style={styles.budget}>{parsedTripData?.budget} Package</Text> */}

          {/* Flight Info */}
          <FlightInfo flightData={parsedTrip?.tripDetails?.flights} />

          {/* Hotels Info */}
          <HotelInfo hotelData={parsedTrip?.tripDetails?.hotels} />

          {/* Transport Info */}
          <TransportInfo
            transportData={parsedTrip?.tripDetails?.local_transportation}
          />

          {/* Places Info */}
          <PlacesInfo placesData={parsedTrip?.tripDetails?.places_to_visit} />

          {/* Restaurant Info */}
          <RestaurantInfo
            restaurantData={parsedTrip?.tripDetails?.restaurants}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TripDetails;

const styles = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
    // paddingBottom: 100,
  },
  backButton: {
    marginBottom: 10,
    marginLeft: 20,
  },
  image: {
    width: wp(100),
    height: hp(40),
    borderRadius: 15,
  },
  defaultImage: {
    width: wp(100),
    height: hp(40),
    borderRadius: 15,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: Colors.white,
    height: "100%",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "column",
    gap: 3,
  },
  tripName: {
    fontFamily: "outfit-bold",
    fontSize: hp(3.5),
    color: Colors.primary,
  },
  tripDates: {
    fontFamily: "outfit",
    fontSize: hp(1.8),
    color: Colors.gray,
  },
  travellerInfo: {
    flexDirection: "row",
    gap: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconText: {
    fontSize: hp(2),
  },
  travellerCount: {
    fontFamily: "outfit",
    fontSize: hp(1.8),
    color: Colors.gray,
  },
  budget: {
    fontFamily: "outfit",
    fontSize: hp(1.8),
    color: Colors.gray,
  },
});

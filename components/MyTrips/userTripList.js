import { View, Image, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./userTripCard";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const UserTripList = ({ userTrips }) => {
  const router = useRouter();
  const [parsedTripData, setParsedTripData] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (userTrips?.length > 0) {
      console.log(`userTrips?.length`, userTrips?.length);
      const parsed = JSON.parse(userTrips[0]?.tripData);
      setParsedTripData(parsed);
    }
  }, [userTrips]);

  useEffect(() => {
    if (parsedTripData) {
      const photoRef = parsedTripData?.locationInfo?.photoRef;

      if (photoRef) {
        const placesImageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1500&photoreference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}`;
        setImgUrl(placesImageURL);
      }
    }
  }, [parsedTripData]);

  if (!parsedTripData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <View style={{ marginTop: 20 }}>
        {imgUrl ? (
          <Image
            style={{
              width: "100%",
              height: 240,
              height: hp(29),
              borderRadius: 15,
            }}
            source={{ uri: imgUrl }}
          />
        ) : (
          <Image
            source={require("../../assets/images/vacation.jpg")}
            style={{
              width: "100%",
              height: hp(29),
              borderRadius: 15,
            }}
          />
        )}
        <View
          style={{
            marginTop: 0,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-semibold",
              fontSize: hp(2.4),
            }}
          >
            {parsedTripData?.locationInfo?.name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: hp(1.8),
              color: Colors.gray,
            }}
          >
            {moment(parsedTripData?.startDate).format("DD MMM yyyy")}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {
              <Text style={{ fontSize: hp(1.4), fontFamily: "outfit-medium" }}>
                {parsedTripData?.travelerCount?.icon}
              </Text>
            }
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: hp(1.8),
                color: Colors.gray,
              }}
            >
              {parsedTripData?.travelerCount?.title}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/tripDetails",
              params: { trip: JSON.stringify(userTrips[0]) },
            })
          }
          activeOpacity={0.7}
          style={{
            backgroundColor: Colors.primary,
            padding: 15,
            borderRadius: 15,
            marginVertical: 18,
          }}
        >
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: hp(1.8),
            }}
          >
            Travel Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/complete-itinerary",
              params: {
                itinerary: JSON.stringify(userTrips[0]?.tripDetails?.itinerary),
              },
            })
          }
          activeOpacity={0.7}
          style={{
            backgroundColor: Colors.primary,
            padding: 15,
            borderRadius: 15,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: Colors.white,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: hp(1.8),
            }}
          >
            Complete Itinerary
          </Text>
        </TouchableOpacity>

        {userTrips.map((trip, index) => (
          <UserTripCard key={index} trip={trip} />
        ))}
      </View>
    </View>
  );
};

export default UserTripList;

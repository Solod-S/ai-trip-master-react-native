import { View, Text } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../../utils";

const UserTripCard = ({ trip }) => {
  const [parsedTripData, setParsedTripData] = useState();
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (trip && trip?.tripData) {
      const parsed = JSON.parse(trip.tripData);
      setParsedTripData(parsed);
    }
  }, [trip]);

  useEffect(() => {
    if (parsedTripData) {
      const photoRef = parsedTripData?.locationInfo?.photoRef;
      if (photoRef) {
        const placesImageURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1500&photoreference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}`;
        //console.log("Places Image URL:", placesImageURL);
        setImgUrl(placesImageURL);
      }
    }
  }, [parsedTripData]);

  return (
    parsedTripData && (
      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        {imgUrl ? (
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
            source={{ uri: imgUrl }}
            placeholder={blurhash}
            transition={500}
          />
        ) : (
          <Image
            source={require("../../assets/images/vacation.jpg")} // Fallback image
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
            placeholder={blurhash}
            transition={500}
          />
        )}

        <View>
          <Text
            style={{
              fontFamily: "outfit-semibold",
              fontSize: hp(2.4),
            }}
          >
            {parsedTripData?.locationInfo?.name}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: hp(1.8),
              color: Colors.gray,
            }}
          >
            {moment(parsedTripData?.startDate).format("DD MMM yyyy")}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: hp(1.8),
              color: Colors.gray,
            }}
          >
            {parsedTripData?.travelerCount?.title}
          </Text>
        </View>
      </View>
    )
  );
};

export default UserTripCard;

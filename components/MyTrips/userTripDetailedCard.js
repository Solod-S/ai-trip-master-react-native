import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { blurhash } from "../../utils";

const UserTripDetailedCard = ({ trip, handleDelete }) => {
  const router = useRouter();
  const [parsedTripData, setParsedTripData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (trip && trip?.tripData) {
      const parsed = JSON.parse(trip.tripData);
      setParsedTripData(parsed);
    }
  }, [trip]);

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
        .catch(error => {
          setImgUrl("");
          console.error("Error checking image:", error);
        });
    }
  }, [parsedTripData]);

  return (
    parsedTripData && (
      <View
        style={{
          marginTop: 20,
        }}
      >
        {/* {imgUrl ? (
          <Image
            style={{
              width: "100%",
              height: 240,
              height: hp(29),
              borderRadius: 15,
            }}
            source={{ uri: imgUrl }}
            placeholder={blurhash}
            transition={500}
          />
        ) : (
          <Image
            source={require("../../assets/images/vacation.jpg")}
            style={{
              width: "100%",
              height: hp(29),
              borderRadius: 15,
            }}
            placeholder={blurhash}
            transition={500}
          />
        )} */}

        {imgUrl && imgUrl.length > 0 && (
          <Image
            style={{
              width: "100%",
              height: 240,
              height: hp(29),
              borderRadius: 15,
            }}
            source={{ uri: imgUrl }}
            placeholder={blurhash}
            transition={500}
          />
        )}
        {imgUrl && imgUrl.length <= 0 && (
          <Image
            source={require("../../assets/images/vacation.jpg")}
            style={{
              width: "100%",
              height: hp(29),
              borderRadius: 15,
            }}
            placeholder={blurhash}
            transition={500}
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
              params: { trip: JSON.stringify(trip) },
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
              pathname: "/tripSchedule",
              params: {
                itinerary: JSON.stringify(trip?.tripDetails.itinerary),
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
            Trip Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(trip.docId)}
          activeOpacity={0.7}
          style={{
            backgroundColor: Colors.white,
            borderWidth: 2,
            padding: 15,
            borderRadius: 15,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: hp(1.8),
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default UserTripDetailedCard;

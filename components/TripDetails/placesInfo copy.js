import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "../../constants/Colors";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const PlacesInfo = ({ placesData }) => {
  const [coordinates, setCoordinates] = useState([]);

  const openMap = (latitude, longitude) => {
    const url = `https://www.google.com/maps/?q=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error("Error opening map:", err));
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      // Ensure placesData is not undefined or null, and is an array
      if (Array.isArray(placesData) && placesData.length > 0) {
        try {
          const placeSearchPromises = placesData.map(async place => {
            // Validate that place has necessary properties before proceeding
            if (!place?.name || !place?.address) return null;

            const placeSearchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
              place?.name
            )},${encodeURIComponent(place?.address)}&key=${
              process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
            }`;

            const response = await axios.get(placeSearchURL);
            const location = response?.data?.results?.[0]?.geometry?.location;

            if (location) {
              return { latitude: location.lat, longitude: location.lng };
            } else {
              console.log(`Place search failed for place: ${place?.name}`);
              return null;
            }
          });

          const resolvedCoordinates = await Promise.all(placeSearchPromises);
          // Filter out null values
          setCoordinates(resolvedCoordinates.filter(coord => coord !== null));
        } catch (error) {
          console.log("An error occurred while fetching coordinates:", error);
        }
      } else {
        console.log("Invalid placesData:", placesData);
      }
    };

    fetchCoordinates();
  }, [placesData]);

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 23,
          marginVertical: 20,
          paddingLeft: 15,
        }}
      >
        Places
      </Text>
      <FlatList
        nestedScrollEnabled
        data={placesData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          ({ item, index }) =>
            coordinates[index] ? (
              <View style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    openMap(
                      coordinates[index].latitude,
                      coordinates[index].longitude
                    )
                  }
                >
                  <MapView
                    style={styles.map}
                    region={{
                      latitude: coordinates[index].latitude,
                      longitude: coordinates[index].longitude,
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.02,
                    }}
                    showsUserLocation={false}
                    loadingEnabled={true}
                  >
                    <Marker
                      coordinate={coordinates[index]}
                      title={item.name}
                      description={item.description}
                    />
                  </MapView>
                </TouchableOpacity>
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <Text style={styles.bestTimes}>
                    Best time to visit: {item.best_times_to_visit}
                  </Text>
                  <Text style={styles.entryFee}>
                    Entry fee: {item.entry_fees}
                  </Text>
                  <Text style={styles.address}>Address: {item.address}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>
                      Rating: {item.rating} ({item.total_reviews} reviews)
                    </Text>
                  </View>
                </View>
              </View>
            ) : null
          // <Text>Loading...</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  map: {
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 10,
  },
  name: {
    fontSize: hp(2.4),
    marginBottom: 4,
    fontFamily: "outfit-bold",
  },
  description: {
    fontSize: hp(1.9),
    color: "#666",
    marginBottom: 10,
    fontFamily: "outfit-semibold",
  },
  bestTimes: {
    fontSize: hp(1.7),
    marginBottom: 4,
    fontFamily: "outfit-medium",
  },
  entryFee: {
    fontSize: hp(1.7),
    marginBottom: 4,
    fontFamily: "outfit-medium",
  },
  address: {
    fontSize: hp(1.7),
    marginBottom: 4,
    fontFamily: "outfit-medium",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: hp(1.7),
    fontFamily: "outfit-medium",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Colors } from "../../constants/Colors";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const PlacesInfo = ({ placesData }) => {
  const [coordinates, setCoordinates] = useState([]);

  const openMap = (latitude, longitude) => {
    try {
      const url = `https://www.google.com/maps/?q=${latitude},${longitude}`;
      Linking.openURL(url).catch(err =>
        console.error("Error opening map:", err)
      );
    } catch (error) {
      console.error("Failed to open map:", error);
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (!placesData) return;

        if (!Array.isArray(placesData) || placesData.length === 0) {
          console.log("Invalid placesData:", placesData);
          return;
        }
        const placeSearchPromises = placesData.map(async place => {
          if (!place?.name || !place?.address) return null;

          const placeSearchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
            place.name
          )},${encodeURIComponent(place.address)}&key=${
            process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
          }`;

          try {
            const response = await axios.get(placeSearchURL);
            const results = response?.data?.results;

            if (!Array.isArray(results) || results?.length === 0) {
              return null;
            }

            const location = response?.data?.results?.[0]?.geometry?.location;

            if (location) {
              return { latitude: location.lat, longitude: location.lng };
            } else {
              console.warn(`No location found for: ${place.name}`);
              return null;
            }
          } catch (err) {
            console.error(`Failed to fetch location for: ${place.name}`, err);
            return null;
          }
        });

        const resolvedCoordinates = await Promise.all(placeSearchPromises);
        setCoordinates(resolvedCoordinates.filter(coord => coord !== null));
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [placesData]);

  return (
    <View>
      <Text style={styles.title}>Places</Text>
      <FlatList
        nestedScrollEnabled
        data={placesData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const coord = coordinates[index];

          if (!coord) {
            return (
              <View style={styles.loadingCard}>
                <Text style={styles.loadingText}>Loading {item?.name}...</Text>
              </View>
            );
          }

          return (
            <View style={styles.card}>
              {coord?.latitude && coord?.longitude && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => openMap(coord?.latitude, coord?.longitude)}
                >
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                      latitude: coord?.latitude,
                      longitude: coord?.longitude,
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.02,
                    }}
                    showsUserLocation={false}
                    loadingEnabled={false}
                  >
                    <Marker
                      coordinate={coord}
                      title={item?.name}
                      description={item?.description}
                    />
                  </MapView>
                </TouchableOpacity>
              )}

              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.description}>{item?.description}</Text>
                <Text style={styles.bestTimes}>
                  Best time to visit: {item?.best_times_to_visit}
                </Text>
                <Text style={styles.entryFee}>
                  Entry fee: {item?.entry_fees}
                </Text>
                <Text style={styles.address}>Address: {item?.address}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>
                    Rating: {item?.rating} ({item?.total_reviews} reviews)
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "outfit-bold",
    fontSize: 23,
    marginVertical: 20,
    paddingLeft: 15,
  },
  card: {
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  loadingCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: hp(2),
    color: "#999",
    fontFamily: "outfit-medium",
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

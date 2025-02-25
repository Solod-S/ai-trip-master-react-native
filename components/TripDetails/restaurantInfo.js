import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../../utils";

export const RestaurantInfo = ({ restaurantData = [] }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = Dimensions.get("window");

  // Function to fetch images
  // const fetchImages = async (query, index) => {
  //     const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  //     const searchEngineId = process.env.EXPO_PUBLIC_GOOGLE_CX_ID;
  //     const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}&searchType=image&num=1`;

  //     try {
  //         const response = await axios.get(url);

  //         if (response.data && response.data.items && Array.isArray(response.data.items) && response.data.items.length > 0) {
  //             const imageUrl = response.data.items[0]?.link;

  //             if (imageUrl) {
  //                 setRestaurants((prevRestaurants) => {
  //                     if (!prevRestaurants || prevRestaurants.length <= index) {
  //                         console.error('Error prevRestaurant Not Found!');
  //                         return prevRestaurants;
  //                     }
  //                     const updatedRestaurants = [...prevRestaurants];
  //                     updatedRestaurants[index].img_url = imageUrl;
  //                     return updatedRestaurants;
  //                 });
  //             } else {
  //                 console.warn('No image link found in the API response.');
  //             }
  //         } else {
  //             console.warn('No items found in the API response.');
  //         }
  //     } catch (error) {
  //         console.error('Error fetching images:', error);
  //     }
  // };

  // Use effect to fetch data
  useEffect(() => {
    if (
      restaurantData &&
      Array.isArray(restaurantData) &&
      restaurantData?.length > 0
    ) {
      setRestaurants(restaurantData);
      // restaurantData.forEach((restaurant, index) => {
      //     fetchImages(restaurant.name, index);
      // });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [restaurantData]);

  const handleExternalLink = data => {
    if (data?.booking_url?.includes("example.com")) {
      const query = encodeURIComponent(data.name + data.address);
      const googleSearchUrl = `https://www.google.com/search?q=${query}`;

      Linking.openURL(googleSearchUrl).catch(err =>
        alert("Failed to open URL", err.message)
      );
    } else {
      Linking.openURL(data?.booking_url).catch(err =>
        alert("Failed to open URL", err.message)
      );
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  return restaurants &&
    Array.isArray(restaurants) &&
    restaurants?.length > 0 ? (
    <View style={{ marginTop: 15 }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: hp(2.8),
          padding: 15,
        }}
      >
        Restaurants
      </Text>
      <Carousel
        width={width - 50}
        height={width * 0.8}
        autoPlay={true}
        autoPlayInterval={3000}
        data={restaurants}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleExternalLink(item)}
            style={{
              flex: 1,
              borderRadius: 15,
              overflow: "hidden",
              marginHorizontal: 5,
            }}
          >
            <Image
              //   source={{ uri: item?.img_url }} // Use img_url from updated restaurant data
              source={require("../../assets/images/restaurant.jpg")}
              style={{ width: "100%", height: "100%", borderRadius: 15 }}
              resizeMode="cover"
              placeholder={blurhash}
              transition={500}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 15,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: "outfit-bold",
                  fontSize: hp(2.4),
                }}
              >
                {item.name} 🍽️
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "outfit",
                    fontSize: hp(1.9),
                  }}
                >
                  ≈ {item?.average_cost_per_meal} {item?.currency} / meal
                </Text>

                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "outfit",
                    fontSize: hp(1.9),
                  }}
                >
                  🧭 {item?.geo_coordinates?.latitude},{" "}
                  {item?.geo_coordinates?.longitude}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "outfit-semibold",
                    fontSize: hp(1.9),
                  }}
                >
                  Rating: {item?.rating} / 5
                </Text>

                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "outfit",
                    fontSize: hp(1.9),
                  }}
                >
                  Reviews: {item?.total_reviews || 100}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  ) : (
    <Text>No restaurants available!</Text>
  );
};

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StartNewTrip } from "../../components";
import { useRouter } from "expo-router";
import { auth } from "../../config/fireBaseConfig";
import { getMyTrips, isSameDay } from "../../utils";
import UserTripList from "../../components/MyTrips/userTripList";
import { UsePreventBack } from "../../hooks";
import Toast from "react-native-toast-message";
import Animated, { FadeInDown } from "react-native-reanimated";

const isIphone = Platform.OS === "ios";

export default function MyTrip() {
  const [addTripIsLoading, setAddTripIsLoading] = useState(false);
  const user = auth.currentUser;
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // UsePreventBack();

  useEffect(() => {
    if (user) {
      GetAllUserTrips();
    }
  }, [user]);

  const GetAllUserTrips = async () => {
    setIsLoading(true);

    try {
      const trips = await getMyTrips(user.uid);
      setUserTrips(trips);
    } catch (error) {
      console.error(
        "Error occurred while getting user trip documents from db.",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewTrip = async () => {
    try {
      setAddTripIsLoading(true);
      const trips = await getMyTrips(user.uid);
      const lastGeneratedAtIsSameDay = await isSameDay(user.uid);

      if (trips.length >= 5) {
        if (isIphone) {
          Toast.show({
            type: "error",
            position: "top",
            text2:
              "Travel limit of 15 trips has been exceeded. Please remove a trip and try again.",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 50,
          });
        } else {
          ToastAndroid.show(
            "Travel limit of 5 trips has been exceeded. Please remove a trip and try again.",
            ToastAndroid.LONG
          );
        }
        return;
      }

      // if (lastGeneratedAtIsSameDay) {
      //   if (isIphone) {
      //     Toast.show({
      //       type: "error",
      //       position: "top",
      //       text2:
      //         "You can generate only one article per day. Please try again tomorrow.",
      //       visibilityTime: 2000,
      //       autoHide: true,
      //       topOffset: 50,
      //     });
      //   } else {
      //     ToastAndroid.show(
      //       "You can generate only one article per day. Please try again tomorrow.",
      //       ToastAndroid.LONG
      //     );
      //   }
      //   return;
      // }
      router.push("/createTrip/searchStartLocation");
    } catch (error) {
      console.log(`Error in handleNewTrip:`, error);
    } finally {
      setTimeout(() => {
        setAddTripIsLoading(false);
      }, 1000);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        padding: 20,
        paddingTop: 10,
      }}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: "100%",
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={GetAllUserTrips} />
        }
      >
        <Animated.View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          entering={FadeInDown.duration(400).delay(100).springify().damping(6)}
        >
          <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(3.5) }}>
            My Trips
          </Text>
          <TouchableOpacity
            disabled={addTripIsLoading}
            onPress={handleNewTrip}
            style={{ opacity: addTripIsLoading ? 0.3 : 1 }}
          >
            <Ionicons name="add-circle" size={40} color="black" />
          </TouchableOpacity>
        </Animated.View>
        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: 40 }}
            size={60}
            color={Colors.primary}
          />
        ) : userTrips?.length === 0 ? (
          <StartNewTrip handleNewTrip={handleNewTrip} />
        ) : (
          <UserTripList
            userTrips={userTrips}
            GetAllUserTrips={GetAllUserTrips}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

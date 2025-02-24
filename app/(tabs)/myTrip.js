import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
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
import { useNavigation, useRouter } from "expo-router";
import { auth } from "../../config/fireBaseConfig";
import { getMyTrips } from "../../utils";
import UserTripList from "../../components/MyTrips/userTripList";
import { useFocusEffect } from "@react-navigation/native";
import { UsePreventBack } from "../../hooks";
import Toast from "react-native-toast-message";

const isIphone = Platform.OS === "ios";

export default function MyTrip() {
  const [addTripIsLoading, setAddTripIsLoading] = useState(false);
  const user = auth.currentUser;
  const route = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // состояние для pull-to-refresh

  UsePreventBack();

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await GetAllUserTrips();
    setRefreshing(false);
  }, []);

  const handleNewTrip = async () => {
    try {
      setAddTripIsLoading(true);
      const trips = await getMyTrips(user.uid);
      if (trips.length >= 15) {
        if (isIphone) {
          Toast.show({
            type: "error",
            position: "top",
            text1:
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
      } else {
        route.push("/createTrip/searchStartLocation");
      }
    } catch (error) {
      console.log(`Error in handleNewTrip:`, handleNewTrip);
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(3.5) }}>
            My Trips
          </Text>
          <TouchableOpacity
            disabled={addTripIsLoading}
            onPress={handleNewTrip}
            style={{ opacity: addTripIsLoading ? 0.3 : 1 }}
            // onPress={() => route.push("/createTrip/searchStartLocation")}
          >
            <Ionicons name="add-circle" size={40} color="black" />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: 40 }}
            size={60}
            color={Colors.primary}
          />
        ) : userTrips?.length === 0 ? (
          <StartNewTrip />
        ) : (
          <UserTripList userTrips={userTrips} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

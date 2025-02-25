import {
  View,
  StyleSheet,
  Vibration,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";
import React from "react";
import UserTripDetailedCard from "./userTripDetailedCard";
import { deleteMyTrip } from "../../utils";
import Toast from "react-native-toast-message";
import Animated, { FadeInDown } from "react-native-reanimated";

const isIphone = Platform.OS === "ios";

const UserTripList = ({ userTrips, GetAllUserTrips }) => {
  const handleDelete = tripId => {
    Vibration.vibrate(200); // Vibrate for 100ms before showing the Alert
    Alert.alert("Delete Trip?", "Are you sure you want to delete this trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await deleteMyTrip(tripId);
            GetAllUserTrips();
            if (isIphone) {
              Toast.show({
                type: "success",
                position: "top",
                text1: "Delete Successful",
                text2: "The trip has been deleted successfully.",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
              });
            } else {
              ToastAndroid.show(
                "The trip has been deleted successfully.",
                ToastAndroid.LONG
              );
            }
          } catch (error) {
            if (isIphone) {
              Toast.show({
                type: "error",
                position: "top",
                text1: "Delete Failed",
                text2: "Failed to delete the trip. Please try again later.",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
              });
            } else {
              ToastAndroid.show(
                "Failed to delete the trip. Please try again later.",
                ToastAndroid.LONG
              );
            }
          }
        },
      },
    ]);
  };
  return (
    <View>
      {userTrips?.length > 0 &&
        userTrips.map((trip, index) => (
          <Animated.View
            key={trip.docId}
            entering={FadeInDown.duration(400)
              .delay(index * 200)
              .springify()
              .damping(6)}
          >
            <UserTripDetailedCard trip={trip} handleDelete={handleDelete} />
            {index < userTrips?.length - 1 && <View style={styles.divider} />}
          </Animated.View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});

export default UserTripList;

import { View, StyleSheet } from "react-native";
import React from "react";
import UserTripDetailedCard from "./userTripDetailedCard";

const UserTripList = ({ userTrips }) => {
  return (
    <View>
      {userTrips?.length > 0 &&
        userTrips.map((trip, index) => (
          <View key={trip.docId}>
            <UserTripDetailedCard trip={trip} />
            {index < userTrips?.length - 1 && <View style={styles.divider} />}
          </View>
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

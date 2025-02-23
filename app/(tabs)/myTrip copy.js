import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StartNewTrip } from "../../components";
import { useRouter } from "expo-router";
import { auth, db } from "../../config/fireBaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import UserTripList from "../../components/MyTrips/userTripList";

export default function MyTrip() {
  const user = auth.currentUser;
  const route = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetAllUserTrips();
    } else {
      setIsLoading(false);
      route.push("/");
    }
  }, [user]);

  const GetAllUserTrips = async () => {
    setIsLoading(true);

    try {
      const q = query(
        collection(db, "UserTrips"),
        where("userUid", "==", user.uid),
        orderBy("docId", "desc")
      );
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map(doc => doc.data());
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
        contentContainerStyle={
          {
            // flexGrow: 1,
            // paddingBottom: 100,
          }
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
            My Trip
          </Text>
          <TouchableOpacity
            onPress={() => route.push("/createTrip/searchStartLocation")}
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

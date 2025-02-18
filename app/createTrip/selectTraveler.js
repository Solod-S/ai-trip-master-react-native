import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SelectTravelerList } from "../../constants/Options";
import { Colors } from "../../constants/Colors";
import { OptionCard } from "../../components/CreateTrip";
import { CreateTripContext } from "../../context";

export default function SelectTraveler() {
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  const route = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    setTripData(prev => ({ ...prev, travelerCount: selectedTraveler }));
  }, [selectedTraveler]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Select Traveler",
      headerBackTitleVisible: false,
      headerBackTitle: "back",
      headerTintColor: "black",
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        padding: 20,
        paddingTop: 60,
      }}
      edges={["top"]}
    >
      <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(4) }}>
        Who's Traveling
      </Text>
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(2.5) }}>
          Choose your travelers
        </Text>
        <FlatList
          data={SelectTravelerList}
          keyExtractor={item => item.title}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}
              style={{ marginVertical: 10 }}
            >
              <OptionCard option={item} selectedTraveler={selectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          disabled={!selectedTraveler}
          onPress={() => route.push("/createTrip/selectDates")}
          style={{
            padding: 15,
            paddingHorizontal: 30,
            backgroundColor: Colors.primary,
            borderRadius: 25,
            marginTop: 20,
            opacity: !selectedTraveler ? 0.1 : 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.white,
              fontFamily: "outfit-medium",
              fontSize: hp(2.5),
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

import {
  FlatList,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "../../context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { SelectBudgetOptions } from "../../constants/Options";
import { OptionCard } from "../../components/CreateTrip";

const isIphone = Platform.OS === "ios";

export default function SelectBudget() {
  const [selectedBudget, setSelectedBudget] = useState(null);

  const route = useRouter();
  const navigation = useNavigation();
  const { setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      // headerTitle: "Select Budget",
      headerTitle: "",
      headerBackTitleVisible: false,
      headerBackTitle: "back",
      headerTintColor: "black",
    });
  }, []);

  useEffect(() => {
    setTripData(prev => ({ ...prev, budget: selectedBudget }));
  }, [selectedBudget]);

  const handleBudget = () => {
    if (!selectedBudget) {
      if (isIphone) {
        Toast.show({
          type: "info",
          position: "top",
          text1: "Please select your budget",
          //  text2: "",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
      } else {
        ToastAndroid.show("Please select your budget", ToastAndroid.LONG);
      }
      return;
    }
    route.push("/createTrip/reviewTrip");
  };
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
      <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(4) }}>Budget</Text>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(2) }}>
          Choose spending habits for your trip
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          data={SelectBudgetOptions}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedBudget(item)}
              style={{ marginVertical: 10 }}
            >
              <OptionCard option={item} SelectBudgetOption={selectedBudget} />
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          disabled={!selectedBudget}
          onPress={() => handleBudget()}
          style={{
            padding: 15,
            paddingHorizontal: 30,
            backgroundColor: Colors.primary,
            borderRadius: 25,
            marginTop: 20,
            opacity: !selectedBudget ? 0.1 : 1,
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

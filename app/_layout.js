import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import "react-native-get-random-values";
import { CreateTripContext } from "../context";
import { useState } from "react";

export default function RootLayout() {
  const [tripData, setTripData] = useState();

  useFonts({
    "outfit-regular": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bolt": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <Toast />
      </>
    </CreateTripContext.Provider>
  );
}

import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import "react-native-get-random-values";
import { CreateTripContext } from "../context";
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore"; // Подключаем Zustand-хук
import { View } from "react-native";

const MainLayout = () => {
  const { user, isAuthenticated, initAuthListener } = useAuthStore();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    //  check if the user is authenticated or not
    if (typeof isAuthenticated == "undefined") return;
    // user in app group
    const inApp = segments[0] == "(tabs)";
    if (isAuthenticated && !inApp) {
      // if user authenticated
      // and not in (tabs) => redirect myTrips
      router.replace("myTrips");
    } else if (isAuthenticated == false) {
      // if user is not authenticated
      //  redirect to home
      router.replace("home");
    }
  }, [isAuthenticated]);

  return <View className="flex-1 bg-white"></View>;
};

export default function RootLayout() {
  const [tripData, setTripData] = useState({});

  useFonts({
    "outfit-regular": require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bolt": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(notificationScreen)"
          options={{ headerShown: false }}
        />
      </Stack>
      <Toast />
      <MainLayout />
    </CreateTripContext.Provider>
  );
}

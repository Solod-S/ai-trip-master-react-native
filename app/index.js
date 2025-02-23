import { View, ActivityIndicator } from "react-native";
import { Login } from "@/components";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore"; // Подключаем Zustand-хук

export default function Index() {
  const { user, isAuthenticated, initAuthListener } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe();
  }, []);
  console.log(`isAuthenticated`, isAuthenticated);
  // console.log(`user`, user);

  if (isAuthenticated === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {isAuthenticated ? <Redirect href={"/myTrip"} /> : <Login />}
    </View>
  );
}

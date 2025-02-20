import { View, ActivityIndicator } from "react-native";
import { Login } from "@/components";
import { auth } from "../config/fireBaseConfig";
import { Redirect } from "expo-router";

import { useEffect, useState } from "react";

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={"/myTrip"} /> : <Login />}
    </View>
  );
}

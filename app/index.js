import { Text, View } from "react-native";
import { Login } from "@/components";
import { auth } from "../config/fireBaseConfig";
import { Redirect } from "expo-router";

export default function Index() {
  const user = auth?.currentUser;
  console.log(`user`, user);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href={"/myTrip"} /> : <Login />}
    </View>
  );
}

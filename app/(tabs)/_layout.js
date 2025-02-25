import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { UsePreventBack } from "../../hooks";

export default function TabLayout() {
  UsePreventBack();
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
        }}
      >
        <Tabs.Screen
          name="myTrips"
          options={{
            tabBarLabel: "My Trip",
            tabBarIcon: ({ color }) => (
              <Ionicons name="map" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="people" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CustomKeyboardView, Loading } from "../../../components";
import { Image } from "expo-image";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../../../store/useAuthStore";

export default function RestorePassword() {
  const { resetPassword } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      if (!email) {
        Toast.show({
          type: "info",
          position: "top",
          text2: "Please fill all the fields",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
        return;
      }
      setIsLoading(true);
      const { success } = await resetPassword(email.trim());

      if (success) router.replace("emailReset");
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Failed",
        text2: "Error in password restore.",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, paddingTop: 10 }}
      edges={["top"]}
    >
      <CustomKeyboardView>
        <StatusBar style="dark" />
        <View style={{ padding: 25 }}>
          <View>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Animated.Text
              entering={FadeInDown.delay(100).duration(500).springify()}
              style={{
                marginTop: 5,
                fontFamily: "outfit-bolt",
                fontSize: hp(3.5),
              }}
            >
              Reset Your Password
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(200).duration(500).springify()}
              style={{
                fontFamily: "outfit",
                fontSize: hp(3.5),
                color: Colors.gray,
                marginTop: 10,
              }}
            >
              Enter your email
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.delay(300).duration(500).springify()}
              style={{
                fontFamily: "outfit",
                fontSize: hp(3.5),
                color: Colors.gray,
                marginTop: 10,
              }}
            >
              We'll send you a reset link
            </Animated.Text>
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: "bold",
                  color: "#4B5563",
                }}
              >
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={styles.placeholder.color}
                style={styles.input}
                placeholder="Enter Email"
              />
            </View>
          </View>

          <View style={{ marginTop: 16 }}>
            {isLoading ? (
              <View
                style={{
                  marginTop: 20,
                  padding: 15,
                  backgroundColor: Colors.primary,
                  borderRadius: 15,
                }}
              >
                <Loading color="white" size={hp(3)} />
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{
                    marginTop: 20,
                    padding: 15,
                    backgroundColor: Colors.primary,
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp(2),
                      color: Colors.white,
                      textAlign: "center",
                    }}
                  >
                    Restore
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </CustomKeyboardView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: hp(1.8),
    marginTop: 5,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.gray,
  },
  placeholder: {
    color: "#D3D3D3",
  },
});

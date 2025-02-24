import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";
import { CustomKeyboardView, Loading } from "../../../components";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import useAuthStore from "../../../store/useAuthStore";

const isIphone = Platform.OS === "ios";

export default function LogIn() {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onLoginWithEmailAndPassword = async () => {
    try {
      if (!email || !password) {
        if (isIphone) {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Login Failed",
            text2: "Please fill all the fields",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 50,
          });
        } else {
          ToastAndroid.show("Please enter Email & Password", ToastAndroid.LONG);
        }
        return;
      }
      setLoading(true);
      await login(email, password);
      // router.replace("/myTrip");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

      switch (errorCode) {
        case "auth/invalid-credential":
          if (isIphone) {
            Toast.show({
              type: "error",
              position: "top",
              text1: "Login Failed",
              text2: "Invalid Credential",
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 50,
            });
          } else {
            ToastAndroid.show("Invalid Credential", ToastAndroid.LONG);
          }
          break;

        case "auth/weak-password":
          if (isIphone) {
            Toast.show({
              type: "error",
              position: "top",
              text1: "Login Failed",
              text2: "Password should be at least 6 characters",
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 50,
            });
          } else {
            ToastAndroid.show(
              "Password should be at least 6 characters",
              ToastAndroid.LONG
            );
          }
          break;

        case "auth/invalid-email":
          if (isIphone) {
            Toast.show({
              type: "error",
              position: "top",
              text1: "Login Failed",
              text2: "Invalid Email",
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 50,
            });
          } else {
            ToastAndroid.show("Invalid Email", ToastAndroid.LONG);
          }
          break;

        default:
          const formattedMessage = errorCode
            .replace("auth/", "")
            .replace(/-/g, " ");
          // .replace(/\b\w/g, char => char.toUpperCase());
          if (isIphone) {
            Toast.show({
              type: "error",
              position: "top",
              text1: "Login Failed",
              text2: formattedMessage,
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 50,
            });
          } else {
            ToastAndroid.show(formattedMessage, ToastAndroid.LONG);
          }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, paddingTop: 10 }}
      edges={["top"]}
    >
      <StatusBar style="dark" />
      <CustomKeyboardView>
        <View style={{ padding: 25 }}>
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
            Let's Sign You In
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
            Welcome Back
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
            You've been missed
          </Animated.Text>

          {/* Email */}
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: hp(2) }}>Email</Text>
            <TextInput
              onChangeText={value => setEmail(value)}
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
              placeholder="Enter Email"
            />
          </View>

          {/* Password */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: hp(2) }}>Password</Text>
            <TextInput
              onChangeText={value => setPassword(value)}
              secureTextEntry={true}
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
              placeholder="Enter Password"
            />
          </View>

          <View>
            {/* Sign In  Btn*/}
            {loading ? (
              <View
                style={{
                  marginTop: 40,
                  padding: 15,
                  backgroundColor: Colors.primary,
                  borderRadius: 15,
                }}
              >
                <Loading color="white" size={hp(3)} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => onLoginWithEmailAndPassword()}
                style={{
                  marginTop: 40,
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
                  Sign In
                </Text>
              </TouchableOpacity>
            )}

            {/* Create Account Btn*/}
            <TouchableOpacity
              onPress={() => router.replace("/auth/signUp")}
              style={{
                marginTop: 20,
                padding: 15,
                backgroundColor: Colors.white,
                borderRadius: 15,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: hp(2),
                  color: Colors.primary,
                  textAlign: "center",
                }}
              >
                Create account
              </Text>
            </TouchableOpacity>
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

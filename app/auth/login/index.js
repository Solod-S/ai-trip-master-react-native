import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";
import { CustomKeyboardView } from "../../../components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "../../../config/fireBaseConfig";

export default function LogIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onLoginWithEmailAndPassword = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(`user`, user);
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.white, flex: 1, paddingTop: 10 }}
      edges={["top"]}
    >
      <CustomKeyboardView>
        <View style={{ padding: 25 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 5,
              fontFamily: "outfit-bolt",
              fontSize: hp(3.5),
            }}
          >
            Let's Sign You In
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: hp(3.5),
              color: Colors.gray,
              marginTop: 10,
            }}
          >
            Welcome Back
          </Text>

          <Text
            style={{
              fontFamily: "outfit",
              fontSize: hp(3.5),
              color: Colors.gray,
              marginTop: 10,
            }}
          >
            You've been missed
          </Text>

          {/* Email */}
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: hp(2) }}>Email</Text>
            <TextInput
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
              placeholder="Enter Email"
            />
          </View>

          {/* Password */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: hp(2) }}>Password</Text>
            <TextInput
              secureTextEntry={true}
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
              placeholder="Enter Password"
            />
          </View>

          <View>
            {/* Sign In  Btn*/}
            <TouchableOpacity
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

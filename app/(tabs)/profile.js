import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "../../context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import moment from "moment";
import useAuthStore from "../../store/useAuthStore";
import { Loading } from "../../components";
import { UsePreventBack } from "../../hooks";

const isIphone = Platform.OS === "ios";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuthStore();

  UsePreventBack();

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        padding: 20,
        paddingTop: 40,
        gap: 30,
      }}
      edges={["top"]}
    >
      <View>
        <Text style={{ fontFamily: "outfit-bolt", fontSize: hp(4) }}>
          Profile info:
        </Text>
      </View>

      {user ? (
        <View style={{ flex: 1 }}>
          {/*Email */}
          <View
            style={{
              // marginTop: 20,
              display: "flex",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <Ionicons name="mail" size={34} color="black" />
            <View>
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: hp(2.5),
                  color: Colors.gray,
                }}
              >
                Email:
              </Text>
              <Text style={{ fontFamily: "outfit-medium", fontSize: hp(2.5) }}>
                {user.email}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
      <View>
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
            onPress={handleLogOut}
            style={{
              padding: 15,
              paddingHorizontal: 30,
              backgroundColor: Colors.white,
              borderRadius: 25,
              marginTop: 20,
              borderWidth: 2,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: Colors.primary,
                fontFamily: "outfit-medium",
                fontSize: hp(2.5),
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

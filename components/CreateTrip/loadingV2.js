import { View } from "react-native";
import LottieView from "lottie-react-native";

export function LoadingV2({ size }) {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../../assets/images/trip-generating-error.json")}
        autoPlay
        loop
        speed={0.7}
      />
    </View>
  );
}

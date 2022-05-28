import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export const WhiteSheet = () => {
  return (
    <View
      style={{
        zIndex: 800,
        position: "absolute",
        bottom: 0,
        height: 165,
        width: "100%",
      }}
    >
      <LinearGradient
        colors={["rgba(255,255,255, 1.0)", "rgba(255,255,255, 0.0)"]}
        style={{
          height: "100%",
        }}
        start={{ x: 0.01, y: 0.01 }}
        end={{ x: 0.01, y: 0.99 }}
        locations={[1.0, 0.2]}
      ></LinearGradient>
    </View>
  );
};

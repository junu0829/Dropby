import { View, Image } from "react-native";
import MovingCloud from "../../../../assets/MovingCloud.png";
import { FadeInView } from "../../../components/animations/fade.animation";
export const CloudBg = () => {
  return (
    <View
      style={{
        zIndex: 1,
        position: "absolute",
      }}
    >
      <FadeInView>
        <Image
          style={{
            width: 223,
            height: 100,
            zIndex: 2,
          }}
          source={MovingCloud}
        ></Image>
        <Image
          style={{
            top: -50,
            left: 90,
            opacity: 0.5,
            width: 446,
            height: 200,
            zIndex: 5,
          }}
          source={MovingCloud}
        ></Image>
      </FadeInView>
    </View>
  );
};

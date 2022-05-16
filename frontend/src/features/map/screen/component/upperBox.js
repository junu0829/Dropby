import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { Text } from "../../../../components/typography/text.component";
import backButtonWhite from "../../../../../assets/Buttons/backButtonWhite";
import { styles, TextContainer } from "../map.screen.styles";

export const UpperBox = ({
  activePolygon = {},

  setActivePolygon,
  selectedPlace = {},
  setSelectedPlace,
}) => {
  return (
    <LinearGradient
      colors={[
        "rgba(166, 110, 159, 0.9)",
        "rgba(166, 110, 159, 0.65)",
        "rgba(166, 110, 159, 0.15)",
        "rgba(166, 110, 159, 0.0)",
      ]}
      style={styles.background}
      locations={[0.1, 0.45, 0.77, 1.0]}
    >
      {activePolygon != null && selectedPlace != null ? (
        <>
          <TouchableOpacity
            style={{
              alignSelf: "flex-start",
              position: "absolute",
              top: 60,
              left: 20,
            }}
            onPress={() => {
              setSelectedPlace(null);
            }}
          >
            <SvgXml xml={backButtonWhite} width={20} height={20}></SvgXml>
          </TouchableOpacity>
        </>
      ) : activePolygon != null && selectedPlace == null ? (
        <>
          <TouchableOpacity
            style={{
              alignSelf: "flex-start",
              position: "absolute",
              top: 60,
              left: 20,
            }}
            onPress={() => {
              setActivePolygon(null);
            }}
          >
            <SvgXml xml={backButtonWhite} width={20} height={20}></SvgXml>
          </TouchableOpacity>
        </>
      ) : null}
    </LinearGradient>
  );
};

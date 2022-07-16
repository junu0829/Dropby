import { Text, View } from "react-native";
import { Marker } from "react-native-maps";
import { SvgXml } from "react-native-svg";
import currentLocationIcon from "../../../../../assets/currentLocationIcon";
import dropIcon from "../../../../../assets/dropIcon";

export const UserLocationIcon = ({ location }) => {
  return (
    <Marker
      style={{ zIndex: 1 }}
      coordinate={{
        latitude: location[0],
        longitude: location[1],
      }}
    >
      <View>
        <SvgXml xml={currentLocationIcon} width={26} height={26}></SvgXml>
      </View>
    </Marker>
  );
};

import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { Cloud } from "./cloud";
import { styles } from "../map.screen.styles";

export const UpperBox = (writeMode, navigation, currentRegion) => {
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
      {/* writeMode이지 않을 경우에 cloud */}
      {!writeMode ? (
        <TouchableOpacity onPress={() => {}}>
          <Cloud navigation={navigation} region={currentRegion} />
        </TouchableOpacity>
      ) : null}
    </LinearGradient>
  );
};

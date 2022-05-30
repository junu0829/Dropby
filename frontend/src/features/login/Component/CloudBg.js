import { View, Image } from "react-native";
import { SvgXml } from "react-native-svg";
import cld1 from "../../../../assets/Background/cld1";
import cld2 from "../../../../assets/Background/cld2";
import { CloudMoveView } from "../../../components/animations/cloudMove.animation";
import React from "react";

import { Dimensions } from "react-native";

export const CloudBg = ({ children }) => {
  const width = Dimensions.get("window").width;
  return (
    <View
      style={{
        flex: 1,
        zIndex: 5,
      }}
    >
      {children}
      <View
        style={{
          zIndex: 10,
          position: "absolute",
          top: 0,
          left: 150 + 1000,
        }}
      >
        <CloudMoveView
          duration={28000}
          endValue={Math.abs(width) * -1 - 150 - 1000}
          startValue={0}
        >
          <SvgXml xml={cld1} height={80.4} opacity={0.3}></SvgXml>
        </CloudMoveView>
      </View>
      <View
        style={{
          zIndex: 10,
          position: "absolute",
          top: 80,
          left: 240 + 800,
        }}
      >
        <CloudMoveView
          duration={51000}
          endValue={Math.abs(width) * -1 - 240 - 800}
          startValue={0}
        >
          <SvgXml xml={cld1} height={50.4} opacity={0.4}></SvgXml>
        </CloudMoveView>
      </View>
      <View
        style={{
          zIndex: 10,
          position: "absolute",
          top: 100,
          left: -300 + 800,
        }}
      >
        <CloudMoveView
          duration={65000}
          endValue={Math.abs(width) * -1 - 800}
          startValue={0}
        >
          <SvgXml xml={cld2} height={137.6} opacity={0.9}></SvgXml>
        </CloudMoveView>
      </View>

      <View
        style={{
          zIndex: 10,
          position: "absolute",
          top: 300,
          left: 150 + 500,
        }}
      >
        <CloudMoveView
          duration={30000}
          endValue={Math.abs(width) * -1 - 150 - 500}
          startValue={0}
        >
          <SvgXml xml={cld1} height={80.4} opacity={1}></SvgXml>
        </CloudMoveView>
      </View>
      <View
        style={{
          zIndex: 10,
          position: "absolute",
          top: 380,
          left: 240 + 500,
        }}
      >
        <CloudMoveView
          duration={31000}
          endValue={Math.abs(width) * -1 - 240 - 500}
          startValue={0}
        >
          <SvgXml xml={cld1} height={50.4} opacity={1}></SvgXml>
        </CloudMoveView>
      </View>
      <View
        style={{
          zIndex: 10,
          position: "absolute",
          top: 400,
          left: -300 + 520,
        }}
      >
        <CloudMoveView
          duration={28000}
          endValue={Math.abs(width) * -1 - 500}
          startValue={0}
        >
          <SvgXml xml={cld2} height={137.6} opacity={0.95}></SvgXml>
        </CloudMoveView>
      </View>

      <View
        style={{
          zIndex: 10,
          position: "absolute",
          top: 600,
          left: -300 + 570,
        }}
      >
        <CloudMoveView
          duration={20000}
          endValue={Math.abs(width) * -1 - 300}
          startValue={0}
        >
          <SvgXml xml={cld1} height={80.4} opacity={0.9}></SvgXml>
        </CloudMoveView>
      </View>
      <View
        style={{
          zIndex: 10,
          position: "absolute",
          top: 580,
          left: 240 + 600,
        }}
      >
        <CloudMoveView
          duration={51000}
          endValue={Math.abs(width) * -1 - 240 - 500}
          startValue={0}
        >
          <SvgXml xml={cld1} height={50.4} opacity={1}></SvgXml>
        </CloudMoveView>
      </View>
    </View>
  );
};

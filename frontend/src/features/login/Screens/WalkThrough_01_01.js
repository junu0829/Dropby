import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import { theme } from "../../../infrastructure/theme";
import LoadIcon from "../../../../assets/images/LoadIcon";
import { SvgXml } from "react-native-svg";
import MovingCloud from "../../../../assets/MovingCloud.png";
import StartButton from "../../../../assets/Buttons/StartButton";
import { ExpandView } from "../../../components/animations/expand.animation";
import { SlideView } from "../../../components/animations/slide.animation";
import SignInButton from "../../../../assets/Buttons/SignInButton";
import SignUpButton from "../../../../assets/Buttons/SignUpButton";
import { SignInScreen } from "./SignIn";

export const WalkThrough_01_01 = ({ navigation }) => {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <>
      <LinearGradient
        style={styles.WholeContainer}
        colors={[
          theme.colors.bg.a,
          theme.colors.bg.b,
          theme.colors.bg.c,
          theme.colors.bg.d,
        ]}
        start={{ x: 0.99, y: 0.01 }}
        end={{ x: 0.01, y: 0.99 }}
        locations={[0.0, 0.5, 0.8, 1.0]}
      >
        <View style={styles.IconContainer}>
          <SvgXml xml={LoadIcon} width={72} height={123} />
          <Text
            style={{
              top: -15,
              color: theme.colors.bg.white,
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            지금 서있는 그곳에서, 읽고 느끼고 새기세요
          </Text>
        </View>
        <View style={styles.MiddelSpace}></View>
        <View style={styles.BottomContainer}>
          <View
            style={{
              zIndex: 1,
            }}
          >
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
          </View>
          {isStarted ? (
            <View
              style={{
                position: "absolute",
                top: -50,
                justifyContent: "flex-start",
                alignItems: "center",
                zIndex: 999,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <SvgXml xml={SignInButton} width={250}></SvgXml>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp0101");
                }}
              >
                <SvgXml xml={SignUpButton} width={250}></SvgXml>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                position: "absolute",
                justifyContent: "flex-start",
                alignItems: "center",
                zIndex: 999,
              }}
            >
              <Text
                style={{
                  marginTop: 50,
                  color: theme.colors.bg.white,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                Min님,오늘은 또 어떤 얘기가 있나요?
              </Text>
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => {
                  setIsStarted(true);
                }}
              >
                <SvgXml xml={StartButton} width={80} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  WholeContainer: {
    flex: 1,
  },
  IconContainer: {
    flex: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  MiddelSpace: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  BottomContainer: {
    flex: 8,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

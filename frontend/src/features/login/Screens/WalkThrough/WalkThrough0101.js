import React, { useState } from "react";

import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { theme } from "../../../../infrastructure/theme";
import LoadIcon from "../../../../../assets/images/LoadIcon";
import { SvgXml } from "react-native-svg";

import StartButton from "../../../../../assets/Buttons/StartButton";

import SignInButton from "../../../../../assets/Buttons/SignInButton";
import SignUpButton from "../../../../../assets/Buttons/SignUpButton";
import { LoginBg } from "../../Component/LoginBg";
import { CloudBg } from "../../Component/CloudBg";

export const WalkThrough0101 = ({ navigation }) => {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <>
      <LoginBg>
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
          <CloudBg></CloudBg>

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
                  navigation.navigate("SignIn0101");
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
      </LoginBg>
    </>
  );
};

const styles = StyleSheet.create({
  WholeContainer: {
    flex: 1,
  },
  IconContainer: {
    flex: 8.5,
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

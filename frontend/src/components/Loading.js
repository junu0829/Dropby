import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../infrastructure/theme";

import LoadIcon from "../../assets/LoadIcon";
import { SvgXml } from "react-native-svg";
import styled from "styled-components";
import { ActivityIndicator, Colors } from "react-native-paper";
import LetsDrop from "../../assets/LetsDrop";
import { LoginBg } from "../features/login/Component/LoginBg";

const LoadingAnim = styled(ActivityIndicator)`
  margin-left: -13px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const Loading = () => {
  return (
    <>
      <View style={styles.container3}>
        <LoadingContainer>
          <LoadingAnim size={30} animating={true} color={Colors.white} />
        </LoadingContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  container2: {
    flex: 7,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container3: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container4: {
    flex: 1,
  },
});

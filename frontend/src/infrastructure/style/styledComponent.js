import { StyleSheet } from "react-native";

import styled from "styled-components/native";

export const styles = StyleSheet.create({});

export const MainContainerView = styled.View`
  width: 100%;
  border-top-right-radius: 36px;
  border-top-left-radius: 36px;
  z-index: 999;
  position: absolute;
  height: 80%;
  top: 20%;
  background-color: white;
  overflow: hidden;
`;

export const DetailView = styled.ScrollView`
  width: 100%;
`;

export const DetailViewStyle = StyleSheet.create({
  center: {
    alignItems: "center",
  },
});

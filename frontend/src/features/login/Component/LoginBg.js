import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import { theme } from "../../../infrastructure/theme";

// 기존 LinearGradient를 대체하는 <LoginBg> <LoginBg/> 컴포넌트.
// LoginBg를 import 하고 LinearGradient 자리에 그대로 사용하면 된다.
export const LoginBg = ({ children }) => {
  return (
    <LinearGradient
      style={styles.container}
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
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

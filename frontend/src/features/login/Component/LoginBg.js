import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

// 기존 LinearGradient를 대체하는 <LoginBg> <LoginBg/> 컴포넌트.
// LoginBg를 import 하고 LinearGradient 자리에 그대로 사용하면 된다.
export const LoginBg = ({ children }) => {
  return (
    <LinearGradient
      colors={["#7358ff", "#c16eff"]}
      style={styles.container}
      start={{ x: 0.01, y: 0.01 }}
      end={{ x: 0.99, y: 0.99 }}
      locations={[0.1, 1.0]}
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

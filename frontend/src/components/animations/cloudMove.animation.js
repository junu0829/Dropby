import React, { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";
import { Dimensions } from "react-native";

export const CloudMoveView = ({ duration, endValue, startValue, ...props }) => {
  const horizonAnim = useRef(new Animated.Value(startValue)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(horizonAnim, {
        toValue: endValue,
        duration: duration,
        useNativeDriver: true,
      })
    ).start();
  }, [duration, endValue, horizonAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,

        transform: [{ translateX: horizonAnim }],

        flex: 1,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

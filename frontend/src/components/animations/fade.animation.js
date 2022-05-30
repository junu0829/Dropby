import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeInView = ({ isLogIn, duration, ...props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: !isLogIn ? 1 : 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [isLogIn, fadeAnim, duration]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

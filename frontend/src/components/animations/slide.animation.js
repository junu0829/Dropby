import React, { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";

export const SlideView = ({
  isLogIn,
  duration,
  startValue,
  endValue,
  isDetail = {},
  ...props
}) => {
  const SlideAnim = useRef(new Animated.Value(startValue)).current;
  const endValue2 = -50;

  useEffect(() => {
    Animated.timing(SlideAnim, {
      toValue: !isLogIn ? endValue : endValue2,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [isLogIn, SlideAnim, duration, endValue, isDetail, endValue2]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,

        transform: [{ translateY: SlideAnim }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// export default class Slide extends Component {
//   state = {
//     visible: false,
//     y: new Animated.Value(500),
//   };

//   slide = () => {
//     Animated.spring(this.state.x, {
//       toValue: -100,
//       duration: 2000,
//     }).start();
//     this.setState({
//       visible: true,
//     });
//   };

//   render() {
//     // in practice you wanna toggle this.slide() after some props validation, I hope
//     this.slide();
//     return (
//       <View>
//         <Animated.View
//           style={[
//             {
//               transform: [{ translateY: this.state.y }],
//             },
//           ]}
//         >
//           {/* your content, such as this.props.children */}
//         </Animated.View>
//       </View>
//     );
//   }

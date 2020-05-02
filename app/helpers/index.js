import Animated, { Easing } from "react-native-reanimated";

export const timing = (value, toValue, duration = 300) => {
  return Animated.timing(value, {
    toValue,
    duration,
    easing: Easing.linear,
  });
};

import React, {useState} from 'react';
import Animated, {Easing} from 'react-native-reanimated';

export const timing = (value, toValue, duration = 300) => {
  return Animated.timing(value, {
    toValue,
    duration,
    easing: Easing.linear,
  });
};

export const ageFromDate = (stringDate) => {
  const year = parseInt(stringDate.substring(0, 4)); // get the year of birth
  const currentYear = new Date().getFullYear();

  return currentYear - year;
};

export * from './Socket';
export * from './AppStateEvents';

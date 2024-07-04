import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");

export const wp = (percentage: number) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const dyanmicHeight = (height: number, width: number) => {
  if (width > height) {
    // landscape
    return 300;
  } else if (height > width) {
    //portrait
    return 350;
  } else {
    return 250;
  }
};

export const dynamicColumns = () => {
  if (deviceWidth >= 1024) {
    return 4;
  } else if (deviceWidth >= 768) {
    return 3;
  } else {
    return 2;
  }
};


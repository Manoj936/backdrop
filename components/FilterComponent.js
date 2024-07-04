import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Chip } from "react-native-paper";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Animated, { FadeInRight } from "react-native-reanimated";

const FilterComponent = ({ title, values, index, onDataChanged, filter }) => {
  const shouldRenderChip =
    title === "order" || title === "orientation" || title === "image_type";
  const shouldRenderColor = title === "colors";

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 400)
        .duration(1000)
        .springify()
        .damping(18)}
      style={styles.container}
    >
      <Text style={styles.header}>{title == 'image_type' ? "Image Type" : title }</Text>
      <View style={styles.filterVal}>
        {shouldRenderChip &&
          values.map((value, index) => {
            const isActive = filter[title] === value;
            return (
              <Chip
                style={[styles.chip, isActive && styles.activeChip]}
                key={index}
                mode="flat"
                onPress={() => onDataChanged(title, value)}
              >
                {value}
              </Chip>
            );
          })}

        {shouldRenderColor &&
          values.map((value, index) => {
            const isActive = filter[title] === value;
            return (
              <TouchableOpacity
                style={[
                  styles.colors,
                  isActive && styles.activeColor,
                  { backgroundColor: value },
                ]}
                key={index}
                onPress={() => onDataChanged(title, value)}
              ></TouchableOpacity>
            );
          })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 4,
  },
  chip: {
    margin: 4,
    fontFamily: "Playwrite",
    backgroundColor: theme.colors.neutral(0.1),
  },
  activeChip: {
    backgroundColor: theme.colors.grayBg,
    color: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.black,
  },
  header: {
    fontSize: hp(2.5),
    textTransform: "capitalize",
    fontFamily: "Playwrite",
  },
  filterVal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  colors: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(7.5), // Adjust size as needed
    height: hp(3), // Adjust size as needed
    borderRadius: wp(7) / 2, // Ensure it's a circle
    margin: 4,
  },
  activeColor: {
    borderWidth: 2,
    borderColor: theme.colors.black,
  },
});

export default FilterComponent;

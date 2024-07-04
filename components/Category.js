import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { memo } from "react";

import { StaticData } from "@/constants/staticData"; // Adjust the path if necessary
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Animated, { FadeInRight } from "react-native-reanimated";

const Category = ({activeCategory , handleChangeCategory}) => {
  // Check if data is available
  if (!StaticData || !StaticData.all_categories) {
    console.error("StaticData.all_categories is undefined or null");
    return null;
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={StaticData.all_categories}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.categoryList}
      renderItem={({ item, index }) => (
        <CategoryDetail title={item} index={index} isActive={activeCategory == item } handleChangeCategory={handleChangeCategory} />
      )}
    />
  );
};

const CategoryDetail = ({ title, index , isActive , handleChangeCategory }) => {
    const color = isActive ? theme.colors.white : theme.colors.black
    const backgroundColor = isActive ? theme.colors.neutral(0.4) : theme.colors.white
  return (
    <Animated.View entering={FadeInRight.delay(index*200).duration(1000).springify().damping(18)} >
      <Pressable  style={[styles.categoryDetail , {backgroundColor}]} onPress={()=>handleChangeCategory(isActive ? null : title)}>
        <Text style={[styles.catTitle, {color}]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  categoryList: {
    paddingHorizontal: wp(5),
    marginTop:4,
    marginBottom:4,
    height:hp(4.5)
  },
  categoryDetail: {
    marginHorizontal: 5,
    padding: 10,
    paddingHorizontal:hp(2),
    borderRadius: theme.radius.xl,
  },
  catTitle:{
    fontSize:hp(1.3),
    fontFamily: "Playwrite",  }
});

export default memo(Category);

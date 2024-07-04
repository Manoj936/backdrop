import { View, StyleSheet } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { dyanmicHeight, dynamicColumns, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
const Wallpapers = ({ images }) => {
  const numColumns = dynamicColumns();
  return (
    <MasonryFlashList
      data={images}
      numColumns={numColumns}
      renderItem={({ item }) => <ImageComponent item={item} />}
      estimatedItemSize={200}
    />
  );
};

const ImageComponent = ({ item }) => {
  const height = dyanmicHeight(item.imageHeight, item.imageWidth);
  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, { height }]}
        source={item?.webformatURL}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  image: {
    marginRight: 5,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
  },
});
export default Wallpapers;

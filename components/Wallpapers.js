import { View, StyleSheet, Pressable } from "react-native";
import React, { useCallback } from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { dyanmicHeight, dynamicColumns, hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { debounce } from "lodash";
const Wallpapers = ({ images, router }) => {
  const numColumns = dynamicColumns();

  return (
    <View style={{ height: hp(100), width: wp(100) }}>
      <MasonryFlashList
        data={images}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <ImageComponent item={item} router={router} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const ImageComponent = ({ item, router }) => {
  
  const openImageModal = ()=>{
    router.push({
      pathname: "/home/image",
      params: {
        ...item,
      },
    })
  }

  const debouncedOpenImageModal = useCallback(debounce(openImageModal, 300),[])
  const height = dyanmicHeight(item.imageHeight, item.imageWidth);
  return (
    <View style={styles.container}>
      <Pressable
        onPress={debouncedOpenImageModal}
      >
        <Image
          style={[styles.image, { height }]}
          source={item?.webformatURL}
          contentFit="cover"
          transition={1000}
        />
      </Pressable>
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

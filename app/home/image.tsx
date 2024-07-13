import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { ActivityIndicator } from "react-native-paper";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
const image = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [isDownloading, setIsDownloading] = useState(false);
  console.log(item);
  const previewURL = item?.previewURL as string;
  const imageUrl = item?.webformatURL as string;
  const fileName = previewURL.split("/").pop();
  const filePath = `${FileSystem.documentDirectory}${fileName}`;
  // Handle saving to gallery

  const saveToGallery = async () => {
    let uri = await downloadFile();
    if (uri) {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Success", "Image saved to gallery!");
      } else {
        Alert.alert(
          "Permission denied",
          "Permission to access gallery was denied"
        );
      }
    } else {
      Alert.alert("Unexpected Error");
    }
  };

  const downloadFile = async () => {
    try {
      setIsDownloading(true);
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      setIsDownloading(false);
      return uri;
    } catch (e: any) {
      console.log(e);
      setIsDownloading(false);
      Alert.alert("Error", e.message);
      return;
    }
  };

  // Hanlde sharing

  const handleSharing = async () => {
    let uri = await downloadFile();
    if (uri) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert("Unexpected Error");
    }
  };

  return (
    <Animated.View entering={FadeInUp.delay(100)} style={styles.container}>
      <BlurView
        tint="dark"
        blurReductionFactor={10}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.imageViewer}>
        {item.webformatURL ? (
          <Image
            source={{ uri: item.webformatURL as string }}
            style={styles.image}
          />
        ) : (
          <ActivityIndicator size={"large"} />
        )}

        <View style={styles.btnView}>
          {/* SHare */}
          <Pressable onPress={handleSharing}>
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              style={styles.btn}
            >
              <AntDesign name="sharealt" size={wp(6)} color="white" />
            </Animated.View>
          </Pressable>
          {/* Save to Gallery */}
          <Pressable onPress={saveToGallery}>
            <Animated.View
              entering={FadeInDown.delay(150).springify()}
              style={styles.btn}
            >
              {isDownloading ? (
                <ActivityIndicator size={"small"} />
              ) : (
                <Feather name="download" size={wp(6)} color="white" />
              )}
            </Animated.View>
          </Pressable>
          {/* Close */}
          <Pressable onPress={() => router.back()}>
            <Animated.View
              entering={FadeInDown.delay(200).springify()}
              style={styles.btn}
            >
              <MaterialIcons name="cancel" size={wp(6)} color="white" />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: hp(2),
  },
  imageViewer: {
    marginTop: hp(10),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(2),
    backgroundColor: theme.colors.white,
    width: wp(100),
    borderRadius: 10,
  },
  image: {
    width: wp(94),
    height: hp(50),
    borderRadius: 20,
    borderCurve: "continuous",
  },
  btnView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 15,
    width: wp(50),
  },
  btn: {
    width: wp(14),
    height: hp(6),
    backgroundColor: theme.colors.neutral(0.8),
    borderRadius: 50,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default image;

import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "@/helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "@/constants/theme";
import { router } from "expo-router";

const WelcomeScreen = () => {
  const bgWallpapers = [
    require("../assets/images/bg1.jpg"),
    require("../assets/images/bg2.jpg"),
    require("../assets/images/bg3.jpg"),
  ];

  const randomBg = () => {
    const randomIndex = Math.floor(Math.random() * bgWallpapers.length);
    return bgWallpapers[randomIndex];
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* BG IMAGE */}
      <Image source={randomBg()} style={styles.bgImg} resizeMode="cover" />
      {/* Linier gradient */}
      <Animated.View entering={FadeInDown.duration(700)} style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        {/* Content Section */}
        <View style={styles.contentContainer}>
          <Animated.Text
            style={styles.title}
            entering={FadeInDown.delay(300).springify()}
          >
            Backdrop
          </Animated.Text>
          <Animated.Text
            style={styles.subtitle}
            entering={FadeInDown.delay(500).springify()}
          >
            Every scene tells a story
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(700).springify()}>
            <Pressable style={styles.btn} onPress={() => router.push("/home")}>
              <Text style={styles.btnText}>Explrole More</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    width: wp(100),
    bottom: 0,
    position: "absolute",
    height: hp(55),
  },
  bgImg: {
    position: "absolute",
    height: hp(100),
    width: wp(100),
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    bottom: 10,
    justifyContent: "flex-end",
    marginBottom: 20,
    alignItems: "center",
    gap: 5,
  },
  title: {
    fontSize: hp(5),
    fontWeight: "600",
    fontFamily: "Playwrite",
    color: theme.colors.neutral(0.8),
  },
  subtitle: {
    fontSize: hp(2.5),
    fontFamily: "Playwrite",
  },
  btn: {
    width: wp(80),
    marginTop: 5,
    height: hp(6),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.neutral(0.8),
    borderRadius: theme.radius.xs,
  },
  btnText: {
    fontSize: hp(3),
    color: theme.colors.white,
    fontFamily: "Playwrite",
    fontWeight: "600",
  },
});

export default WelcomeScreen;

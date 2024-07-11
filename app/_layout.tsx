import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import CustomFontProvider from "@/helpers/FontProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CustomFontProvider>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="home/index"
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Screen
                name="home/image"
                options={{
                  headerShown: false,
                  presentation: "containedTransparentModal",
                  animation: "fade_from_bottom",
                }}
              ></Stack.Screen>
            </Stack>
          </BottomSheetModalProvider>
        </CustomFontProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default Layout;

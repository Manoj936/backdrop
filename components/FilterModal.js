import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { BlurView } from "expo-blur";
import Animated, { FadeInUp } from "react-native-reanimated";
import { hp, wp } from "@/helpers/common";
import { StaticFilter } from "@/constants/staticData";
import FilterComponent from "@/components/FilterComponent";
import { theme } from "@/constants/theme";
const FilterModal = ({ modalRef, filterSearch , closeModal}) => {
  const [filter, setFilter] = useState({});

  const handlePress = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    console.log(filter);
  }, [filter]);
  const snapPoints = useMemo(() => ["80%"], []);

  const filterData = () => {
    filterSearch(filter);
  };
  const resetData = () => {
    setFilter({});
   
  };
  const cancel = ()=>{
    closeModal()
  }
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Filter content */}
        <View style={styles.filterContainer}>
          <Animated.Text
            style={styles.header1}
            entering={FadeInUp.delay(100).springify()}
          >
            Filters
          </Animated.Text>
          {/* Filter Sections */}
          <View>
            {Object.keys(StaticFilter)?.map((title, index) => {
              return (
                <FilterComponent
                  key={index}
                  filter={filter}
                  title={title}
                  values={StaticFilter[title]}
                  index={index}
                  onDataChanged={handlePress}
                />
              );
            })}
          </View>
          <Animated.View
            style={styles.filterButton}
            entering={FadeInUp.delay(1000).duration(1000).springify()}
          >
            <TouchableOpacity onPress={filterData} style={styles.footerbtn}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetData} style={styles.footerbtn}>
              <Text style={styles.applyBtnText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancel} style={styles.footerbtn}>
              <Text style={styles.applyBtnText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
          
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

//Custom backdrop to be shown when filter modal is enable
const CustomBackdrop = () => {
  const backdropComponentStyle = [StyleSheet.absoluteFill, styles.overlay];
  return (
    <Animated.View
      entering={FadeInUp.delay(100)}
      style={backdropComponentStyle}
    >
      <BlurView
        tint="dark"
        blurReductionFactor={10}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  filterContainer: {
    flex: 1,
    alignItems: "left",
    width: "100%",
    paddingLeft: 10,
  },
  filterButton: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    gap: 30,
    justifyContent: "space-between",
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    marginTop: hp(3.3),
  },
  header1: {
    fontSize: hp(3),
    fontFamily: "Playwrite",
  },
  header2: {
    fontSize: hp(1.5),
    fontFamily: "Playwrite",
  },
  applyBtnText: {
    fontSize: hp(2),
    fontFamily: "Playwrite",
  },
  footerbtn: {
    borderWidth: 2,
    borderColor: theme.colors.black,
    width: wp(22),
    height: hp(5),
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

});

export default FilterModal;

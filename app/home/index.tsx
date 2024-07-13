import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "@/helpers/common";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import Category from "@/components/Category";
import FilterModal from "@/components/FilterModal";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { getDataUsingAsyncAwaitGetCall } from "@/api";
import Wallpapers from "@/components/Wallpapers";
import debounce from "lodash/debounce";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
var initialPageCount = 1
const Home = () => {
  const router = useRouter();
  var pages = { pages: 1 };
  const filterModalView = useRef<BottomSheetModal>(null);
  const { top } = useSafeAreaInsets();
  const [showfilterModal, setShowFilterModel] = useState(false);
  // Detecting notch
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const searchRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const [isEndReached, setIsEndReached] = useState(false);
  const [filterdata, setFilterData] = useState({});
  const [lastPage, setLastPage] = useState(false);
  const [showBottomLoader , setShowBottomLoader] = useState(false)
  const handleChangeCategory = useCallback((title: string) => {
    initialPageCount = 1;
    setLastPage(false);
    setActiveCategory(title);
    clearSearchVal();
    const params: any = { ...pages };
    if (title) {
      params.category = title;
    }
    fetchImages(params);
  }, []);

  useEffect(() => {
    fetchImages(pages);
  }, []);

  useEffect(() => {
    if (showfilterModal) {
      filterModalView?.current?.present();
    } else {
      filterModalView?.current?.close();
    }
  }, [showfilterModal]);

  const fetchImages = async (params: any, refreshMode = false) => {
    console.log(params);
    const response: any = await getDataUsingAsyncAwaitGetCall(params);

    if (response && response.hits) {
      if (refreshMode) {
        setImages([...images, ...response.hits]);
      } else {
        setImages([...response.hits]);
      }
    }
  };

  useEffect(()=>{
console.log(isEndReached , "💀💀💀💀")
  },[isEndReached])
  const handleScroll = async (event: any) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setShowBottomLoader(true)
        setIsEndReached(true);
        initialPageCount++ 
        let params: any = { pages:initialPageCount  };
        if (search && search.length >= 3) {
          params.q = search.trim();
        }
        if (activeCategory) {
          params.category = activeCategory;
        }
        if (filterdata) {
          params = { ...params, ...filterdata };
        }
        
        await fetchImages(params, true);
        setShowBottomLoader(false)
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };
  const handleSearch = (val: string) => {
    console.log("searching for ===>", val);
    setSearch(val);
    if (val.length >= 3) {
      setImages([]);

      const params = { ...pages, q: val.trim() };
      console.log("search param", params);
      fetchImages(params);
    }
    if (val == "") {
      fetchImages({ pages: 1 });
    }
  };

  //When search filter is applied
  const searchWithFilter = (filter: any) => {
    clearSearchVal();
    filterModalView?.current?.close();
    setFilterData(filter);
    const params = { ...pages, ...filter };
    if (activeCategory) {
      params.category = activeCategory;
    }
    fetchImages(params);
  };

  //close modal

  const cancelFilter = () => {
    filterModalView?.current?.close();
  };

  //Scroll to top

  //Scroll to top
  const handleScrollToTop = () => {
    scrollRef?.current.scrollTo({ y: 0.5, animated: true });
  };

  // Open the bottom filter modal

  const manageFilterModal = () => {
    setShowFilterModel((val) => !val);
  };
  const clearSearchVal = () => {
    setSearch("");
    searchRef.current.clear();
    setImages([]);
    initialPageCount  = 1;
  };
  const clearSearch = () => {
    clearSearchVal();
    fetchImages(pages);
  };
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 600), []);
  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable onPress={handleScrollToTop}>
          <Animated.Text
            entering={FadeInLeft.delay(100).springify()}
            style={{
              fontFamily: "Playwrite",
              fontSize: hp(2),
              fontWeight: "800",
              color: theme.colors.white,
            }}
          >
            BackDrop
          </Animated.Text>
        </Pressable>
        <Pressable onPress={manageFilterModal}>
          <Animated.View entering={FadeInRight.delay(100).springify()}>
            <FontAwesome6
              name="bars-staggered"
              size={28}
              color={theme.colors.white}
            />
          </Animated.View>
        </Pressable>
      </View>

      {/* Search bar */}
      <Animated.View
        entering={FadeInDown.delay(400).springify()}
        style={styles.searchBar}
      >
        <View style={styles.searchIcon}>
          <Feather name="search" size={24} color={theme.colors.neutral(0.7)} />
        </View>
        <TextInput
          ref={searchRef}
          onChangeText={debouncedHandleSearch}
          placeholder="Search..."
          placeholderTextColor={theme.colors.neutral(0.5)} // Change this color to whatever you like
          style={styles.searchText}
        />
        {search && (
          <Pressable style={styles.closeIcon} onPress={clearSearch}>
            <Ionicons
              name="close"
              size={24}
              color={theme.colors.neutral(0.7)}
            />
          </Pressable>
        )}
      </Animated.View>

      {/* Category */}
      <View style={styles.categorySec}>
        <Category
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={5}
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
      >
        {images.length === 0 && (
          <ActivityIndicator style={{marginVertical:hp(15)}} size={"large"} color={theme.colors.white} />
        )}
        {/* Rendering Wallpapers */}
        <View style={styles.wallpaperContainer}>
          <Wallpapers images={images} router={router} />
        </View>
        {
          showBottomLoader  &&  <View style={styles.bottomLoader}>
          <ActivityIndicator  size={'small'}  color={theme.colors.white} />
        </View>
        } 
       
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        modalRef={filterModalView}
        filterSearch={searchWithFilter}
        closeModal={cancelFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.7),
  },
  contentContainer: {
    gap: 15,
  },

  header: {
    width: wp(100),
    height: hp(7),
    padding: 6,
    color: theme.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomLoader:{
    display: "flex",
    justifyContent:'center',
    alignItems:'center',
    marginVertical : 10,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: theme.colors.grayBg,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: theme.radius.md,
    height: hp(6),
    marginHorizontal: 15,
    backgroundColor: theme.colors.white,
  },
  searchIcon: {
    paddingLeft: 9,
    fontSize: hp(1.5),
  },
  searchText: {
    flex: 1,
    borderRadius: theme.radius.md,
    fontSize: hp(2),
    paddingVertical: 2,
    paddingLeft: 12,
  },
  closeIcon: {
    paddingEnd: 8,
    fontSize: hp(2),
  },
  categorySec: {
    marginTop: hp(1.2),
  },
  wallpaperContainer: {
    flex: 1,
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default Home;

// CustomFontProvider.js
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const CustomFontProvider = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        await Font.loadAsync({
          'Playwrite': require('../assets/fonts/PlaywriteDEGrund-Regular.ttf'),
        });
        console.log('Font loaded successfully');
        setFontLoaded(true);
      } catch (error) {
        console.error('Error loading font:', error);
      }
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return children;
};

export default CustomFontProvider;

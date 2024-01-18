import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import React, {useEffect} from 'react';

export default function ImageHandler(props) {
  const {height, width} = Dimensions.get('screen');
  const thumbnailAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);

  const handleBlurImage = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePerfectImage = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
		{/* =======THUMBNAIL IMAGE WITH LOW QUALITY============== */}
      <Animated.Image
        source={{
          uri: `${props.item.src.tiny}`,
        }}
        style={[styles.imgoverlay, {opacity: thumbnailAnimated,height:height/4,width:width/2}]}
        blurRadius={3}
        onLoad={handleBlurImage}
		   resizeMode={'cover'}
      />
      <Animated.Image
        source={{
          uri: `${props.item.src.portrait}`,
        }}
        style={[styles.image, {opacity: imageAnimated,height:height/4,width:width/2}]}
        onLoad={handlePerfectImage}
		resizeMode={'cover'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    margin: 2,
    borderRadius: 5,
  },
  imgoverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 5,
    margin: 2,
  },
});

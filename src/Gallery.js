import {View, Text, Dimensions, FlatList, Image} from 'react-native';
import React, {useEffect} from 'react';
import {API_KEY} from '../config';
import ImageHandler from './ImageHandler';

export default function Gallery() {
  const [images, setImages] = React.useState(null);
  const API_URL = `https://api.pexels.com/v1/search?query=nature&per_page=30&page=2`;
  
  //========FETCHING THE IMAGES =========//
  useEffect(() => {
    (async () => {
      try {
        let result = await fetch(API_URL, {
          headers: {
            Authorization: API_KEY,
          },
        });
        let data = await result.json();
        setImages(data.photos);
      } catch (error) {
        console.log(error, 'error in fetching images');
        throw error;
      }
    })();
  }, []);
  const renderItem = ({item}) => {
    return <ImageHandler item={item} />;
  };

  return (
    <View style={{backgroundColor: '#e1e4e8', flex: 1, paddingTop: 60}}>
      <FlatList
        data={images}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

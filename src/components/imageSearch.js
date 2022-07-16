import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import {icons} from '../images';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImageSearch = ({navigation, route, search}) => {
  const [image, setImage] = useState(false);
  const [uri, setURI] = useState('');

  const clickLocalImageSearch = async () => {
    if (image) {
      setImage(false);
    } else {
      const result = await launchImageLibrary();
      if (result.didCancel) {
        return null;
      }
      const URI = result.assets[0].uri;
      setURI(URI);
      setImage(true);
    }
  };

  const clickCameraImageSearch = async () => {
    if (image) {
      setImage(false);
    } else {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
      });
      if (result.didCancel) {
        return null;
      }
      const URI = result.assets[0].uri;
      setURI(URI);
      setImage(true);
    }
  };
  return (
    <>
      <View style={styles.imageContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={image ? {uri: uri} : icons.camera}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.imageButtonContainer}>
        <Button
          text={!image ? '카메라로 촬영하기' : '해당 이미지로 검색하기'}
          h="60"
          w="300"
          size="22"
          m="14"
          color={colors.lightgray}
          press={
            !image
              ? clickCameraImageSearch
              : () => navigation.push('SearchResult', {search: search})
          }
        />
        <Button
          text={!image ? '갤러리에서 불러오기' : '이미지 초기화'}
          h="60"
          w="300"
          size="22"
          m="14"
          color={colors.lightgray}
          press={clickLocalImageSearch}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 180,
    backgroundColor: 'white',
    borderColor: colors.lightGray,
    borderWidth: 4,
    borderRadius: 15,
  },
  icon: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    borderColor: colors.gray,
    borderRadius: 3,
  },
  imageButtonContainer: {
    margin: 30,
  },
});

export default ImageSearch;

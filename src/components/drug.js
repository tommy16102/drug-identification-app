import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../colors';
import {icons} from '../images';

const Drug = ({name, drugId, onPress, containerStyle, imageStyle}) => {
  const [hasImage, setHasImage] = useState(false);
  const URL = `https://sotree-dia-images.s3.ap-northeast-2.amazonaws.com/images/${drugId}.png`;
  const checkImageURL = URL => {
    fetch(URL)
      .then(res => {
        if (res.status === 403) {
          setHasImage(false);
        } else {
          setHasImage(true);
        }
      })
      .catch(err => {
        setHasImage(false);
      });
  };
  useEffect(() => {
    checkImageURL(URL);
  }, [URL]);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.result, containerStyle]}
      onPress={onPress}>
      <Image
        source={hasImage ? {uri: URL} : icons.pill}
        style={[styles.icon, imageStyle]}
      />
      <Text numberOfLines={3} style={styles.resultfont}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  result: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 3,
    borderRadius: 20,
    margin: 10,
  },
  icon: {
    margin: 5,
    resizeMode: 'contain',
    borderColor: colors.gray,
    borderRadius: 20,
  },
  resultfont: {
    fontSize: 17,
    width: 130,
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default Drug;

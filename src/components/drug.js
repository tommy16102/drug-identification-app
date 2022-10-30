import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../colors';
import {icons} from '../images';

const Drug = ({name, info, onPress, containerStyle, imageStyle}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.result, containerStyle]}
      onPress={onPress}>
      <Image source={icons.pill} style={[styles.icon, imageStyle]} />
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

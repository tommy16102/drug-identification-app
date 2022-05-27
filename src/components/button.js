import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../colors';

const Button = ({w, h, text, size, press}) => {
  return (
    <TouchableOpacity
      onPressout={press}
      style={[styles.button, {width: w, height: h}]}>
      <Text style={[styles.text, {fontSize: +size}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.gray,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.black,
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default Button;

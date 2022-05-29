import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../colors';

const Button = ({w, h, text, size, press, m, color}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={press}
      style={[
        styles.button,
        {backgroundColor: color, width: w, height: h, margin: +m},
      ]}>
      <Text style={[styles.text, {fontSize: +size}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray,
    borderWidth: 2,
  },
  text: {
    color: colors.black,
    fontWeight: 'bold',
  },
});

export default Button;

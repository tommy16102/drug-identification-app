import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {colors} from '../colors';
import {logos} from '../images';

const Logo = ({w, m}) => {
  return (
    <View style={[styles.logoContainer, {width: +w, height: +w, margin: +m}]}>
      <Image source={logos.logoDia} style={[styles.logo, {}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderColor: colors.gray,
    borderWidth: 2,
  },
  logo: {
    width: '90%',
    height: '90%',
    borderRadius: 15,
    resizeMode: 'contain',
    borderColor: colors.gray,
    borderWidth: 1,
  },
});

export default Logo;

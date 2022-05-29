import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {colors} from '../colors';
import {logos} from '../images';

const Logo = ({cw, w, h, m}) => {
  return (
    <View style={[styles.logoContainer, {width: cw}]}>
      <Image
        source={logos.logoDia}
        style={[styles.logo, {width: w, height: h}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: colors.lightGray,
    width: '52%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
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

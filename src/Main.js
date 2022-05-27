import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors} from './colors';
import {logos} from './images';
import Button from './components/button';

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logos.logoGray} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <Button text="약물 검색" h="70%" w="85%" size="50" />
        </View>
        <View style={styles.twoButtons}>
          <Button text="길찾기" h="70%" w="40%" size="40" />
          <Button text="로그인" h="70%" w="40%" size="40" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    backgroundColor: colors.lightGray,
    width: '60%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    borderRadius: 15,
    borderColor: colors.white,
    borderWidth: 5,
  },
  logo: {
    width: '86%',
    height: '84%',
    borderRadius: 15,
    resizeMode: 'contain',
  },
  buttonContainer: {
    backgroundColor: colors.lightGray,
    width: '88%',
    flex: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '20%',
    borderRadius: 15,
    borderColor: colors.white,
    borderWidth: 5,
  },
  buttons: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  twoButtons: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default Main;

import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {colors} from '../colors';
import {logos, icons} from '../images';
import Button from '../components/button';
import Logo from '../components/logo';

const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Logo cw="52%" w="90%" h="90%" />
      <View style={styles.buttonContainer}>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              text="모양 찾기"
              h="60%"
              w="60%"
              size="26"
              m="13"
              color={colors.lightGray}
            />
            <Image source={icons.shape} style={styles.icon} />
          </View>
          <View style={styles.button}>
            <Image source={icons.camera} style={styles.icon} />
            <Button
              text="이미지 찾기"
              h="60%"
              w="60%"
              size="26"
              m="13"
              color={colors.lightGray}
            />
          </View>
          <View style={styles.button}>
            <Button
              text="약국 찾기"
              h="60%"
              w="60%"
              size="26"
              m="13"
              color={colors.lightGray}
            />
            <Image source={icons.map} style={styles.icon} />
          </View>
          <View style={styles.button}>
            <Image source={icons.login} style={styles.icon} />
            <Button
              text="로그인"
              h="60%"
              w="60%"
              size="26"
              m="13"
              color={colors.lightGray}
              press={() => navigation.push('Login')}
            />
          </View>
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
  buttonContainer: {
    backgroundColor: colors.lightGray,
    width: '90%',
    flex: 2.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '20%',
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttons: {
    flex: 1,
    width: '96%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: colors.gray,
    borderWidth: 3,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: colors.white,
  },
  icon: {
    width: '20%',
    height: '60%',
    borderRadius: 5,
    resizeMode: 'contain',
    margin: 10,
  },
});

export default Main;

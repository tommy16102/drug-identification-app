import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';

const Login = () => {
  return (
    <View style={styles.container}>
      <Logo cw="38%" w="90%" h="90%" />
      <View style={styles.loginContainer}>
        <TextInput style={styles.input} placeholder="아이디" />
        <TextInput
          style={[styles.input, {marginTop: 30, marginBottom: 36}]}
          placeholder="비밀번호"
        />
        <Button
          text="로그인"
          h="19%"
          w="49%"
          size="30"
          m="15"
          color={colors.lighterGray}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="ID/PW 찾기"
          h="50%"
          w="40%"
          size="27"
          m="14"
          color={colors.lightGray}
        />
        <Button
          text="회원 가입"
          h="50%"
          w="40%"
          size="27"
          m="14"
          color={colors.lightGray}
        />
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
  loginContainer: {
    backgroundColor: colors.lightGray,
    width: '90%',
    flex: 2.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2%',
    marginTop: '25%',
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '3%',
  },
  input: {
    backgroundColor: colors.white,
    width: '90%',
    height: 90,
    borderColor: colors.darkGray,
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Login;

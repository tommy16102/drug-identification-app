import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Logo w="180" m="50" />
      <View style={styles.loginContainer}>
        <TextInput
          style={[styles.input, {marginTop: 0}]}
          placeholder="아이디"
        />
        <TextInput
          style={[styles.input, {marginTop: 30, marginBottom: 35}]}
          placeholder="비밀번호"
        />
        <View style={styles.loginButtonContainer}>
          <Button
            text="로그인"
            h="75"
            w="160"
            size="30"
            m="14"
            color={colors.lighterGray}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="ID/PW 찾기"
          h="75"
          w="170"
          size="27"
          m="14"
          color={colors.lightGray}
          press={() => navigation.push('Find')}
        />
        <Button
          text="회원 가입"
          h="75"
          w="170"
          size="30"
          m="14"
          color={colors.lightGray}
          press={() => navigation.push('Sign')}
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
    width: 380,
    flex: 2.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    marginTop: 20,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  loginButtonContainer: {
    flex: 0.6,
    flexDirection: 'row',
    marginTop: 5,
  },
  input: {
    backgroundColor: colors.white,
    width: 320,
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

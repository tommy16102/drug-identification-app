import axios from 'axios';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text, ScrollView} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import {Dimensions, Alert, AsyncStorage} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '닫기', onPress}], {cancelable: false});
};

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const onClickLoginButton = async e => {
    if (!username) makeAlert('로그인 실패', '아이디를 입력해주세요');
    else if (!password) makeAlert('로그인 실패', '비밀번호를 입력해주세요');
    else {
      const param = {username, password};
      axios({
        method: 'post',
        url: 'http://192.168.0.12:8080/api/login',
        params: param,
      })
        .then(async function (response) {
          console.log(response.data);
          if (response.data === '회원 정보가 비정확합니다.') throw new Error();
          else {
            await AsyncStorage.setItem(
              'user',
              JSON.stringify({username, password}),
            );
            makeAlert('로그인 성공', '메인 화면으로 이동합니다', () =>
              navigation.push('Main'),
            );
          }
        })
        .catch(function (error) {
          console.log(error);
          makeAlert('로그인 실패', '아이디와 비밀번호를 다시 입력해주세요');
        });
    }
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Logo w="180" m="50" />
        <View style={styles.loginContainer}>
          <TextInput
            style={[styles.input, {marginTop: 10}]}
            placeholder="아이디"
            onChange={event => {
              const {text} = event.nativeEvent;
              setUsername(text);
            }}
          />
          <TextInput
            style={[styles.input, {marginTop: 30, marginBottom: 35}]}
            placeholder="비밀번호"
            secureTextEntry={true}
            onChange={event => {
              const {text} = event.nativeEvent;
              setPassword(text);
            }}
          />
          <View style={styles.loginButtonContainer}>
            <Button
              text="로그인"
              h="75"
              w="160"
              size="30"
              m="14"
              color={colors.lighterGray}
              press={e => {
                onClickLoginButton(e);
              }}
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
            press={() => navigation.push('FindInfo')}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    margin: 0,
    padding: 0,
  },
  container: {
    backgroundColor: colors.black,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: colors.lightGray,
    width: 380,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    marginTop: 10,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
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

import axios from 'axios';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text, ScrollView} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Logo w="180" m="50" />
        <View style={styles.loginContainer}>
          <TextInput
            style={[styles.input, {marginTop: 10}]}
            placeholder="아이디"
            onChange={event => {
              const {eventCount, target, text} = event.nativeEvent;
              setUsername(text);
            }}
          />
          <TextInput
            style={[styles.input, {marginTop: 30, marginBottom: 35}]}
            placeholder="비밀번호"
            onChange={event => {
              const {eventCount, target, text} = event.nativeEvent;
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
              press={() => {
                const param = {username: username, password: password};
                axios({
                  method: 'post',
                  url: 'http://192.168.0.12:8080/api/login',
                  params: param,
                })
                  .then(function (response) {
                    console.log(response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
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

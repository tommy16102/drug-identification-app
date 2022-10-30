import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import Postcode from '@actbase/react-daum-postcode';
import Address from '../components/address';
import {Dimensions} from 'react-native';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '닫기', onPress}], {cancelable: false});
};

const Sign = ({navigation}) => {
  const [isModal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [personNumber, setPersonNumber] = useState('');
  const [personSecNumber, setPersonSecNumber] = useState('');
  const [address, setAddress] = useState('');
  const refPn = useRef(null);
  const refSecPn = useRef(null);
  const checkName = () => {
    const regExp = /[ㄱ-ㅎㅏ-ㅣ가-힣]{2,}/g;
    return regExp.test(name);
  };
  const checkId = () => {
    const regExp = /[a-zA-Z]{4,}/g;
    return regExp.test(username);
  };
  const checkPw = () => {
    const regExp = /[a-zA-Z0-9]{6,}/g;
    return regExp.test(password) && password === checkPassword;
  };
  const checkPn = () => {
    const regExp = /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])/g;
    return regExp.test(+personNumber) && /[1-4]/g.test(+personSecNumber);
  };
  const onClickSubmitButton = async e => {
    console.log(checkName(), checkId(), checkPw(), checkPn());
    if (!checkName()) {
      makeAlert('회원가입 실패', '이름을 다시 입력해주세요');
    } else if (!checkId()) {
      makeAlert('회원가입 실패', '아이디를 다시 입력해주세요');
    } else if (!checkPw()) {
      makeAlert('회원가입 실패', '비밀번호를 다시 입력해주세요');
    } else if (!checkPn()) {
      makeAlert('회원가입 실패', '주민등록번호를 다시 입력해주세요');
    } else if (!address) {
      makeAlert('회원가입 실패', '주소를 다시 입력해주세요');
    } else {
      signup()
        .then(function (response) {
          if (response.data === '이미 존재하는 아이디입니다.') {
            throw new Error();
          }
          makeAlert('회원가입 성공', '로그인 화면으로 이동합니다', () =>
            navigation.push('Login'),
          );
        })
        .catch(function (error) {
          makeAlert('회원가입 실패', '아이디를 다시 입력해주세요');
        });
    }
  };
  const signup = async () => {
    const param = {
      name,
      address,
      password,
      passwordCheck: checkPassword,
      personalNumber: personNumber + personSecNumber,
      username,
    };
    return await axios({
      method: 'post',
      url: 'http://192.168.0.10:8080/api/signup',
      params: param,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Logo w="130" m="35" />
        <View style={styles.signContainer}>
          <Modal
            visible={isModal}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModal(false)}>
            <Address setAddress={setAddress} setModal={setModal} />
          </Modal>
          <Text style={styles.title}>회원 가입</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChange={({nativeEvent: {text}}) => setName(text)}
            placeholder="이름(한글)"
          />
          <TextInput
            style={styles.input}
            placeholder="아이디(영문, 4자이상)"
            value={username}
            onChange={({nativeEvent: {text}}) => setUserName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호(영문, 숫자, 6자 이상)"
            value={password}
            secureTextEntry={true}
            onChange={({nativeEvent: {text}}) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호 재확인"
            value={checkPassword}
            secureTextEntry={true}
            onChange={({nativeEvent: {text}}) => setCheckPassword(text)}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {width: 180}]}
              placeholder="주민등록번호(7자)"
              value={personNumber}
              ref={refPn}
              onChange={({nativeEvent: {text}}) => {
                setPersonNumber(text);
                if (text.length === 6) {
                  refSecPn.current.focus();
                }
              }}
            />
            <Text style={{fontSize: 30}}>-</Text>
            <TextInput
              style={[styles.input, {width: 40, borderRadius: 10}]}
              ref={refSecPn}
              onChange={({nativeEvent: {text}}) => setPersonSecNumber(text)}
            />
            <Text style={{fontSize: 25}}>******</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {width: 265, fontSize: 15, color: colors.black},
              ]}
              placeholder="주소를 검색하세요"
              value={address}
              editable={false}
            />
            <Button
              text="검색"
              h="50"
              w="50"
              size="15"
              m="0"
              color={colors.lighterGray}
              press={() => setModal(true)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="회원가입"
            h="55"
            w="140"
            size="24"
            m="14"
            color={colors.lightGray}
            press={e => onClickSubmitButton(e)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signContainer: {
    backgroundColor: colors.lightGray,
    height: windowHeight - 330,
    justifyContent: 'center',
    alignItems: 'center',
    width: 380,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    paddingTop: 0,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    margin: 10,
    marginTop: 200,
    marginBottom: 23,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
  },
  modalView: {
    width: 360,
    height: 500,
    marginBottom: 10,
  },
  title: {
    marginTop: 1,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.white,
    width: 320,
    height: 55,
    borderColor: colors.darkGray,
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  buttonContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Sign;

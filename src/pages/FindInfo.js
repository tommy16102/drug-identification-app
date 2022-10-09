import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import TouchableText from '../components/touchableText';
import {Dimensions} from 'react-native';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '닫기', onPress}], {cancelable: false});
};

const FindInfo = ({navigator}) => {
  const [find, setFind] = useState(true);
  const [name, setName] = useState('');
  const [personNumber, setPersonNumber] = useState('');
  const [personSecNumber, setPersonSecNumber] = useState('');
  const [id, setId] = useState('');
  const refPn = useRef(null);
  const refSecPn = useRef(null);
  const clickId = () => {
    setFind(true);
    setName('');
    setPersonNumber('');
    setPersonSecNumber('');
  };
  const clickPw = () => {
    setFind(false);
    setName('');
    setPersonNumber('');
    setPersonSecNumber('');
    setId('');
  };
  const clickFindIdBtn = async () => {
    if (!name) {
      makeAlert('아이디 찾기 실패', '이름 입력해주세요');
    } else if (!personNumber || !personSecNumber) {
      makeAlert('아이디 찾기 실패', '주민등록를 입력해주세요');
    } else {
      // const res = await axios.post('http://192.168.0.12:8080/api/findId', {
      //   name,
      //   personalNumber: personNumber + personSecNumber,
      // });
      // console.log(res.data);
      const param = {name, personalNumber: personNumber + personSecNumber};
      axios({
        method: 'post',
        url: 'http://192.168.0.12:8080/api/findId',
        params: param,
      }).then(async function (response) {
        if (response.data === '회원 정보가 비정확합니다.') {
          makeAlert('회원 정보를 찾을 수 없습니다');
        } else {
          const [, found] = response.data.split(' : ');
          console.log(found);
          makeAlert(
            '아이디 찾기 성공',
            `${name}님의 아이디는 ${found} 입니다.`,
          );
        }
      });
    }
  };

  const clickFindPwBtn = e => {
    console.log('pw');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Logo w="150" m="40" />
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableText text="아이디" press={clickId} search={find} />
            <TouchableText text="비밀번호" press={clickPw} search={!find} />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="이름"
                value={name}
                onChange={({nativeEvent: {text}}) => setName(text)}
              />
              {!find && (
                <TextInput
                  style={styles.input}
                  placeholder="아이디"
                  value={id}
                  onChange={({nativeEvent: {text}}) => setId(text)}
                />
              )}
              <View style={styles.numContainer}>
                <TextInput
                  style={[styles.input, {fontSize: 16, width: 170}]}
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
                <Text style={{fontSize: 20}}>-</Text>
                <TextInput
                  value={personSecNumber}
                  style={[
                    styles.input,
                    {fontSize: 16, width: 45, borderRadius: 10},
                  ]}
                  ref={refSecPn}
                  onChange={({nativeEvent: {text}}) => setPersonSecNumber(text)}
                />
                <Text style={{fontSize: 16}}>******</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text={find ? '아이디 찾기' : '비밀번호 찾기'}
                h="55"
                w={find ? '140' : '150'}
                size="20"
                m="14"
                color={colors.lightgray}
                press={find ? () => clickFindIdBtn() : () => clickFindPwBtn()}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 15,
  },
  innerContainer: {
    flex: 3,
    width: 370,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    margin: 40,
  },
  bottomContainer: {
    width: 340,
    flex: 1,
    backgroundColor: colors.lighterGray,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: colors.gray,
    borderWidth: 3,
    margin: 20,
  },
  input: {
    backgroundColor: colors.white,
    width: 290,
    height: 66,
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  inputContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
});

export default FindInfo;

import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';

const Sign = ({navigator}) => {
  return (
    <View style={styles.container}>
      <Logo w="130" m="35" />
      <View style={styles.signContainer}>
        <Text style={styles.title}>회원 가입</Text>
        <TextInput style={styles.input} placeholder="이름(한글)" />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, {width: 265}]}
            placeholder="아이디(영문, 4자이상)"
          />
          <Button
            text="확인"
            h="50"
            w="50"
            size="15"
            m="0"
            color={colors.lighterGray}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="비밀번호(영문, 숫자, 6자 이상)"
        />
        <TextInput style={styles.input} placeholder="비밀번호 재확인" />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, {width: 180}]}
            placeholder="주민등록번호(7자)"
          />
          <Text style={{fontSize: 30}}>-</Text>
          <TextInput style={[styles.input, {width: 40, borderRadius: 10}]} />
          <Text style={{fontSize: 25}}>******</Text>
        </View>
        <TextInput style={styles.input} placeholder="주소" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="회원가입"
          h="55"
          w="140"
          size="24"
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
  signContainer: {
    backgroundColor: colors.lightGray,
    flex: 4,
    alignItems: 'center',
    width: 380,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    paddingTop: 5,
    marginTop: 10,
  },
  title: {
    marginTop: 10,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold',
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

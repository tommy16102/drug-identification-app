import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Modal,
  ScrollView,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import Postcode from '@actbase/react-daum-postcode';
import Address from '../components/address';

const Sign = ({navigator}) => {
  const [isModal, setModal] = useState(false);
  const [address, setAddress] = useState('');
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
          />
        </View>
      </View>
    </ScrollView>
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
    flex: 3.8,
    flexDirection: 'column',
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

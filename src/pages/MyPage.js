import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import Postcode from '@actbase/react-daum-postcode';
import Address from '../components/address';

const MyPage = ({navigator}) => {
  const [isModal, setModal] = useState(false);
  const [address, setAddress] = useState('');
  const [modalMode, setModalMode] = useState(true);

  const clickPwBtn = () => {
    setModal(true);
    setModalMode(false);
  };

  const clickAdBtn = () => {
    setModal(true);
    setModalMode(true);
  };

  return (
    <View style={styles.container}>
      <Logo w="130" m="35" />
      <View style={styles.signContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Modal
            visible={isModal}
            animationType="fade"
            transparent={true}
            statusBarTranslucent={true}
            onRequestClose={() => setModal(false)}>
            {modalMode ? (
              <Address setAddress={setAddress} setModal={setModal} />
            ) : (
              <View style={[styles.modalContainer, {flex: 0.8, top: 70}]}>
                <Text style={[styles.modalTitle, {marginTop: 30}]}>
                  변경할 비밀번호를 입력해주세요.
                </Text>
                <View style={styles.bottomContainer}>
                  <View style={[styles.infoContainer, {left: 10}]}>
                    <Text style={styles.label}>현재 비밀번호</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="현재 비밀번호"
                    />
                  </View>
                  <View style={[styles.infoContainer, {left: 30}]}>
                    <Text style={styles.label}>새 비밀번호</Text>
                    <TextInput style={styles.input} placeholder="새 비밀번호" />
                  </View>
                  <View style={[styles.infoContainer, {left: 30}]}>
                    <Text style={styles.label}>새 비밀번호</Text>
                    <TextInput style={styles.input} placeholder="새 비밀번호" />
                  </View>
                </View>
                <Button
                  text="변경"
                  h="50"
                  w="85"
                  size="20"
                  m="15"
                  color={colors.lighterGray}
                  press={() => setModal(false)}
                />
              </View>
            )}
          </Modal>
        </KeyboardAvoidingView>
        <Text style={styles.title}>회원 정보</Text>
        <View style={styles.bottomContainer}>
          <View style={[styles.infoContainer, {left: 40}]}>
            <Text style={styles.label}>이름</Text>
            <TextInput style={styles.input} value="이름" editable={false} />
          </View>
          <View style={[styles.infoContainer, {left: 20}]}>
            <Text style={styles.label}>아이디</Text>
            <TextInput style={styles.input} value="아이디" editable={false} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput style={styles.input} value="비밀번호" editable={false} />
            <Button
              text="변경"
              h="50"
              w="50"
              size="15"
              m="0"
              color={colors.lighterGray}
              press={clickPwBtn}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>생년월일</Text>
            <TextInput style={styles.input} value="생년월일" editable={false} />
          </View>
          <View style={[styles.infoContainer, {left: 40}]}>
            <Text style={styles.label}>주소</Text>
            <TextInput style={styles.input} value="주소" editable={false} />
            <Button
              text="변경"
              h="50"
              w="50"
              size="15"
              m="0"
              color={colors.lighterGray}
              press={clickAdBtn}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!isModal && (
          <Button
            text="약물 리스트"
            h="55"
            w="160"
            size="22"
            m="3"
            color={colors.lightgray}
          />
        )}
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
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 380,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    marginTop: 40,
  },
  modalContainer: {
    flex: 0.95,
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
    top: 40,
  },
  modalView: {
    width: 360,
    height: 500,
    margin: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 370,
    left: 5,
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    backgroundColor: colors.white,
    width: 210,
    height: 60,
    borderColor: colors.darkGray,
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 12,
  },
  buttonContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default MyPage;

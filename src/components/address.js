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
  Keyboard,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import Postcode from '@actbase/react-daum-postcode';

const Address = ({setAddress, setModal}) => {
  const [open, setOpen] = useState(false);
  Keyboard.addListener('keyboardDidShow', e => {
    setOpen(true);
  });
  Keyboard.addListener('keyboardDidHide', e => {
    setOpen(false);
  });
  return (
    <View style={styles.modalContainer}>
      <Text style={[styles.title, {display: !open ? 'flex' : 'none'}]}>
        도로명 주소를 입력해주세요
      </Text>
      <Postcode
        style={styles.modalView}
        jsOptions={{animation: true, hideMapBtn: true}}
        onSelected={data => {
          setAddress(data.address);
          setModal(false);
        }}
      />
      <Button
        text="닫기"
        h="40"
        w="92"
        size="20"
        m=""
        color={colors.lighterGray}
        press={() => setModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    margin: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default Address;

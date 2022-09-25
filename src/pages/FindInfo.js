import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import TouchableText from '../components/touchableText';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FindInfo = ({navigator}) => {
  const [find, setFind] = useState(true);
  const clickId = () => setFind(true);
  const clickPw = () => setFind(false);

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
              <TextInput style={styles.input} placeholder="이름" />
              {!find && <TextInput style={styles.input} placeholder="아이디" />}
              <View style={styles.numContainer}>
                <TextInput
                  style={[styles.input, {fontSize: 16, width: 170}]}
                  placeholder="주민등록번호(7자)"
                />
                <Text style={{fontSize: 20}}>-</Text>
                <TextInput
                  style={[
                    styles.input,
                    {fontSize: 16, width: 45, borderRadius: 10},
                  ]}
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

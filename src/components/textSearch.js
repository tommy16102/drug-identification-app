import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text, Alert} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '닫기', onPress}], {cancelable: false});
};

const TextSearch = ({navigation, search}) => {
  const [name, setName] = useState('');
  const [elem, setElem] = useState('');
  const pressClearButton = () => {
    setName('');
    setElem('');
  };
  const pressSearchButton = () => {
    if (name || elem) {
      navigation.push('SearchResult', {
        search,
        text: {
          name,
          elem,
        },
      });
    } else {
      makeAlert('검색 실패', '제품명이나 성분명을 입력해주세요');
    }
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.font}>제품명</Text>
        <TextInput
          style={[styles.input, {marginTop: 20}]}
          placeholder="한글, 영문"
          value={name}
          onChange={event => {
            const {text} = event.nativeEvent;
            setName(text);
          }}
        />
        <Text style={styles.font}>성분명</Text>
        <TextInput
          style={[styles.input, {marginTop: 20}]}
          placeholder="한글, 영문"
          value={elem}
          onChange={event => {
            const {text} = event.nativeEvent;
            setElem(text);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="초기화"
          h="55"
          w="140"
          size="25"
          m="14"
          color={colors.lightgray}
          press={pressClearButton}
        />
        <Button
          text="검색"
          h="55"
          w="140"
          size="25"
          m="14"
          color={colors.lightgray}
          press={pressSearchButton}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    width: 290,
    height: 66,
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  font: {
    fontSize: 28,
    color: colors.black,
    fontWeight: 'bold',
    marginTop: 30,
  },
  inputContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 0.6,
  },
});

export default TextSearch;

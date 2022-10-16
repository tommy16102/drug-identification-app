import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, Text, Alert} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import {Picker} from '@react-native-picker/picker';

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '닫기', onPress}], {cancelable: false});
};

const kinds = ['제품 검색', '성분 검색', '통합 검색'];

const TextSearch = ({navigation, search}) => {
  const [text, setName] = useState('');
  const [kind, setKind] = useState('제품 검색');
  const pressClearButton = () => {
    setName('');
  };
  const pressSearchButton = () => {
    if (text) {
      navigation.push('SearchResult', {
        search,
        text,
        kind,
      });
    } else {
      makeAlert('검색 실패', '검색어를 입력해주세요');
    }
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={kind}
          onValueChange={(itemValue, itemIndex) => setKind(itemValue)}
          style={{
            height: 100,
            width: 250,
            marginTop: 50,
          }}>
          {kinds.map(elem => (
            <Picker.Item
              style={{fontSize: 26, color: colors.darkGray}}
              label={elem}
              value={elem}
            />
          ))}
        </Picker>
        <TextInput
          style={[styles.input, {marginTop: 40}]}
          placeholder="한글, 영문"
          value={text}
          onChange={event => {
            const {text} = event.nativeEvent;
            setName(text);
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

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import TouchableText from '../components/touchableText';
import {icons} from '../images';

const TextSearch = ({navigation, route, search}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.font}>제품명</Text>
        <TextInput
          style={[styles.input, {marginTop: 20}]}
          placeholder="한글, 영문"
        />
        <Text style={styles.font}>성분명</Text>
        <TextInput
          style={[styles.input, {marginTop: 20}]}
          placeholder="한글, 영문"
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
        />
        <Button
          text="검색"
          h="55"
          w="140"
          size="25"
          m="14"
          color={colors.lightgray}
          press={() => navigation.push('SearchResult', {search: search})}
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

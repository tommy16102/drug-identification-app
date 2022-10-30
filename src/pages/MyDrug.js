import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import {Dimensions} from 'react-native';
import axios from 'axios';
import Drug from '../components/drug';

const windowHeight = Dimensions.get('window').height;

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '취소'}, {text: '확인', onPress}], {
    cancelable: false,
  });
};

const MyDrug = ({navigation, route}) => {
  const [result, setResult] = useState([
    {drugName: 'drug1'},
    {drugName: 'drug2'},
    {drugName: 'drug3'},
  ]); // api 써서 사용자 저장 약물 가져옴

  return (
    <ScrollView>
      <View style={styles.container}>
        <Logo w="110" m="30" />
        <View style={styles.innerContainer}>
          <View style={styles.topContainer}>
            <Text style={[styles.font]}>내 약품 리스트</Text>
          </View>
          <View style={styles.bottomContainer}>
            <ScrollView style={styles.scrollView}>
              {result.map((elem, idx) => {
                const {drugName} = elem;
                const containerStyle = {width: 260, height: 100};
                const imageStyle = {width: 80, height: 80};
                return (
                  <>
                    <View style={styles.drugContainer}>
                      <Drug
                        key={idx}
                        name={drugName}
                        info={elem}
                        containerStyle={containerStyle}
                        imageStyle={imageStyle}
                      />
                      <Button
                        text={'🗑️'}
                        h="50"
                        w="40"
                        size="23"
                        m="2"
                        color={colors.lightgray}
                        press={() =>
                          makeAlert(
                            '의약품 삭제',
                            `${drugName}을 삭제하시겠습니까?`,
                          )
                        }
                      />
                    </View>
                  </>
                );
              })}
            </ScrollView>
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
  topContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 20,
    width: 350,
    backgroundColor: colors.lighterGray,
    borderRadius: 15,
    borderColor: colors.gray,
    borderWidth: 3,
  },
  drugContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    fontSize: 26,
    color: colors.darkerGray,
    fontWeight: 'bold',
  },
  innerContainer: {
    height: 650,
    width: 370,
    backgroundColor: colors.lightgray,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: colors.backGray,
    borderWidth: 3,
    marginTop: 10,
  },
  scrollView: {
    margin: 10,
    width: '95%',
  },
});

export default MyDrug;

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import {icons} from '../images';
import {Dimensions} from 'react-native';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const SERVICE_KEY =
  'E9thHyuD336GPbWvGhI5lioJfhnP46UHHHVj8fNGN%2BcQxoz7E0XE9eUugste1ew3Y2YJfIaS57aaFmEzsuohTA%3D%3D';

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '닫기', onPress}], {cancelable: false});
};

axios.defaults.withCredentials = true;
const Axios = axios.create({
  withCredentials: true,
});

const SearchResult = ({navigation, route}) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    const {
      text: {elem, name},
    } = route.params;
    console.log(name);
    axios({
      method: 'get',
      url: `http://192.168.0.12:8080/api/drug/textSearch?drugName=${name}`,
    })
      .then(function (response) {
        console.log(response.data.length);
        if (response.data.length === 0) {
          makeAlert('검색 실패', '검색 조건에 맞는 약품이 없습니다', () =>
            navigation.push('SearchDrug', {find: true}),
          );
        } else {
          setResult(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [navigation, route.params]);

  // useEffect(() => {
  //   const url =
  //     '/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?serviceKey=E9thHyuD336GPbWvGhI5lioJfhnP46UHHHVj8fNGN%2BcQxoz7E0XE9eUugste1ew3Y2YJfIaS57aaFmEzsuohTA%3D%3D&pageNo=1&numOfRows=10&itemName=%EA%B0%80&type=json';
  //   const headers = {
  //     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //     Accept: '*/*',
  //   };
  //   Axios.get(url, {headers})
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(err => {
  //       console.log('errr', err);
  //     });
  // }, [result]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Logo w="100" m="30" />
        <View style={styles.innerContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.font}>
              {route.params.search ? '텍스트' : '이미지'}
            </Text>
            <Text style={[styles.font, {marginLeft: 30}]}>검색 결과</Text>
          </View>
          <View style={styles.bottomContainer}>
            <ScrollView style={styles.scrollView}>
              {result.map(elem => {
                console.log(elem);
                const {drugName} = elem;
                return (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.result}
                    onPress={() =>
                      navigation.push('DrugDetail', {
                        image: icons.pill,
                        info: elem,
                      })
                    }>
                    <Image source={icons.pill} style={styles.icon} />
                    <Text numberOfLines={3} style={styles.resultfont}>
                      {drugName}
                    </Text>
                  </TouchableOpacity>
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
    height: 60,
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
  font: {
    fontSize: 35,
    color: colors.darkerGray,
    fontWeight: 'bold',
  },
  resultfont: {
    fontSize: 15,
    width: 130,
    color: colors.black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  innerContainer: {
    height: 670,
    width: 370,
    backgroundColor: colors.lightgray,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: colors.backGray,
    borderWidth: 3,
    marginTop: 10,
  },
  icon: {
    width: 100,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderColor: colors.gray,
    borderRadius: 20,
  },
  scrollView: {
    margin: 10,
    width: '95%',
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 3,
    borderRadius: 20,
    margin: 10,
    width: 305,
    height: 120,
  },
});

export default SearchResult;

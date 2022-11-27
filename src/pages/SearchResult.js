import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import {icons} from '../images';
import {Dimensions} from 'react-native';
import axios from 'axios';
import Drug from '../components/drug';
import {IP_ADDRESS, PORT} from '../config/config';
const windowHeight = Dimensions.get('window').height;

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '닫기', onPress}], {cancelable: false});
};

/*

  search: true(텍스트), false(이미지)
  텍스트 검색 -> kind / text (검색 종류, 검색어)
  이미지 검색 -> uri / text (이미지, 식별자)

*/

const SearchResult = ({navigation, route}) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    const {search} = route.params;
    let api;
    if (search) {
      const {kind, text} = route.params;
      if (kind === '제품 검색') {
        api = 'nameSearch';
      } else if (kind === '성분 검색') {
        api = 'ingredientSearch';
      } else {
        api = 'textSearch';
      }
      axios({
        method: 'get',
        url: `${IP_ADDRESS}:${PORT}/api/drug/${api}?query=${text}`,
      })
        .then(function (response) {
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
    } else {
      const {uri, text} = route.params;
      let formData = new FormData();
      formData.append('photo', {uri, name: 'image.jpg', type: 'image/jpg'});
      if (text) {
        formData.append('text', text);
      }
      console.log(formData);
      axios
        .post('http://35.206.222.109:5000/output', formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(res => {
          setResult(res.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }, [navigation, route.params]);

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
            {result.length > 0 && route.params.search === '이미지' && (
              <Text style={styles.headerFont}>
                검색 결과 중 하나를 선택하세요
              </Text>
            )}
            {result.length > 0 ? (
              <ScrollView style={styles.scrollView}>
                {result.map((elem, idx) => {
                  const {drugName, drugId} = elem;
                  const containerStyle = {width: 305, height: 120};
                  const imageStyle = {width: 100, height: 100};
                  return (
                    <Drug
                      key={idx}
                      name={drugName}
                      drugId={drugId}
                      info={elem}
                      containerStyle={containerStyle}
                      imageStyle={imageStyle}
                      onPress={() =>
                        navigation.push('DrugDetail', {
                          image: icons.pill,
                          elem,
                        })
                      }
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <View style={styles.indicator}>
                <ActivityIndicator size="large" color={colors.darkGray} />
                <Text>잠시 기다려주세요...</Text>
              </View>
            )}
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
  headerFont: {
    fontSize: 15,
    color: colors.darkerGray,
    fontWeight: 'bold',
    marginTop: 5,
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
  indicator: {
    alignItems: 'center',
    fontSize: 15,
    color: colors.darkGray,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SearchResult;

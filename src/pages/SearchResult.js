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
  Modal,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import {icons} from '../images';
import {Dimensions} from 'react-native';
import axios from 'axios';
import Drug from '../components/drug';
import {IP_ADDRESS, PORT} from '../config/config';
import {WebView} from 'react-native-webview';
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
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  useEffect(() => {
    const {search} = route.params;
    console.log(route.params);
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
          console.log(response.data);
          if (response.data.length === 0) {
            makeAlert('검색 실패', '검색 조건에 맞는 약품이 없습니다', () =>
              navigation.push('SearchDrug', {find: true}),
            );
          } else {
            setResult(response.data);
          }
        })
        .catch(function (error) {
          console.log('err', error.response);
        });
    } else {
      let {uri, text} = route.params;
      text = text || '';
      console.log(uri, text);
      const localUri = uri;
      const filename = localUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : 'image';
      const formData = new FormData();
      formData.append('img', {uri: localUri, name: filename, type});
      const send = async formdata => {
        return await axios({
          method: 'post',
          url: 'http://35.206.222.109:5000/imageload',
          headers: {
            'content-type': 'multipart/form-data',
          },
          data: formdata,
        });
      };
      send(formData)
        .then(async res => {
          console.log('axios 통과', res.data);
          const result = await axios({
            method: 'post',
            url: 'http://35.206.222.109:5000/deepjson',
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({identifier: text}),
          });
          if (result.data.length === 0) {
            makeAlert('검색 실패', '검색 조건에 맞는 약품이 없습니다', () =>
              navigation.push('SearchDrug', {find: false}),
            );
          } else {
            const res2 = await Promise.all(
              result.data.map(async item => {
                const result = await axios.get(
                  `${IP_ADDRESS}:${PORT}/api/drug?query=${+item[0]}`,
                );
                return result.data;
              }),
            );
            setResult(res2);
          }
        })
        .catch(err => {
          console.log('err', err, err.response.request._response);
        });
    }
  }, [navigation, route.params]);

  console.log(route.params);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Modal
          visible={isOpen}
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}
          onRequestClose={() => setIsOpen(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.viewContainer}>
              <WebView
                source={{
                  uri: url,
                }}
                style={{width: 350, borderRadius: 15}}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text="닫기"
                h="50"
                w="85"
                size="20"
                m="15"
                color={colors.lightgray}
                press={() => setIsOpen(false)}
              />
            </View>
          </View>
        </Modal>
        <Logo w="100" m="30" />
        <View style={styles.innerContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.font}>
              {route.params.search ? '텍스트' : '이미지'}
            </Text>
            <Text style={[styles.font, {marginLeft: 30}]}>검색 결과</Text>
          </View>
          <View style={styles.bottomContainer}>
            {result.length > 0 && route.params.search === false && (
              <Text style={styles.headerFont}>
                검색 결과 중 하나를 선택하세요
              </Text>
            )}
            {result.length > 0 ? (
              <ScrollView style={styles.scrollView}>
                {result.map((elem, idx) => {
                  console.log(elem);
                  const {drugName, drugId} = elem;
                  const containerStyle = {width: 305, height: 120};
                  const imageStyle = {width: 100, height: 100};
                  if (typeof elem === 'object') {
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
                  } else {
                    return (
                      <Drug
                        key={idx}
                        name={'의약품을 확인하세요'}
                        containerStyle={containerStyle}
                        imageStyle={imageStyle}
                        onPress={() => {
                          setIsOpen(true);
                          setUrl(elem);
                        }}
                      />
                    );
                  }
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
  modalContainer: {
    flex: 0.95,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    margin: 10,
    marginTop: 240,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
  },
  viewContainer: {
    flex: 0.9,
    width: '95%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    margin: 10,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    padding: 5,
  },
  buttonContainer: {
    flex: 0.08,
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightgray,
    margin: 10,
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
  },
  headerFont: {
    fontSize: 16,
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

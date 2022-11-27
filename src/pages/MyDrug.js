import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import {Dimensions} from 'react-native';
import axios from 'axios';
import Drug from '../components/drug';
import {icons} from '../images';
import {IP_ADDRESS, PORT} from '../config/config';
const windowHeight = Dimensions.get('window').height;

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '취소'}, {text: '확인', onPress}], {
    cancelable: false,
  });
};

const MyDrug = ({navigation, route}) => {
  const [id, setId] = useState('');
  const [result, setResult] = useState([]); // api 써서 사용자 저장 약물 가져옴
  useEffect(() => {
    AsyncStorage.getItem('user').then(async res => {
      const {id} = JSON.parse(res);
      setId(id);
    });
  }, []);
  useEffect(() => {
    const getLists = async () => {
      const res = await axios.get(
        `${IP_ADDRESS}:${PORT}/api/memberDrug/list?memberId=${id}`,
      );
      const res2 = await Promise.all(
        res.data.map(async item => {
          const result = await axios.get(
            `${IP_ADDRESS}:${PORT}/api/drug?query=${item.drugId}`,
          );
          return result.data;
        }),
      );
      setResult(res2);
    };
    if (id) {
      getLists();
    }
  }, [id]);
  const deleteDrug = async drugId => {
    const param = {
      memberId: id,
      drugId,
    };
    setResult(result.filter(elem => elem.drugId != drugId));
    return await axios({
      method: 'post',
      url: `${IP_ADDRESS}:${PORT}/api/memberDrug/delete`,
      params: param,
    });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Logo w="110" m="30" />
        <View style={styles.innerContainer}>
          <View style={styles.topContainer}>
            <Text style={[styles.font]}>내 약품 리스트</Text>
          </View>
          <View style={styles.bottomContainer}>
            {result.length === 0 ? (
              <View style={styles.indicator}>
                <ActivityIndicator size="large" color={colors.darkGray} />
                <Text>잠시 기다려주세요...</Text>
              </View>
            ) : (
              <ScrollView style={styles.scrollView}>
                {result.map((elem, idx) => {
                  const {drugName} = elem;
                  const containerStyle = {width: 260, height: 100};
                  const imageStyle = {width: 80, height: 80};
                  return (
                    <>
                      <View style={styles.drugContainer} key={idx}>
                        <Drug
                          key={idx}
                          name={elem.drugName}
                          drugId={elem.drugId}
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
                              () => deleteDrug(elem.drugId),
                            )
                          }
                        />
                      </View>
                    </>
                  );
                })}
              </ScrollView>
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
  indicator: {
    alignItems: 'center',
    fontSize: 15,
    color: colors.darkGray,
    textAlign: 'center',
    fontWeight: 'bold',
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

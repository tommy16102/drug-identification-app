import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import {icons} from '../images';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

//거주지.

const SearchStore = ({navigation, route}) => {
  const [mapPos, setMapPos] = useState(true); //default 현재위치
  const [address, setAddress] = useState('');

  useEffect(() => {
    mapPos ? getCurrentPosition() : (() => setAddress('현재 거주지'))();
  }, [getCurrentPosition, mapPos]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCurrentPosition = async () => {
    setMapPos(true);
    let access;
    if (Platform.OS === 'ios') {
      access = await Geolocation.requestAuthorization('whenInUse');
    } else if (Platform.OS === 'android') {
      access = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    if (access === 'granted') {
      Geolocation.getCurrentPosition(
        pos => {
          const {latitude, longitude} = pos.coords; //현재 위도,경도
          getAddress(latitude, longitude);
        },
        () => {
          alert('위치정보를 알 수 없습니다');
        },
        {enableHighAccuracy: true, timeout: 1000, maximumAge: 2000},
      );
    } else {
      alert('위치정보를 알 수 없습니다');
    }
  };

  //현재 위도, 경도 -> 주소
  const getAddress = async (latitude, longitude) => {
    try {
      await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
          {
            headers: {
              Authorization: 'KakaoAK a3e632a4ca40bfd91acb17bfd00f6307',
            },
          },
        )
        .then(res => {
          const location = res.data.documents[0].road_address.address_name;
          setAddress(location);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Logo w="100" m="30" />
      <View style={styles.mapContainer}>
        <View style={styles.header}>
          <Text style={styles.btnText}>{address}</Text>
        </View>
        <View style={styles.bottomContainer}>{/*지도*/}</View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="현재 위치에서 검색"
          h="53"
          w="290"
          size="24"
          m="8"
          color={colors.white}
          press={getCurrentPosition}
        />
        <Button
          text="거주지에서 검색"
          h="53"
          w="290"
          size="24"
          m="8"
          color={colors.white}
          press={() => setMapPos(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 15,
    color: colors.black,
  },
  mapContainer: {
    flex: 3.4,
    width: 370,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    margin: 28,
    marginTop: 0,
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
    marginTop: 10,
  },
  buttonContainer: {
    flex: 0.9,
    width: 325,
    backgroundColor: colors.lightgray,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default SearchStore;

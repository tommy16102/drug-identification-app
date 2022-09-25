import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import Logo from '../components/logo';
import {icons} from '../images';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SearchResult = ({navigation, route}) => {
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
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.result}
                onPress={() =>
                  navigation.push('DrugDetail', {
                    image: icons.pill,
                    name: '가드렛정',
                  })
                }>
                <Image source={icons.pill} style={styles.icon} />
                <Text style={styles.resultfont}>가드렛정</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.result}>
                <Image source={icons.pill2} style={styles.icon} />
                <Text style={styles.resultfont}>가바토파정</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.result}>
                <Image source={icons.pill3} style={styles.icon} />
                <Text style={styles.resultfont}>가티스정</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.result}>
                <Image source={icons.pill4} style={styles.icon} />
                <Text style={styles.resultfont}>글로비트정</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.result}>
                <Image source={icons.pill5} style={styles.icon} />
                <Text style={styles.resultfont}>기네프정</Text>
              </TouchableOpacity>
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
    fontSize: 25,
    color: colors.black,
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

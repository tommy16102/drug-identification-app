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

const Detail = ({navigation, route}) => {
  const [showInfo, setShowInfo] = useState(true);
  console.log(route);
  return (
    <View style={styles.container}>
      <Logo w="100" m="30" />
      <View style={styles.innerContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.font}>{route.params.name}</Text>
          <Image source={route.params.image} style={styles.icon} />
        </View>
        <View
          style={[
            styles.bottomContainer,
            {
              borderColor: showInfo ? colors.gray : colors.darkRed,
            },
          ]}>
          <View style={styles.buttons}>
            <Button
              text="상세정보"
              h="45"
              w="95"
              size="18"
              m="25"
              color={colors.lightGray}
              press={() => setShowInfo(true)}
            />
            <Button
              text="주의약품"
              h="45"
              w="95"
              size="18"
              m="25"
              color={colors.lightRed}
              press={() => setShowInfo(false)}
            />
          </View>
          <ScrollView
            style={[
              styles.scrollView,
              {
                backgroundColor: showInfo
                  ? colors.lightGray
                  : colors.lighterRed,
                borderColor: showInfo ? colors.gray : colors.darkRed,
              },
            ]}
            centerContent={true}>
            {showInfo && (
              <>
                <View activeOpacity={0.6} style={styles.result}>
                  <Text style={styles.resultfont}>주성분</Text>
                  <Text style={styles.resultfont}>아나글립틴</Text>
                </View>
                <View activeOpacity={0.6} style={styles.result}>
                  <Text style={styles.resultfont}>분류번호</Text>
                  <Text style={styles.resultfont}>당뇨병용제</Text>
                </View>
                <View activeOpacity={0.6} style={styles.result}>
                  <Text style={styles.resultfont}>효능</Text>
                  <Text style={styles.resultfont}>혈당조절 향상</Text>
                </View>
                <View activeOpacity={0.6} style={styles.result}>
                  <Text style={styles.resultfont}>투여방법</Text>
                  <Text style={styles.resultfont}>1일2회 아침저녁 투여</Text>
                </View>
                <View activeOpacity={0.6} style={styles.result}>
                  <Text style={styles.resultfont}>투여경로</Text>
                  <Text style={styles.resultfont}>경구</Text>
                </View>
                <View
                  activeOpacity={0.6}
                  style={[styles.result, {marginBottom: 12}]}>
                  <Text style={styles.resultfont}>제조회사</Text>
                  <Text style={styles.resultfont}>제이더블유중외제약</Text>
                </View>
              </>
            )}
            {!showInfo && (
              <>
                <Text style={styles.fontTitle}>의약품 리스트</Text>
                <TouchableOpacity activeOpacity={0.6} style={styles.list}>
                  <Image source={icons.pill4} style={styles.image} />
                  <Text style={[styles.resultfont, {color: colors.darkRed}]}>
                    글로비트정
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.list}>
                  <Image source={icons.pill5} style={styles.image} />
                  <Text style={[styles.resultfont, {color: colors.darkRed}]}>
                    기네프정
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
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
  topContainer: {
    height: 95,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20,
    backgroundColor: colors.lighterGray,
    borderRadius: 16,
    borderColor: colors.gray,
    borderWidth: 2,
    width: 280,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 10,
    width: 350,
    backgroundColor: colors.lighterGray,
    borderRadius: 15,
    borderColor: colors.gray,
    borderWidth: 2,
  },
  font: {
    fontSize: 26,
    color: colors.darkerGray,
    fontWeight: 'bold',
  },
  resultfont: {
    fontSize: 17,
    color: colors.black,
    fontWeight: 'bold',
    margin: 10,
  },
  fontTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.darkRed,
    textAlign: 'center',
    margin: 5,
  },
  innerContainer: {
    height: 700,
    width: 370,
    backgroundColor: colors.lightgray,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: colors.backGray,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    width: 77,
    height: 77,
    margin: 1,
    resizeMode: 'contain',
    borderColor: colors.gray,
    borderRadius: 20,
  },
  image: {
    width: 60,
    height: 60,
    margin: 1,
    resizeMode: 'contain',
    borderColor: colors.gray,
    borderRadius: 20,
  },
  buttons: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    margin: 10,
    width: '95%',
    backgroundColor: colors.lightGray,
    borderColor: colors.gray,
    borderRadius: 13,
    borderWidth: 2,
  },
  innerScroll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lighterRed,
    width: '90%',
    marginLeft: '5%',
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    borderColor: colors.gray,
    borderWidth: 2,
    borderRadius: 20,
    width: '90%',
    height: 65,
    marginLeft: '5%',
    marginTop: 10,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.lightRed,
    borderWidth: 2,
    borderRadius: 20,
    width: '70%',
    height: 75,
    marginLeft: '15%',
    marginTop: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;

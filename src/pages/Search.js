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
import {icons} from '../images';

const Search = ({navigator, route}) => {
  const [search, setSearch] = useState(route.params.find);
  //const [name, setName] = useState('');
  //const [ingre, setIngre] = useState('');
  const [image, setImage] = useState(false);
  const clickText = () => setSearch(true);
  const clickImage = () => setSearch(false);
  const clickSearch = () => setImage(!image);
  return (
    <View style={styles.container}>
      <Logo w="100" m="30" />
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={clickText}>
            <Text
              style={[
                styles.btnText,
                // eslint-disable-next-line react-native/no-inline-styles
                {color: search ? colors.darkGray : colors.lightgray},
              ]}>
              텍스트
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clickImage}>
            <Text
              style={[
                styles.btnText,
                // eslint-disable-next-line react-native/no-inline-styles
                {color: !search ? colors.darkGray : colors.lightgray},
              ]}>
              이미지
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          {search && (
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
                />
              </View>
            </>
          )}
          {!search && (
            <>
              <View style={styles.imageContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={image ? icons.pill : icons.camera}
                    style={styles.icon}
                  />
                </View>
              </View>
              <View style={styles.imageButtonContainer}>
                <Button
                  text={image ? '검색' : '촬영하기'}
                  h="60"
                  w="300"
                  size="24"
                  m="14"
                  color={colors.lightgray}
                  press={clickSearch}
                />
                <Button
                  text={image ? '다시 불러오기' : '휴대폰에서 불러오기'}
                  h="60"
                  w="300"
                  size="24"
                  m="14"
                  color={colors.lightgray}
                  press={clickSearch}
                />
              </View>
            </>
          )}
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
  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 15,
  },
  innerContainer: {
    flex: 3,
    width: 370,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    borderRadius: 15,
    borderColor: colors.darkGray,
    borderWidth: 2,
    margin: 40,
    marginTop: 10,
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
    fontSize: 26,
    color: colors.darkGray,
    fontWeight: 'bold',
    marginTop: 30,
  },
  inputContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  numContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 0.6,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 180,
    backgroundColor: 'white',
    borderColor: colors.lightGray,
    borderWidth: 4,
    borderRadius: 15,
  },
  icon: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    borderColor: colors.gray,
    borderRadius: 3,
  },
  imageButtonContainer: {
    margin: 30,
  },
});

export default Search;

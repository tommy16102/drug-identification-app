import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import {icons} from '../images';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DialogInput from 'react-native-dialog-input';
//import Dialog from 'react-native-dialog';
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

const makeAlert = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '취소'}, {text: '확인', onPress}], {
    cancelable: false,
  });
};

const alertInfo = (title, content, onPress = null) => {
  Alert.alert(title, content, [{text: '닫기', onPress}], {cancelable: false});
};

const ImageSearch = ({navigation, route, search}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [uri1, setURI1] = useState('');
  const [uri2, setURI2] = useState('');
  const [visible, setVisible] = useState(false);
  const checkImage = () => {
    return !image1 || !image2;
  };

  const clickClear = () => {
    makeAlert('', '이미지를 지우시겠습니까?', resetImages);
  };

  const resetImages = () => {
    setImage1(false);
    setImage2(false);
    setURI1('');
    setURI2('');
  };

  const clickCameraImage1Search = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (result.didCancel) {
      return null;
    }
    const URI = result.assets[0].uri;
    setURI1(URI);
    setImage1(true);
  };

  const clickCameraImage2Search = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (result.didCancel) {
      return null;
    }
    const URI = result.assets[0].uri;
    setURI2(URI);
    setImage2(true);
  };

  const clickSearchWidthIdf = () => {
    setVisible(true);
  };

  return (
    <>
      <DialogInput
        isDialogVisible={visible}
        title={'이미지 내 식별자 검색'}
        hintInput={'식별자를 입력하세요'}
        dialogStyle={{borderRadius: 15}}
        submitInput={inputText => {
          if (!inputText) {
            alertInfo('', '식별자를 입력해주세요');
          } else {
            navigation.push('SearchResult', {search: search});
          }
        }}
        closeDialog={() => {
          setVisible(false);
        }}
        submitText={'검색하기'}
        cancelText={'취소하기'}
      />
      <View style={styles.imageContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={image1 ? {uri: uri1} : icons.camera}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={image2 ? {uri: uri2} : icons.camera}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.imageButtonContainer}>
        {checkImage() && (
          <>
            <Button
              text={'앞면 촬영하기'}
              h="55"
              w="300"
              size="22"
              m="10"
              color={colors.lightgray}
              press={clickCameraImage1Search}
            />
            <Button
              text={'뒷면 촬영하기'}
              h="55"
              w="300"
              size="22"
              m="10"
              color={colors.lightgray}
              press={clickCameraImage2Search}
            />
          </>
        )}
        {!checkImage() && (
          <>
            <Button
              text={'이미지로 검색하기'}
              h="55"
              w="300"
              size="22"
              m="10"
              color={colors.lightgray}
              press={() => navigation.push('SearchResult', {search: search})}
            />
            <Button
              text={'식별자와 함께 검색하기'}
              h="55"
              w="300"
              size="22"
              m="10"
              color={colors.lightgray}
              press={clickSearchWidthIdf}
            />
            <Button
              text={'이미지 초기화'}
              h="55"
              w="300"
              size="22"
              m="10"
              color={colors.lightgray}
              press={clickClear}
            />
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
    marginTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    backgroundColor: 'white',
    borderColor: colors.lightGray,
    borderWidth: 4,
    borderRadius: 15,
    margin: 10,
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

export default ImageSearch;

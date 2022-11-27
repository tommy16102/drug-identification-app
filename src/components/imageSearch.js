import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {colors} from '../colors';
import Button from '../components/button';
import {icons} from '../images';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DialogInput from 'react-native-dialog-input';
import ImagePicker from 'react-native-image-crop-picker';

//import PhotoEditor from '@baronha/react-native-photo-editor';
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
  const [image, setImage] = useState(false);
  const [uri, setURI] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    console.log(uri);
  }, [uri]);
  const checkImage = () => {
    return !image;
  };
  const clickClear = () => {
    makeAlert('', '현재 이미지를 지우시겠습니까?', resetImages);
  };
  // const cropImage = async () => {
  //   const result = await PhotoEditor.open({
  //     path: uri,
  //   });
  // };
  const resetImages = () => {
    setImage(false);
    setURI('');
  };

  const clickCameraImageSearch = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(img => {
      setImage(true);
      setURI(img.path);
    });
  };

  const clickLocalImageSearch = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then(img => {
      setImage(true);
      setURI(img.path);
    });
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
            navigation.push('SearchResult', {
              search: search,
              text: inputText,
              uri,
            });
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
            source={image ? {uri: uri} : icons.camera}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.imageButtonContainer}>
        {checkImage() && (
          <>
            <Button
              text={'촬영하기'}
              h="55"
              w="300"
              size="22"
              m="10"
              color={colors.lightgray}
              press={clickCameraImageSearch}
            />
            <Button
              text={'갤러리에서 가져오기'}
              h="55"
              w="300"
              size="22"
              m="10"
              color={colors.lightgray}
              press={clickLocalImageSearch}
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
              press={() =>
                navigation.push('SearchResult', {search: search, uri})
              }
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
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderColor: colors.lightGray,
    borderWidth: 4,
    borderRadius: 15,
    margin: 10,
  },
  icon: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
    borderColor: colors.gray,
    borderRadius: 3,
  },
  imageButtonContainer: {
    margin: 30,
  },
});

export default ImageSearch;

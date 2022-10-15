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
import TouchableText from '../components/touchableText';
import {icons} from '../images';
import TextSearch from '../components/textSearch';
import ImageSearch from '../components/imageSearch';
import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const SearchDrug = ({navigation, route}) => {
  const [search, setSearch] = useState(route.params.find);
  const clickText = () => setSearch(true);
  const clickImage = () => setSearch(false);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Logo w="100" m="30" />
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableText text="텍스트" press={clickText} search={search} />
            <TouchableText text="이미지" press={clickImage} search={!search} />
          </View>
          <View style={styles.bottomContainer}>
            {search ? (
              <TextSearch
                navigation={navigation}
                route={route}
                search={search}
              />
            ) : (
              <ImageSearch
                navigation={navigation}
                route={route}
                search={search}
              />
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
  header: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default SearchDrug;

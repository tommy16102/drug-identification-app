import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../colors';

const TouchableText = ({text, press, search}) => {
  return (
    <TouchableOpacity onPress={press}>
      <Text
        style={[
          styles.btnText,
          // eslint-disable-next-line react-native/no-inline-styles
          {color: search ? colors.black : colors.lightgray},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 15,
  },
});

export default TouchableText;

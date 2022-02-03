import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';
import React from 'react';

const Error = (props) => {
  return (
    <View style={styles.errCont}>
      <Text>An error occurred!!</Text>
      <Button
        title='Try again'
        onPress={props.click}
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Error;

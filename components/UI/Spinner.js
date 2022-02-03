import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';
import React from 'react';

const Spinner = () => {
  return (
    <View style={styles.spinCont}>
      <ActivityIndicator
        size='large'
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;

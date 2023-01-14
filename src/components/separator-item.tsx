import React from 'react';
import {StyleSheet, View} from 'react-native';

export function SeparatorItem() {
  return <View style={styles.root} />;
}

const styles = StyleSheet.create({
  root: {
    height: 1,
    width: '100%',
    backgroundColor: '#5a433296',
  },
});

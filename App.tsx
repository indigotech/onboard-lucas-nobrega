import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignIn from './src/SignIn';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <SignIn />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
});

export default App;

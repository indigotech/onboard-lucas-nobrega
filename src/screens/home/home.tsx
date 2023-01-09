import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CustomButton} from '../../components/custom-button';
import {useAuth} from '../../contexts/auth';

export const Home = () => {
  const {signOut} = useAuth();

  return (
    <View style={styles.root}>
      <CustomButton text="Voltar" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
  },
});

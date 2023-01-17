import React from 'react';
import {
  Text,
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
  Pressable,
} from 'react-native';

interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  disabled?: boolean;
  text: string;
}

export function CustomButton({onPress, text, isLoading}: CustomButtonProps) {
  return (
    <Pressable
      style={isLoading ? styles.buttonPressedStyle : styles.buttonNormalStyle}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonNormalStyle: {
    backgroundColor: '#6d50f1',
    width: '100%',
    height: 60,
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  buttonPressedStyle: {
    backgroundColor: '#513ab4',
    width: '100%',
    height: 60,
    paddingHorizontal: 24,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

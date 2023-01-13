import {Text, StyleSheet, Pressable, GestureResponderEvent} from 'react-native';
import React from 'react';
interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
}

export const CustomButton = ({onPress, text}: CustomButtonProps) => {
  return (
    <Pressable
      style={({pressed}) =>
        pressed ? styles.buttonPressedStyle : styles.buttonNormalStyle
      }
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

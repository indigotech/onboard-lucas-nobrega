import {Text, StyleSheet, Pressable, GestureResponderEvent} from 'react-native';
import React from 'react';

type CustomButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
};

const CustomButton = ({onPress, text}: CustomButtonProps) => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#513ab4' : '#6d50f1',
        },
        styles.button,
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
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

export default CustomButton;

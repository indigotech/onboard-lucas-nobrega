import {GestureResponderEvent} from 'react-native';

export interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
}

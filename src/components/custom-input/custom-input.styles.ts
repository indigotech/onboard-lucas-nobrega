import styled from 'styled-components/native';

interface CustomInputProps {
  hasError: boolean;
}

export const ContainerCustomInput = styled.View`
  height: 50px;
  width: 100%;
  margin-bottom: 16px;
  justify-content: center;
  padding-right: 24px;
  padding-left: 24px;
`;

export const CustomInputText = styled.TextInput<CustomInputProps>`
  font-size: 18px;
  border-bottom-color: ${props => (props.hasError ? 'red' : '#6d50f1')};
  border-bottom-width: 2px;
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 8px;
  padding-top: 8px;
`;

export const ErrorMessage = styled.Text`
  color: red;
`;

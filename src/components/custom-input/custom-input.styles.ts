import styled from 'styled-components/native';

export const ContainerCustomInput = styled.View`
  height: 50px;
  width: 100%;
  margin-bottom: 16px;
  justify-content: center;
  padding-right: 24px;
  padding-left: 24px;
`;

export const CustomInput = styled.TextInput`
  font-size: 18px;
  border-bottom-color: #6d50f1;
  border-bottom-width: 2px;
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 8px;
  padding-top: 8px;
`;

export const ErrorMessage = styled.Text`
  color: red;
`;

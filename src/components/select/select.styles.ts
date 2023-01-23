import styled from 'styled-components/native';

interface ContainerSelectProps {
  hasError?: boolean;
}

export const ContainerSelect = styled.TouchableOpacity<ContainerSelectProps>`
  justify-content: center;
  width: 100%;
  height: 50px;
  border-bottom-color: ${props => (props.hasError ? 'red' : '#6d50f1')};
  border-bottom-width: 2px;
  max-width: 85%;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  color: black;
`;

export const ModalCancel = styled.Text`
  font-size: 14px;
  color: blue;
`;

export const OptionText = styled.Text`
  font-size: 16px;
  color: black;
`;

export const OptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #eee;
  border-bottom-width: 2px;
  padding: 10px;
`;

export const HeaderModal = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 12px;
  padding-left: 12px;
  border-bottom-color: #6d50f1;
  border-bottom-width: 2px;
  padding-bottom: 12px;
`;

export const ErrorMessage = styled.Text`
  color: red;
`;

export const TestView = styled.View<ContainerSelectProps>`
  align-self: flex-start;
  padding-left: 30px;
  margin-bottom: 24px;
  border-bottom-color: ${props => (props.hasError ? 'red' : '#6d50f1')};
`;

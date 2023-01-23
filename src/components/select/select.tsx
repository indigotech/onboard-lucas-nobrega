import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {
  ContainerSelect,
  ErrorMessage,
  HeaderModal,
  ModalCancel,
  ModalTitle,
  OptionContainer,
  OptionText,
  TestView,
} from './select.styles';

interface SelectInterface {
  options: {name: string}[];
  onChangeSelect: (param: string) => any;
  placeholder: string;
  onBlurValidation: () => string;
}

export const Select = ({
  options,
  onChangeSelect,
  placeholder,
  onBlurValidation,
}: SelectInterface) => {
  const [text, setText] = useState(placeholder);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePressOut = () => {
    const onBlurValidationString = onBlurValidation();
    setErrorMessage(onBlurValidationString);
  };

  function renderOption(item: any) {
    return (
      <OptionContainer
        onPress={() => {
          onChangeSelect(item.name);
          setText(item.name);
          setModalVisible(false);
        }}>
        <OptionText>{item.name}</OptionText>
      </OptionContainer>
    );
  }

  return (
    <>
      <ContainerSelect
        onPress={() => setModalVisible(true)}
        hasError={!!errorMessage}>
        <Text
          style={text !== placeholder ? styles.textSelected : styles.text}
          numberOfLines={2}>
          {text}
        </Text>
      </ContainerSelect>
      <TestView hasError={!!errorMessage}>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </TestView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          handlePressOut();
        }}>
        <SafeAreaView>
          <HeaderModal>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                handlePressOut();
              }}>
              <ModalTitle>{placeholder}</ModalTitle>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                handlePressOut();
              }}>
              <ModalCancel>Cancelar</ModalCancel>
            </TouchableOpacity>
          </HeaderModal>
          <FlatList
            data={options || []}
            keyExtractor={item => item.name}
            renderItem={({item}) => renderOption(item)}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'gray',
  },
  textSelected: {
    fontSize: 18,
    color: 'black',
  },
});

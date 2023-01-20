import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import * as Styled from './select.styles';

interface SelectInterface {
  options: {name: string}[];
  onChangeSelect: (param: string) => any;
  placeholder: string;
}

export const Select = ({
  options,
  onChangeSelect,
  placeholder,
}: SelectInterface) => {
  const [text, setText] = useState(placeholder);
  const [modalVisible, setModalVisible] = useState(false);

  function renderOption(item: any) {
    return (
      <Styled.OptionContainer
        onPress={() => {
          onChangeSelect(item.name);
          setText(item.name);
          setModalVisible(false);
        }}>
        <Styled.OptionText>{item.name}</Styled.OptionText>
      </Styled.OptionContainer>
    );
  }

  return (
    <>
      <Styled.Container onPress={() => setModalVisible(true)}>
        <Text
          style={text !== placeholder ? styles.textSelected : styles.text}
          numberOfLines={2}>
          {text}
        </Text>
      </Styled.Container>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView>
          <Styled.HeaderModal>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Styled.ModalTitle>{placeholder}</Styled.ModalTitle>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Styled.ModalCancel>Cancelar</Styled.ModalCancel>
            </TouchableOpacity>
          </Styled.HeaderModal>
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

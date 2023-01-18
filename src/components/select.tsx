import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

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
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => {
          onChangeSelect(item.name);
          setText(item.name);
          setModalVisible(false);
        }}>
        <Text style={styles.optionText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        <Text
          style={text !== placeholder ? styles.textSelected : styles.text}
          numberOfLines={2}>
          {text}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView>
          <View style={styles.headerModal}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalTitle}>{placeholder}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
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
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
    borderBottomColor: '#6d50f1',
    borderBottomWidth: 2,
    maxWidth: '85%',
    paddingVertical: 8,
  },
  text: {
    fontSize: 18,
    color: 'gray',
  },
  textSelected: {
    fontSize: 18,
    color: 'black',
  },
  headerModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomColor: '#6d50f1',
    borderBottomWidth: 2,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
  },
  modalCancel: {
    fontSize: 14,
    color: 'blue',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
});

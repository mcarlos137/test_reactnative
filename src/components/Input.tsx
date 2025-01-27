import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

const Input = ({ label, value, onChangeText, inputMode }: { label: string, value: string, onChangeText: ((text: string) => void), inputMode: 'text' | 'email' | 'numeric' }) => {

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>{label}</Text>
      <TextInput
        inputMode={inputMode}
        value={value}
        maxLength={30}
        onChangeText={onChangeText}

        style={styles.input}
      />
    </View>
  );
}

export default React.memo(Input)

const styles = StyleSheet.create({
  container: {
    borderColor: '#CDD7DD',
    borderWidth: 1,
    padding: 10,
    width: 299,
    height: 53,
    marginTop: 20,
    borderRadius: 8
  },
  text: {
    fontSize: 10,
    color: '#8F979C',
    fontWeight: 500,
    marginBottom: 3,
    fontFamily: 'Roboto'
  },
  input: {
    fontSize: 16,
    color: '#092333',
    fontWeight: 400,
    fontFamily: 'Roboto'
  },
});

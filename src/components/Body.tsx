import React, { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, GestureResponderEvent } from 'react-native';

const Body = ({ children, reverseColor, buttonText, buttonOnPress }: PropsWithChildren & { reverseColor: boolean, buttonText: string, buttonOnPress: (event: GestureResponderEvent) => void }) => {

  return (
    <View style={[styles.container, { backgroundColor: reverseColor ? 'white' : '#2C91CF' }]} >
      <View style={styles.viewChildren}>
        {children}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: reverseColor ? '#2C91CF' : 'white' }]}
        onPress={buttonOnPress}
      >
        <Text style={[styles.button_text, { color: reverseColor ? 'white' : '#2C91CF' }]}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(Body)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2C91CF',
    paddingBottom: 40,
  },
  viewChildren: {
    flex: 1,
    paddingTop: 40
  },
  button: {
    width: 311,
    height: 51,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  button_text: {
    color: '#2C91CF',
    fontWeight: 600,
    fontSize: 16,
    fontFamily: 'Inter'
  }
});

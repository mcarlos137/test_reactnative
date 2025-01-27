import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';

const Badge = ({ text }: { text: string }) => {

  return (
    <>
      <Image
        source={require('../assets/images/user.png')}
      />
      <Text style={styles.text} >{text}</Text>
    </>
  );
}

export default React.memo(Badge)

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 500,
    fontFamily: 'Poppins'
  },
});

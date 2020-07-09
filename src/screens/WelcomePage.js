import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const WelcomePage = ({ navigation }) => {
  const moveToStack = (stackName) => {
    navigation.navigate(stackName);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 50 }}>
        <FontAwesome5 name="kiwi-bird" size={65} color="black" />
        <Text style={{ marginLeft: 15, fontSize: 45 }}>JH Bird</Text>
      </View>
      <TouchableOpacity
        style={styles.signBox}
        onPress={() => {
          moveToStack('signIn');
        }}
      >
        <Text style={{ fontSize: 20 }}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signBox}
        onPress={() => {
          moveToStack('signUp');
        }}
      >
        <Text style={{ fontSize: 20 }}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signBox: {
    backgroundColor: 'gray',
    width: '80%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
});

export default WelcomePage;

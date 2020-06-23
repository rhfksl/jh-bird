import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const LoginStack = createStackNavigator();
const Login = () => {
  const tempNode = (
    <View style={{ flex: 1 }}>
      <Text>this is login screen</Text>
    </View>
  );

  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="login"
        component={tempNode}
        options={{
          title: '로그인',
        }}
      />
    </LoginStack.Navigator>
  );
};

export default Login;

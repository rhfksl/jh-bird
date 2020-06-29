import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ChattingScreen from '../screens/ChattingScreen';

import { createStackNavigator } from '@react-navigation/stack';
const ChatStack = createStackNavigator();

function RouteHomeStack() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: '친구 리스트',
        }}
      />
      <ChatStack.Screen
        name="chatting"
        component={ChattingScreen}
        options={{
          title: '채팅창',
        }}
      />
    </ChatStack.Navigator>
  );
}

export default RouteHomeStack;

import React from 'react';
import { connect } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import ChattingScreen from '../screens/ChattingScreen';

import { createStackNavigator } from '@react-navigation/stack';
const ChatStack = createStackNavigator();

function RouteHomeStack({ chattingRoomTitle }) {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: '친구 목록 🐤',
        }}
      />
      <ChatStack.Screen
        name="chatting"
        component={ChattingScreen}
        options={{
          title: chattingRoomTitle,
        }}
      />
    </ChatStack.Navigator>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    chattingRoomTitle: state.chattingRoomTitle,
  };
}

export default connect(mapReduxStateToReactProps)(RouteHomeStack);

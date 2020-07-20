import React from 'react';
import { connect } from 'react-redux';
import ChatRoomListScreen from '../screens/ChatRoomListScreen';
import ChattingScreen from '../screens/ChattingScreen';

import { createStackNavigator } from '@react-navigation/stack';
const ChatStack = createStackNavigator();

function RouteChatStack({ chattingRoomTitle }) {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="home"
        component={ChatRoomListScreen}
        options={{
          title: '채팅방 🐥',
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

export default connect(mapReduxStateToReactProps)(RouteChatStack);

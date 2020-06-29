import React from 'react';
import ChatRoomListScreen from '../screens/ChatRoomListScreen';
import ChattingScreen from '../screens/ChattingScreen';

import { createStackNavigator } from '@react-navigation/stack';
const ChatStack = createStackNavigator();

function RouteChatStack() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="home"
        component={ChatRoomListScreen}
        options={{
          title: '채팅 룸 화면',
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

export default RouteChatStack;

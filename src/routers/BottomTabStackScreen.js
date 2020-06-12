import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatRoomListScreen from '../screens/ChatRoomListScreen';
import SettingScreen from '../screens/SettingScreen';
import ChatScreen from '../screens/ChatScreen';
import { connect } from 'react-redux';
import { Entypo, Ionicons } from '@expo/vector-icons';
import * as shortid from 'shortid';

const BottomTab = createBottomTabNavigator();
const ChatStack = createStackNavigator();

import io from 'socket.io-client';
const socketClient = io('http://localhost:3000');

const routeChatStack = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="home"
        component={ChatRoomListScreen}
        options={{
          title: '채팅 홈 화면',
        }}
      />
      <ChatStack.Screen
        name="details"
        component={ChatScreen}
        options={{
          title: '채팅 화면',
          headerRight: () => (
            <Button onPress={() => socketClient.disconnect()} title="Info" color="black" />
          ),
        }}
      />
    </ChatStack.Navigator>
  );
};

function BottomTabStackScreen() {
  return (
    // 하단 탭 아이콘, fontSize 등 설정하는 부분
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <Entypo name="home" size={24} color="gray" />
            );
          } else if (route.name === 'Chat') {
            return focused ? (
              <Entypo name="chat" size={24} color="black" />
            ) : (
              <Entypo name="chat" size={24} color="gray" />
            );
          } else if (route.name === 'Setting') {
            return focused ? (
              <Ionicons name="md-settings" size={24} color="black" />
            ) : (
              <Ionicons name="md-settings" size={24} color="gray" />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Chat" component={routeChatStack} />
      <BottomTab.Screen name="Setting" component={SettingScreen} />
    </BottomTab.Navigator>
  );
}

export default BottomTabStackScreen;

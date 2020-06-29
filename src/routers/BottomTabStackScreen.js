import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatRoomListScreen from '../screens/ChatRoomListScreen';
import SettingScreen from '../screens/SettingScreen';
import ChatScreen from '../screens/ChatScreen';
import ChattingScreen from '../screens/ChattingScreen';
import { Entypo, Ionicons } from '@expo/vector-icons';
import * as shortid from 'shortid';
import RouteChatStack from './ChatStack.js';
import RouteHomeStack from './HomeStack';

const BottomTab = createBottomTabNavigator();

function BottomTabStackScreen({ hideBottomTab }) {
  return (
    // 하단 탭 아이콘, fontSize 등 설정하는 부분
    <BottomTab.Navigator
      navigationOptions={({ navigation, route }) => {
        console.log('what is this', navigation);
        console.log('this is name', route.name);
      }}
      screenOptions={({ route, navigation }) => ({
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
        tabBarVisible: hideBottomTab,
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <BottomTab.Screen name="Home" component={RouteHomeStack} />
      <BottomTab.Screen name="Chat" component={RouteChatStack} />
      <BottomTab.Screen name="Setting" component={SettingScreen} />
    </BottomTab.Navigator>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    hideBottomTab: state.hideBottomTab,
  };
}

export default connect(mapReduxStateToReactProps)(BottomTabStackScreen);

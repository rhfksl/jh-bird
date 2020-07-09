import 'react-native-gesture-handler';
import React from 'react';
import { connect } from 'react-redux';

import { Entypo, Ionicons } from '@expo/vector-icons';
import SettingScreen from '../screens/SettingScreen';
import RouteChatStack from './ChatStack.js';
import RouteHomeStack from './HomeStack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomTab = createBottomTabNavigator();

function BottomTabStackScreen({ hideBottomTab }) {
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

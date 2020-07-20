import 'react-native-gesture-handler';
import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { Entypo, Ionicons } from '@expo/vector-icons';
import SettingScreen from '../screens/SettingScreen';
import RouteChatStack from './ChatStack.js';
import RouteHomeStack from './HomeStack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomTab = createBottomTabNavigator();

function BottomTabStackScreen({ hideBottomTab, totalCount }) {
  return (
    // 하단 탭 아이콘, fontSize 등 설정하는 부분
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Home') {
            return <Entypo name="home" size={24} color={focused ? 'black' : 'gray'} />;
          } else if (route.name === 'Chat') {
            return (
              <>
                <Entypo name="chat" size={24} color={focused ? 'black' : 'gray'} />
                {totalCount ? (
                  <View
                    style={{
                      position: 'absolute',
                      right: 30,
                      top: 10,
                      backgroundColor: '#CCEEFF',
                      borderRadius: 6,
                      width: 12,
                      height: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'black', fontSize: 10, fontWeight: 'bold' }}>
                      {totalCount}
                    </Text>
                  </View>
                ) : null}
              </>
            );
          } else if (route.name === 'Setting') {
            return <Ionicons name="md-settings" size={24} color={focused ? 'black' : 'gray'} />;
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
    totalCount: state.totalCount,
  };
}

export default connect(mapReduxStateToReactProps)(BottomTabStackScreen);

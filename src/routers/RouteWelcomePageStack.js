import React, { useState } from 'react';
import { connect } from 'react-redux';

import Main from '../Main';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import WelcomePage from '../screens/WelcomePage';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const WelcomePageStack = createStackNavigator();

const RouteWelcomePageStack = ({ isLogined }) => {
  return isLogined ? (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  ) : (
    <>
      <NavigationContainer>
        <WelcomePageStack.Navigator>
          <WelcomePageStack.Screen
            name="welcomePage"
            component={WelcomePage}
            options={{
              title: 'JH Bird',
              headerShown: false,
            }}
          />
          <WelcomePageStack.Screen
            name="signIn"
            component={SignIn}
            options={{
              title: '로그인',
            }}
          />
          <WelcomePageStack.Screen
            name="signUp"
            component={SignUp}
            options={{
              title: '회원가입',
            }}
          />
        </WelcomePageStack.Navigator>
      </NavigationContainer>
    </>
  );
};

function mapReduxStateToReactProps(state) {
  return {
    isLogined: state.isLogined,
  };
}

export default connect(mapReduxStateToReactProps)(RouteWelcomePageStack);

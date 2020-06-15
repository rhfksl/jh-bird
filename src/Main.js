import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import BottomTabStackScreen from './routers/BottomTabStackScreen';

function Main(props) {
  useEffect(() => {
    const { changeUserData, changeUserInfo } = props;

    // request user Data
    fetch('http://localhost:3000/users/datas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: 'asdf' }),
    })
      .then((response) => response.json())
      .then((res) => {
        // insert chats and friendsLists in store
        changeUserInfo(res.user);
        changeUserData({ friendLists: res.friendLists, allChatRooms: res.allChatRooms });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <BottomTabStackScreen />
      </SafeAreaView>
    </NavigationContainer>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    changeUserData: (data) => {
      dispatch({ type: 'GET_USER_DATA', payload: data });
    },
    changeUserInfo: (data) => {
      dispatch({ type: 'GET_USER_INFO', payload: data });
    },
  };
}

export default connect(null, mapDispatchToProps)(Main);

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import BottomTabStackScreen from './routers/BottomTabStackScreen';

import io from 'socket.io-client';
const socketClient = io('http://localhost:3000');

function Main({
  changeFriendLists,
  changeAllMessages,
  changeUserInfo,
  changeCurrentChatRooms,
  addMessageToChattingRoom,
}) {
  useEffect(() => {
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
        changeFriendLists(res.friendLists);
        changeAllMessages(res.allChatRooms);

        // would-be user for connecting
        const user = {};
        user.nickname = res.user.nickname;

        // connect socketIo to all current chat rooms
        socketClient.connect();

        // const currentChatRooms = res.allChatRooms.map((room) => room.chattingRoomId);
        const currentChatRooms = Object.keys(res.allChatRooms);
        for (const room of currentChatRooms) {
          user.chattingRoomId = room;
          socketClient.emit(`joinRoom`, user);
        }

        // add current rooms in store
        changeCurrentChatRooms(currentChatRooms);
      })
      .catch((err) => console.log(err));
  }, []);

  socketClient.on('message', (message) => {
    //정리하자 스토어
    addMessageToChattingRoom(message);
  });

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
    changeUserInfo: (data) => {
      dispatch({ type: 'GET_USER_INFO', payload: data });
    },
    changeFriendLists: (data) => {
      dispatch({ type: 'CHANGE_FRIEND_LISTS', payload: data });
    },
    changeAllMessages: (data) => {
      dispatch({ type: 'CHANGE_ALL_MESSAGES', payload: data });
    },
    changeCurrentChatRooms: (data) => {
      dispatch({ type: 'CHANGE_CURRENT_CHATTING_ROOM', payload: data });
    },
    addMessageToChattingRoom: (data) => {
      dispatch({ type: 'ADD_MESSAGE_TO_CHATTING_ROOM', payload: data });
    },
  };
}

export default connect(null, mapDispatchToProps)(Main);

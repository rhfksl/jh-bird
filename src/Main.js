import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import BottomTabStackScreen from './routers/BottomTabStackScreen';

import io from 'socket.io-client';
const socketClient = io('http://127.0.0.1:3000');

function Main({
  changeFriendLists,
  changeAllMessages,
  changeUserInfo,
  changeCurrentChatRooms,
  addMessageToChattingRoom,
  user,
}) {
  useEffect(() => {
    // request user Data
    fetch('http://127.0.0.1:3000/users/datas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.user_id }),
    })
      .then((response) => response.json())
      .then((res) => {
        // insert chats and friendsLists in store
        changeUserInfo(res.user);
        changeFriendLists(res.friendLists);

        // reverse all messages for ordering chatting messages
        Object.values(res.allChatRooms).forEach((room) => {
          room.messages.reverse();
        });

        changeAllMessages(res.allChatRooms);

        // would-be user for connecting
        const user = {};
        user.nickname = res.user.nickname;

        // connect socketIo to all friends
        socketClient.connect();
        socketClient.emit(`joinRoom`, { nickname: res.user.nickname, friendId: res.user.id });

        for (let friend of res.friendLists) {
          const connectObj = {};
          connectObj.friendId = friend.id;
          connectObj.nickname = res.user.nickname;

          socketClient.emit(`joinRoom`, connectObj);
        }

        // add current rooms in store
        changeCurrentChatRooms(Object.keys(res.allChatRooms));
      })
      .catch((err) => console.log(err));
  }, []);

  socketClient.on('message', (message) => {
    // get messages in real time
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

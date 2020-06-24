import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import io from 'socket.io-client';
const socketClient = io('http://127.0.0.1:3000');

import { GiftedChat } from 'react-native-gifted-chat';
// import { set } from 'react-native-reanimated';

const SettingScreen = ({ user, navigation, allMessages }) => {
  const chattingRoomId = 2;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // disconnect when goback event happens
    navigation.addListener('blur', () => socketClient.disconnect());
    // connect socket when enter this component
    navigation.addListener('focus', () => {
      socketClient.connect();

      // connect socket to selected chatting room
      const curUser = {};
      curUser.nickname = user.nickname;
      curUser.chattingRoomId = 2;
      socketClient.emit(`joinRoom`, curUser);
    });
  }, []);

  useEffect(() => {
    if (allMessages[chattingRoomId]) {
      setMessages([...allMessages[chattingRoomId].messages]);
    }
  }, [allMessages]);

  const onSend = (newMsg = []) => {
    newMsg[0].chattingRoomId = 2;
    socketClient.emit('message', newMsg[0]);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id,
        name: user.nickname,
        avatar: 'https://placeimg.com/140/140/any',
      }}
      renderUsernameOnMessage={true}
    />
  );
};

function mapReduxStateToReactProps(state) {
  return {
    user: state.user,
    allMessages: state.allMessages,
  };
}

export default connect(mapReduxStateToReactProps)(SettingScreen);

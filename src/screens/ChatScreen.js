import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as shortid from 'shortid';

import io from 'socket.io-client';
const socketClient = io('http://localhost:3000');

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  const sendFirstConnection = () => {
    // console.log('did you come??');
    socketClient.emit('firstConnection');
  };

  useEffect(() => {
    console.log('입장하셨습니다');
    sendFirstConnection();
  }, []);

  socketClient.on('firstConnection', (res) => {
    let firstMsg = res.map((res) => res.userChat);
    setMessages([...messages, ...firstMsg]);
  });
  socketClient.on('chatMessage', (res) => {
    let newMsg = res.map((message) => message.userChat);
    setMessages([...messages, ...newMsg]);
  });

  return (
    <>
      <TouchableHighlight
        onPress={() => {
          socketClient.emit('chatMessage', {
            user_id: '하핫',
            userChat: 'ㅋㅋㅋㅋㅋ',
            chattingRoom_id: '1',
          });
        }}
        underlayColor="red"
      >
        <Text>새로운 채팅을 보내보잣</Text>
      </TouchableHighlight>
      <View>
        {messages.map((message) => (
          <Text key={shortid.generate()}>{message}</Text>
        ))}
      </View>
    </>
  );
}

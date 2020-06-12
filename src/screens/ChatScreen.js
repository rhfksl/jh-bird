import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import * as shortid from 'shortid';

import io from 'socket.io-client';
const socketClient = io('http://localhost:3000');

function ChatScreen({ navigation, user }) {
  const [messages, setMessages] = useState([]);
  const { user_id, chattingRoom_id } = user;

  const sendFirstConnection = () => {
    console.log('보냅니닷');
    socketClient.emit('joinRoom', user);
  };

  useEffect(() => {
    console.log('입장하셨습니다');
    sendFirstConnection();
  }, []);

  //   socketClient.on('firstConnection', (res) => {
  //     let firstMsg = res.map((res) => res.userChat);
  //     setMessages([...messages, ...firstMsg]);
  //   });
  socketClient.on('message', (res) => {
    // console.log('메세지를 받아요', res);
    // let newMsg = res.map((message) => message.userChat);
    // setMessages([...messages, ...newMsg]);
  });

  const dismiss = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dismiss();
      }}
    >
      <View style={{ height: '100%', backgroundColor: 'gray' }}>
        <View style={{ backgroundColor: 'red' }}>
          <TouchableHighlight
            onPress={() => {
              socketClient.emit('message', {
                user_id: user_id,
                userChat: '바뀜?',
                chattingRoom_id: chattingRoom_id,
              });
            }}
            underlayColor="red"
          >
            <Text>새로운 채팅을 보내보잣</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ backgroundColor: 'blue', width: 70 }}
            onPress={() => {
              socketClient.disconnect();
              //   socketClient.emit('disconnect');
              console.log('get out');
            }}
            underlayColor="red"
          >
            <Text>나갈거에욧</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              socketClient.connect();
              //   socketClient.emit('disconnect');
              console.log('get out');
            }}
            underlayColor="red"
          >
            <Text>다시 연결할거에욥</Text>
          </TouchableHighlight>
          <View>
            {messages.map((message) => (
              <Text key={shortid.generate()}>{message}</Text>
            ))}
          </View>
          <TextInput
            style={{
              height: 40,
              backgroundColor: 'white',
              borderColor: 'tomato',
              borderWidth: 1,
              marginHorizontal: 20,
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
            //  onFocus={this._onFocusTextField}
            placeholder="Type here!"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapReduxStateToReactProps)(ChatScreen);

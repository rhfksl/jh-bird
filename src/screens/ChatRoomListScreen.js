import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import shortid from 'shortid';
// const socketClient = io('http://localhost:3000');

const ChatStack = createStackNavigator();

function ChatRoomListScreen({ navigation, allMessages, currentChatRooms }) {
  const [chatRoomLists, setChatRoomLists] = useState([]);

  const makeChatRoomComponent = (roomId, roomname) => {
    return (
      <TouchableOpacity
        key={shortid.generate()}
        style={{ backgroundColor: 'yellow', height: 70, marginBottom: 10 }}
        onPress={() => {
          navigation.navigate('chatting', { chattingRoomId: roomId });
        }}
      >
        <Text>{roomname}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const newRoomLists = [];
    for (let [roomId, value] of Object.entries(allMessages)) {
      newRoomLists.push(makeChatRoomComponent(roomId, value));
    }
    setChatRoomLists([...chatRoomLists, ...newRoomLists]);
  }, []);

  useEffect(() => {
    if (currentChatRooms.length) {
      const changeRoomOrder = [];
      for (let room of currentChatRooms) {
        changeRoomOrder.push(makeChatRoomComponent(room, allMessages[room].roomname));
      }
      setChatRoomLists(changeRoomOrder);
    }
  }, [currentChatRooms]);

  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <ScrollView>{chatRoomLists}</ScrollView>
    </View>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    allMessages: state.allMessages,
    currentChatRooms: state.currentChatRooms,
  };
}

export default connect(mapReduxStateToReactProps)(ChatRoomListScreen);

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import shortid from 'shortid';
const socketClient = io('http://localhost:3000');

const ChatStack = createStackNavigator();

function ChatRoomListScreen({ navigation, allChatRooms, changeCurrentChattingRoomId }) {
  const [chatRoomLists, setChatRoomLists] = useState([]);

  const makeChatRoomComponent = (rooms) => {
    return (
      <TouchableOpacity
        key={shortid.generate()}
        style={{ backgroundColor: 'yellow', height: 70, marginBottom: 10 }}
        onPress={() => {
          navigation.navigate('details', { chattingRoomId: rooms.chattingRoomId });
        }}
      >
        <Text>{rooms.roomname}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    console.log('항상 실행될까요??');
  });

  useEffect(() => {
    const newRoomLists = [];
    allChatRooms.forEach((room) => newRoomLists.push(makeChatRoomComponent(room)));
    setChatRoomLists([...chatRoomLists, ...newRoomLists]);
  }, [allChatRooms]);

  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <ScrollView>{chatRoomLists}</ScrollView>
    </View>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    allChatRooms: state.userData.allChatRooms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCurrentChattingRoomId: (data) => {
      dispatch({ type: 'CHANGE_CURRENT_CHATTING_ROOM', payload: data });
    },
  };
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(ChatRoomListScreen);

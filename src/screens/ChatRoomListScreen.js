import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import shortid from 'shortid';
const socketClient = io('http://localhost:3000');

const ChatStack = createStackNavigator();

function ChatRoomListScreen({ navigation, allChatRooms }) {
  const [chatRoomLists, setChatRoomLists] = useState([]);

  const makeChatRoomComponent = (rooms) => {
    return (
      <TouchableOpacity
        key={shortid.generate()}
        style={{ backgroundColor: 'yellow', height: 70 }}
        onPress={(e) => {
          navigation.navigate('details');
        }}
      >
        <Text>{rooms.roomname}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const newRoomLists = [];
    allChatRooms.forEach((room) => newRoomLists.push(makeChatRoomComponent(room)));
    setChatRoomLists([...chatRoomLists, ...newRoomLists]);
  }, [allChatRooms]);

  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <ScrollView>
        <TouchableOpacity
          style={{ backgroundColor: 'yellow', height: 70 }}
          onPress={(e) => {
            navigation.navigate('details');
          }}
        >
          <Text>이거 방탄유리아</Text>
        </TouchableOpacity>
        {chatRoomLists}
      </ScrollView>
    </View>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    allChatRooms: state.userData.allChatRooms,
  };
}

export default connect(mapReduxStateToReactProps)(ChatRoomListScreen);

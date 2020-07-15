import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import shortid from 'shortid';

function ChatRoomListScreen({ navigation, allMessages, currentChatRoomlists, user, friendLists }) {
  const [chatRoomLists, setChatRoomLists] = useState([]);

  const getRoomName = (roomInfo) => {
    if (roomInfo.userId === user.id) {
      return { roomname: roomInfo.roomname2, friendId: roomInfo.userId2 };
    } else {
      return { roomname: roomInfo.roomname, friendId: roomInfo.userId };
    }
  };

  const getFriendImage = (friendId) => {
    let lists = Object.values(friendLists);
    let leng = lists.length;
    for (let i = 0; i < leng; i++) {
      if (lists[i].id === friendId) {
        return lists[i].img;
      }
    }
  };

  const formatTimestamp = (time) => {
    time = time.split('T');
    let date = time[0];
    let hour = time[1].substr(0, 8);
    return { date, hour };
  };

  const makeChatRoomComponent = (roomId, roomInfo) => {
    const { friendId, roomname } = getRoomName(roomInfo);

    const image = getFriendImage(friendId);
    let { date, hour } = formatTimestamp(roomInfo.messages[0].createdAt);

    return (
      <TouchableOpacity
        key={shortid.generate()}
        style={styles.chattingRoomList}
        onPress={() => {
          navigation.navigate('chatting', {
            chattingRoomId: roomId,
            friendId: friendId,
          });
        }}
      >
        <Image style={styles.img} source={{ url: image }} />
        <View style={styles.room}>
          <Text>{roomname}</Text>
          <View
            style={{
              alignItems: 'flex-end',
              paddingRight: 10,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {allMessages[roomId].count ? (
              <View
                style={{
                  backgroundColor: '#CCEEFF',
                  alignSelf: 'center',
                  width: 35,
                  height: 35,
                  borderRadius: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                <Text style={{ color: 'black', fontWeight: 'bold' }}>
                  {allMessages[roomId].count}
                </Text>
              </View>
            ) : null}

            <View>
              <Text style={{ color: 'gray' }}>{date}</Text>
              <Text style={{ color: 'gray' }}>{hour}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (currentChatRoomlists.length) {
      const changeRoomOrder = [];
      for (let room of currentChatRoomlists) {
        changeRoomOrder.push(makeChatRoomComponent(room, allMessages[room]));
      }
      setChatRoomLists(changeRoomOrder);
    }
  }, [allMessages]);

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <ScrollView>{chatRoomLists}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chattingRoomList: {
    paddingLeft: 10,
    height: 70,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 55,
  },
  room: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
  },
});

function mapReduxStateToReactProps(state) {
  return {
    allMessages: state.allMessages,
    currentChatRoomlists: state.currentChatRoomlists,
    user: state.user,
    friendLists: state.friendLists,
  };
}

export default connect(mapReduxStateToReactProps)(ChatRoomListScreen);

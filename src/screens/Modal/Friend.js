import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Friend = ({ visible, user, setFriendModalVisible, friendInfo, navigation }) => {
  const getChattingRoomId = (me, friend) => {
    // request chattingRoomId
    return fetch('http://127.0.0.1:3000/chattingRooms/isChattingRoomExist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usersInfo: [me, friend] }),
    })
      .then((res) => res.json())
      .then((res) => res);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableHighlight
        style={{ position: 'absolute', bottom: 200, right: 5 }}
        onPress={() => {
          setFriendModalVisible(!visible);
        }}
        underlayColor="transparent"
      >
        <FontAwesome name="close" size={30} color="black" />
      </TouchableHighlight>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image style={styles.img} source={{ url: friendInfo.img }} />
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontSize: 20 }}>{friendInfo.nickname}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#EBE5E4',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onPress={async () => {
                const chattingRoomId = await getChattingRoomId(user, friendInfo);
                navigation.navigate('chatting', {
                  friendId: friendInfo.id,
                  userId: user.id,
                  chattingRoomId: chattingRoomId,
                });
                setFriendModalVisible(!visible);
              }}
            >
              <Text style={{ fontSize: 15 }}>대화창 이동</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    height: 150,
    backgroundColor: '#DDDDDD',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 55,
    marginTop: 15,
    marginLeft: 10,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    changeFriendLists: (data) => {
      dispatch({ type: 'CHANGE_FRIEND_LISTS', payload: data });
    },
  };
}

export default connect(null, mapDispatchToProps)(Friend);

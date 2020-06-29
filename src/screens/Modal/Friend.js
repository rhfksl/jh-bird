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

const Friend = ({ visible, setFriendModalVisible, friendInfo, navigation }) => {
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
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          width: '100%',
          height: 150,
          backgroundColor: 'blue',
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image
            style={{
              width: 120,
              height: 120,
              borderRadius: 55,
              marginTop: 15,
              marginLeft: 10,
              //   resizeMode: 'cover',
            }}
            source={{ url: friendInfo.img }}
          />
          <View
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 20,
              justifyContent: 'space-between',
            }}
          >
            <Text>{friendInfo.nickname}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
              onPress={() => {
                navigation.navigate('chatting', { chattingRoomId: friendInfo.id });
                setFriendModalVisible(!visible);
              }}
            >
              <Text style={{ fontSize: 20 }}>대화창 이동</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#2196F3',
    width: 30,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 8,
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

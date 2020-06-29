import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Modal, Text, View, TouchableHighlight, TextInput } from 'react-native';

const AddFriend = ({ visible, setModalVisible, friends, nickname, changeFriendLists }) => {
  const [text, onChangeText] = useState('');

  const addFriend = () => {
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].nickname === text) {
        alert('이미 추가된 닉네임입니다');
        return;
      }
    }

    const body = { myNickname: nickname, friendNickname: text };
    fetch('http://127.0.0.1:3000/friendLists/addFriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.body === 'not exist') {
          alert('존재하지 않는 닉네임입니다');
        } else {
          changeFriendLists([res.body]);
          onChangeText('');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TouchableHighlight
          style={styles.closeButton}
          onPress={() => {
            setModalVisible(!visible);
          }}
        >
          <Text style={{ fontSize: 20 }}>X</Text>
        </TouchableHighlight>
        <TextInput
          autoFocus={true}
          style={styles.textInput}
          onChangeText={(text) => onChangeText(text)}
          placeholder="닉네임을 검색하세요"
        />
        <TouchableHighlight style={styles.addButton} onPress={addFriend} value={text}>
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: '#2196F3',
    width: 14,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 2,
  },
  textInput: {
    height: 30,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 7,
    paddingLeft: 7,
    backgroundColor: 'white',
  },
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

export default connect(null, mapDispatchToProps)(AddFriend);

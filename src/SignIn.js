import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

const SignIn = ({ changeUserInfo, successLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const requestFetch = () => {
    const userObj = {};
    userObj.user_id = id;
    userObj.password = password;

    fetch(`http://127.0.0.1:3000/users/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((res) => {
        // success sign up
        if (res.id) {
          changeUserInfo(res);
          successLogin();
        } else {
          alert(res.body);
        }
      });
  };

  return (
    <TouchableWithoutFeedback
      style={{ backgroundColor: 'yellow', flex: 1 }}
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-80} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View>
            <Text style={styles.text}>ID</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setId(text)}
            placeholder="아이디를 입력하세요"
          />
          <View>
            <Text style={styles.text}>PASSWORD</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="비밀번호를 입력하세요"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button title="Login" onPress={() => requestFetch('login')} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  text: {
    marginLeft: 20,
    fontSize: 15,
    marginRight: 8,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    changeUserInfo: (data) => {
      dispatch({ type: 'CHANGE_USER_INFO', payload: data });
    },
    successLogin: () => {
      dispatch({ type: 'SET_ISLOGINED' });
    },
  };
}

export default connect(null, mapDispatchToProps)(SignIn);

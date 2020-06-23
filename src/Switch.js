import React, { useState } from 'react';
import {
  StyleSheet,
  Button,
  Keyboard,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Main from './Main';
// createSwitchNavigator(RouteConfigs, SwitchNavigatorConfig);

const Switch = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const signUp = () => {
    const userObj = {};
    userObj.user_id = id;
    userObj.password = password;
    userObj.nickname = nickname;

    fetch('http://127.0.0.1:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.body === '유저가 이미 존재합니다' || res.body === '닉네임이 이미 존재합니다') {
          alert(res.body);
        } else {
          setIsLogin(true);
        }
      });
  };

  const Login = (
    <TouchableWithoutFeedback
      style={{ backgroundColor: 'yellow', flex: 1 }}
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-150} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setId(text)}
            placeholder="아이디를 입력하세요"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            placeholder="비밀번호를 입력하세요"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNickname(text)}
            placeholder="닉네임을 입력하세요"
          />
          <Button title="goRoom" onPress={() => signUp()} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );

  return isLogin ? <Main /> : Login;
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
});

export default Switch;

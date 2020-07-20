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
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const SignUp = ({ successLogin, changeUserInfo }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [nickname, setNickname] = useState('');

  const checkPassword = () => {
    if (password === password2) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  };

  const requestFetch = () => {
    const userObj = {};
    userObj.user_id = id;
    userObj.password = password;
    userObj.nickname = nickname;

    fetch(`http://127.0.0.1:3000/users/signUp`, {
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
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-10} style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View>
            <Text style={styles.text}>ID</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setId(text)}
            placeholder="아이디를 입력하세요"
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>PASSWORD</Text>
            {isPasswordSame ? (
              <AntDesign name="checkcircleo" size={24} color="green" />
            ) : (
              <>
                <Feather name="x-circle" size={24} color="red" />
                <Text style={{ fontSize: 11, color: 'gray', marginLeft: 3, marginTop: 5 }}>
                  비밀번호가 서로 맞지 않습니다
                </Text>
              </>
            )}
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            onBlur={checkPassword}
            secureTextEntry={true}
            placeholder="비밀번호를 입력하세요"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword2(text)}
            onBlur={checkPassword}
            secureTextEntry={true}
            placeholder="비밀번호를 한번 더 입력하세요"
          />
          <View>
            <Text style={styles.text}>NICKNAME</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNickname(text)}
            placeholder="닉네임을 입력하세요"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button title="Sign Up" onPress={() => requestFetch('signUp')} />
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

export default connect(null, mapDispatchToProps)(SignUp);

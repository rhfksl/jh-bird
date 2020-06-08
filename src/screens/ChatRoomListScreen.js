import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import io from 'socket.io-client';
const socketClient = io('http://localhost:3000');

const ChatStack = createStackNavigator();

export default function ChatRoomListScreen({ navigation }) {
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
        {/* <TouchableOpacity
          style={{ backgroundColor: 'yellow', height: 70 }}
          onPress={(e) => {
            navigation.navigate('details');
          }}
        >
          <Text>this is 방탄유리 개</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

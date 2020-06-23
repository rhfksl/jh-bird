import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

const SettingScreen = () => {
  const [messages, setMessages] = useState([
    {
      _id: 2,
      text: 'what?',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);

  const onSend = (newMsg = []) => {
    setMessages(GiftedChat.append(messages, newMsg));
    console.log('기존', messages);
    console.log('뉴', newMsg);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default SettingScreen;
// export default function SettingScreen() {
//   return (
//     <View>
//       <Text>hi</Text>
//     </View>
//   );
// }

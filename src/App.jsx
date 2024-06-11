import { useEffect, useState } from "react"
import Chats from "./modules/chats/Chats"
import ActiveChat from "./modules/activeChat/ActiveChat"
import socket from './api/socket'

const App = () => {


  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState('');
  const [activeChatMessages, setActiveChatMessages] = useState([]);

  useEffect(() => {

    socket.emit('getChats');

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('getChats', (chats) => {
      console.log('chats', chats);
      setChats(chats);
    });

    socket.on('getMessages', (messages) => {
      console.log('messages', messages);
      setActiveChatMessages(messages);
    });


    return () => {
      socket.off('getMessages');
      socket.off('joinChat');
      socket.off('connect');

    };
  }, []);

  const setNewChat = (chat) => {
    setActiveChat(chat);
    if (socket) {
      console.log('chat', chat);
      console.log('запрашиваю сообщения для:', chat.chat_id);
      socket.emit('joinChat', chat.chat_id)
    }
  }

  const sendMessage = (messageText) => {
    socket.emit('sendMessage', JSON.stringify({
      chat_id: activeChat.chat_id,
      user_id: 1,
      text: messageText,
      name: 'Имя оператора',
      type: 'operator'
    }));
  }

  // useEffect(() => {
  //   if (socket !== '') {
  //     socket.on('connect', () => {
  //       console.log('Connected to socket server');
  //     });
  //     socket.emit('getChats');
  //     socket.on('getChats', (chats) => {
  //       console.log('chats', chats);
  //       setChats(chats);
  //     });
  //   }
  // }, [socket])

  return <div className="operator-chat__wrapper">
    <Chats chats={chats} setNewChat={setNewChat} />
    <ActiveChat activeChatMessages={activeChatMessages} sendMessage={sendMessage} activeChat={activeChat} />
  </div>
}

export default App

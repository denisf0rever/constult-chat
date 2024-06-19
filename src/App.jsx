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
      console.log(Object.values(JSON.parse(chats)));
      setChats(Object.values(JSON.parse(chats)));
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

  const deleteChat = (toBan) => {
    setActiveChat('');
    setActiveChatMessages([]);
    console.log(toBan);
    socket.emit('deleteChat', JSON.stringify({
      chat_id: activeChat.chat_id,
      to_ban: toBan
    }))
  }

  const truncateMessages = () => {
    console.log('deleteMessages', activeChat.chat_id);
    socket.emit('deleteMessages', JSON.stringify({
      chat_id: activeChat.chat_id
    }))
  }

  return <div className="operator-chat__wrapper">
    <Chats chats={chats} setNewChat={setNewChat} />
    <ActiveChat activeChatMessages={activeChatMessages} sendMessage={sendMessage} activeChat={activeChat} deleteChat={deleteChat} truncateMessages={truncateMessages} />
  </div>
}

export default App

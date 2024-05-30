import { useEffect, useState } from "react"
import Chats from "./modules/chats/Chats"
import ActiveChat from "./modules/activeChat/ActiveChat"
import io from "socket.io-client";

function App() {

  const [socket, setsocket] = useState('');

  const [chats, setChats] = useState([]);

  const [activeChat, setActiveChat] = useState('');

  const [activeChatMessages, setActiveChatMessages] = useState([]);

  //123

  const setNewChat = (chat) => {
    setActiveChat(chat);
    if (socket) {
      console.log('chat', chat);
      console.log('запрашиваю сообщения для:', chat.chat_id);
      socket.emit('getMessages', chat.chat_id);
      socket.on('getMessages', (messages) => {
        console.log('messages', messages);
        setActiveChatMessages(messages);
      });
    }
  }

  const sendMessage = (messageText) => {
    socket.emit('sendMessage', JSON.stringify({
      chat_id: activeChat.chat_id, user_id: 1, text: messageText, name: 'Имя оператора',
      type: 0
    }));
  }

  useEffect(() => {
    // setsocket(io('https://chat-test-server.onrender.com'));
    setsocket(io('http://server.okuoku.ru:6001'));

  }, [])

  useEffect(() => {
    console.log(socket);
    if (socket !== '') {
      socket.on('connect', () => {
        console.log('Connected to socket server');
      });
      socket.emit('getChats');
      socket.on('getChats', (chats) => {
        console.log('chats', chats);
        setChats(chats);
      });
    }
  }, [socket])

  return <div className="operator-chat__wrapper">
    <Chats chats={chats} setNewChat={setNewChat} />
    <ActiveChat activeChatMessages={activeChatMessages} sendMessage={sendMessage} activeChat={activeChat} />
  </div>
}

export default App

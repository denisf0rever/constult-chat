import Chat from "./components/Chat";
import Filter from "./components/Filter";
import socket from "../../api/socket";
import { useState, useEffect } from "react";

const Chats = (props) => {
  console.log('Chats')

  const [chats, setChats] = useState([]);

  const setNewChat = (chat) => {
    props.setActiveChat(chat);
    if (socket) {
      console.log('chat', chat);
      console.log('запрашиваю сообщения для:', chat.chat_id);
      socket.emit('joinChat', chat.chat_id)
    }
  }

  useEffect(() => {

    socket.emit('getChats');
    socket.on('getChats', (chats) => {
      setChats(Object.values(JSON.parse(chats)));
    });

    return () => {
      socket.off('getChats');
    };
  }, []);

  return <div className="operator-chat__chats-wrapper chats-list">
    <Filter />
    <ul className="chats-list__list">
      {chats.map((el, key) => (
        <Chat key={key} chat={el[0]} setNewChat={setNewChat} />
      ))}
    </ul>
  </div>
}

export default Chats;
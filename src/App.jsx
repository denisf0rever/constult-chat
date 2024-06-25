import { useEffect, useState, useRef } from "react"
import Chats from "./modules/chats/Chats"
import ActiveChat from "./modules/activeChat/ActiveChat"
import socket from './api/socket'

const App = () => {
  console.log('//////////////App//////////////')

  const [activeChat, setActiveChat] = useState('');

  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    return () => {
      socket.off('connect');
    };
  }, []);


  return <div className="operator-chat__wrapper">
    <Chats setActiveChat={setActiveChat} />
    <ActiveChat activeChat={activeChat} setActiveChat={setActiveChat} />
  </div>
}

export default App

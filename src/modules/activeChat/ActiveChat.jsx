import ChatHeader from "./components/ChatHeader";
import ChatBottom from "./components/ChatBottom";
import ChatList from "./components/ChatList";
import ChatMenu from "./components/ChatMenu";
import { useState, useEffect } from "react";
import socket from "../../api/socket";

const ActiveChat = (props) => {
  console.log('ActiveChat');
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [activeChatMessages, setActiveChatMessages] = useState([]);

  useEffect(() => {

    socket.on('getMessages', (messages) => {
      console.log('messages', messages);
      setActiveChatMessages(messages);
    });

    return () => {
      socket.off('getMessages');
    };
  }, []);

  return <div className="operator-chat__active-chat-wrapper active-chat">
    <div className="active-chat__wrapper">
      {/* <ChatHeader activeChatName={props.activeChat.name} isMenuHidden={isMenuHidden} setIsMenuHidden={setIsMenuHidden} />
      <ChatList setActiveChatMessages={setActiveChatMessages} activeChatMessages={activeChatMessages} />
      <ChatBottom activeChat={props.activeChat} />
      <ChatMenu isMenuHidden={isMenuHidden} deleteChat={props.deleteChat} activeChat={props.activeChat}
        setIsMenuHidden={setIsMenuHidden} setActiveChatMessages={setActiveChatMessages} setActiveChat={props.setActiveChat} /> */}
      {activeChatMessages.length > 0
        ? <>
          <ChatHeader activeChatName={props.activeChat.name} isMenuHidden={isMenuHidden} setIsMenuHidden={setIsMenuHidden} />
          <ChatList setActiveChatMessages={setActiveChatMessages} activeChatMessages={activeChatMessages} />
          <ChatBottom activeChat={props.activeChat} />
          <ChatMenu isMenuHidden={isMenuHidden} deleteChat={props.deleteChat} activeChat={props.activeChat}
            setIsMenuHidden={setIsMenuHidden} setActiveChatMessages={setActiveChatMessages} setActiveChat={props.setActiveChat} />
        </>
        : <></>
      }

    </div>

  </div>
}

export default ActiveChat;
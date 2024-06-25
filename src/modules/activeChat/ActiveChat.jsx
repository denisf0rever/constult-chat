import ChatHeader from "./components/ChatHeader";
import ChatBottom from "./components/ChatBottom";
import ChatList from "./components/ChatList";
import ChatMenu from "./components/ChatMenu";
import { useEffect, useState } from "react";
import socket from "../../api/socket";

const ActiveChat = (props) => {

  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [isNowWriting, setIsNowWriting] = useState('');

  useEffect(() => {

    socket.on('setWritingStatus', (JSONmsg) => {
      const msg = JSON.parse(JSONmsg);
      // console.log('msg', msg);
      if (msg.is_writing) {
        setIsNowWriting(msg.name);
      }
      else if (!msg.is_writing) {
        setIsNowWriting('');
      }
    });

    return () => {
      socket.off('setWritingStatus');
    };
  }, [])

  const isWriting = (isWritingVal) => {
    socket.emit('setWritingStatus', JSON.stringify({
      chat_id: props.activeChat.chat_id,
      name: 'Оператор',
      is_writing: isWritingVal
    }))
    if (isWritingVal) {
      console.log('is writin emit true')
    }
    else if (!isWritingVal) {
      console.log('is writin emit false')
    }
  }

  return <div className="operator-chat__active-chat-wrapper active-chat">
    <div className="active-chat__wrapper">
      <ChatHeader activeChatName={props.activeChat.name} isMenuHidden={isMenuHidden} setIsMenuHidden={setIsMenuHidden} />
      <ChatList activeChatMessages={props.activeChatMessages} messageRefs={props.messageRefs}
        isNowWriting={isNowWriting} />
      <ChatBottom sendMessage={props.sendMessage} isWriting={isWriting} />
      <ChatMenu isMenuHidden={isMenuHidden} deleteChat={props.deleteChat} truncateMessages={props.truncateMessages}
        setIsMenuHidden={setIsMenuHidden} />
    </div>

  </div>
}

export default ActiveChat;
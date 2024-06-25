import ChatHeader from "./components/ChatHeader";
import ChatBottom from "./components/ChatBottom";
import ChatList from "./components/ChatList";
import ChatMenu from "./components/ChatMenu";
import { useEffect, useState, useRef } from "react";
import socket from "../../api/socket";

const ActiveChat = (props) => {
  console.log('ActiveChat');
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [isNowWriting, setIsNowWriting] = useState('');
  const [activeChatMessages, setActiveChatMessages] = useState([]);
  const messageRefs = useRef({});


  useEffect(() => {

    socket.on('getMessages', (messages) => {
      console.log('messages', messages);
      setActiveChatMessages(messages);
    });


    return () => {
      socket.off('getMessages');
    };
  }, []);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if ((entry.target.getAttribute('is-read') == 0) && (entry.target.getAttribute('msg-author') != 1)) {
              socket.emit('changeMessageStatus', JSON.stringify({
                chat_id: +entry.target.getAttribute('room-id'),
                message_id: +entry.target.getAttribute('msg-id')
              }));
              console.log('see:', JSON.stringify({
                chat_id: +entry.target.getAttribute('room-id'),
                message_id: +entry.target.getAttribute('msg-id')
              }));
            }
            // const messageId = entry.target.getAttribute('data-id');
            // socket.emit('messageRead', messageId);
          }
        });
      },
      { threshold: 1.0 }
    );

    Object.values(messageRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeChatMessages]);

  return <div className="operator-chat__active-chat-wrapper active-chat">
    <div className="active-chat__wrapper">
      <ChatHeader activeChatName={props.activeChat.name} isMenuHidden={isMenuHidden} setIsMenuHidden={setIsMenuHidden} />
      <ChatList activeChatMessages={activeChatMessages} messageRefs={messageRefs}
        isNowWriting={isNowWriting} />
      <ChatBottom isWriting={isWriting} activeChat={props.activeChat} />
      <ChatMenu isMenuHidden={isMenuHidden} deleteChat={props.deleteChat} activeChat={props.activeChat}
        setIsMenuHidden={setIsMenuHidden} setActiveChatMessages={setActiveChatMessages} setActiveChat={props.setActiveChat} />
    </div>

  </div>
}

export default ActiveChat;
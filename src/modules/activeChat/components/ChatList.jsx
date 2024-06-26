import IsWriting from './IsWriting';
import Message from './Message';
import { useEffect, useRef } from 'react';
import socket from '../../../api/socket';

const ChatList = (props) => {
  console.log('ChatList');

  const messageRefs = useRef({});
  const messageListScroll = useRef({});


  useEffect(() => {
    console.log(messageListScroll.current.scrollTop, '-', messageListScroll.current.scrollHeight - messageListScroll.current.clientHeight);
    if (messageListScroll.current.scrollTop > messageListScroll.current.scrollHeight - messageListScroll.current.clientHeight - 400) {
      messageListScroll.current.scrollTop = messageListScroll.current.scrollHeight;
    }
  }, [props.activeChatMessages])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if ((entry.target.getAttribute('data-is-read') == 0) && (entry.target.getAttribute('data-msg-author') != 1)) {
              socket.emit('changeMessageStatus', JSON.stringify({
                chat_id: +entry.target.getAttribute('data-room-id'),
                message_id: +entry.target.getAttribute('data-msg-id')
              }));
              console.log('see:', JSON.stringify({
                chat_id: +entry.target.getAttribute('data-room-id'),
                message_id: +entry.target.getAttribute('data-msg-id')
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
  }, [props.activeChatMessages]);

  return <div className="active-chat__list chat-list" ref={messageListScroll}>
    <div className="chat-list__wrapper" >
      <ul className="chat-list__list">
        {props.activeChatMessages.map((el, key) => <Message key={key} message={el} messageRefs={messageRefs}
        />)}
      </ul>
      <IsWriting />
    </div>
  </div>
}

export default ChatList;
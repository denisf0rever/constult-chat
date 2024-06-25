import Message from './Message';

const ChatList = (props) => {
  console.log('ChatList');
  return <div className="active-chat__list chat-list">
    <div className="chat-list__wrapper">
      <ul className="chat-list__list">
        {props.activeChatMessages.map((el, key) => <Message key={key} message={el} messageRefs={props.messageRefs}
        />)}
      </ul>
      {props.isNowWriting === ''
        ? <div className="chat-list__now-writing"></div>
        : <div className="chat-list__now-writing">{props.isNowWriting} печатает...</div>}
    </div>
  </div>
}

export default ChatList;
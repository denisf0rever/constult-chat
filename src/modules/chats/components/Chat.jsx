import avatar from '../../../images/avatar.jpg';


const Chat = (props) => {

  const chooseChat = () => {
    props.setNewChat(props.chat);
  }

  return <li className="chats-list__item chat-item" onClick={chooseChat}>
    <div className="chat-item__wrapper">
      <img src={avatar} alt="" className="chat-item__avatar" />
      <div className="chat-item__username">{props.chat.name}</div>
      <div className="chat-item__last-message">Последнее сообщение</div>
      <div className="chat-item__time">12:34</div>
    </div>
  </li>
}

export default Chat;
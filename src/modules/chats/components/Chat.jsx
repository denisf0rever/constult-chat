import avatar from '../../../images/avatar.jpg';


const Chat = (props) => {

  let formattedTime = ''

  const chooseChat = () => {
    props.setNewChat(props.chat);
  }

  console.log(props.chat);

  if (props.chat !== undefined) {
    formattedTime = props.chat.created_at.split(' ')[1].split(':').slice(0, 2).join(':');
  }


  return (
    <li className="chats-list__item chat-item" onClick={chooseChat}>
      <div className="chat-item__wrapper">
        <img src={avatar} alt="" className="chat-item__avatar" />
        <div className="chat-item__username">{props.chat ? props.chat.chat_id : ''}</div>
        <div className="chat-item__last-message">{props.chat ? props.chat.username : ''}:{`  ${props.chat ? props.chat.text : ''}`}</div>
        <div className="chat-item__time">{formattedTime}</div>
      </div>
    </li>
  );
}

export default Chat;
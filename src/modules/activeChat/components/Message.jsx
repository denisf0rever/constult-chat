

const Message = (props) => {

  const formattedTime = props.message.created_at.split(' ')[1].split(':').slice(0, 2).join(':');

  const messageTypeClass = (props.message.role === 0)
    ? 'chat-list__message chat-list__operator'
    : 'chat-list__message chat-list__user';

  return <li className={messageTypeClass}>
    <div className="chat-list__message-text">{props.message.text}</div>
    <div className="chat-list__time">{formattedTime}</div>
  </li>
}

export default Message;


const Message = (props) => {
  console.log('Message');
  const formattedTime = props.message.created_at.split(' ')[1].split(':').slice(0, 2).join(':');

  const messageTypeClass = (props.message.role === 'operator')
    ? 'chat-list__message chat-list__operator'
    : 'chat-list__message chat-list__user';

  return <li msg-author={props.message.user_id} is-read={props.message.is_read} msg-id={props.message.message_id} room-id={props.message.chat_id} ref={(el) => (props.messageRefs.current[props.message.message_id] = el)}
    className={messageTypeClass}>
    <div className="chat-list__message-text">{props.message.text}</div>
    <div className="chat-list__time">{formattedTime}</div>
  </li>
}

export default Message;
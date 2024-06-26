import checkmarkGrey from '../../../images/check-mark.svg';
import checkmarkGreen from '../../../images/check-mark-green.svg';

const Message = (props) => {
  console.log('Message');
  const formattedTime = props.message.created_at.split(' ')[1].split(':').slice(0, 2).join(':');

  const messageTypeClass = (props.message.role === 'operator')
    ? 'chat-list__message chat-list__operator'
    : 'chat-list__message chat-list__user';

  return <li data-msg-author={props.message.user_id} data-is-read={props.message.is_read} data-msg-id={props.message.message_id} data-room-id={props.message.chat_id} ref={(el) => (props.messageRefs.current[props.message.message_id] = el)}
    className={messageTypeClass}>
    <div className="chat-list__message-text">{props.message.text}</div>
    <div className="chat-list__time">{formattedTime}</div>
    {props.message.role === 'operator'
      ? (props.message.is_read === 1)
        ? <div className="chat-list__is-read">
          <img className="chat-list__checkmark" src={checkmarkGreen} alt="" />
          <img className="chat-list__checkmark" src={checkmarkGreen} alt="" />
        </div>
        : <div className="chat-list__is-read">
          <img className="chat-list__checkmark" src={checkmarkGrey} alt="" />
        </div>
      : <></>}
  </li>
}

export default Message;
import socket from "../../../api/socket";

const ChatMenu = (props) => {
  console.log('ChatMenu');
  const menuClass = (props.isMenuHidden === true)
    ? 'active-chat-menu__wrapper active-chat-menu__hide'
    : 'active-chat-menu__wrapper';

  const deleteChat = (toBan) => {
    props.setIsMenuHidden(true);
    props.setActiveChat('');
    props.setActiveChatMessages([]);
    console.log(toBan);
    socket.emit('deleteChat', JSON.stringify({
      chat_id: props.activeChat.chat_id,
      to_ban: toBan
    }))
  }

  const truncateMessages = () => {
    props.setIsMenuHidden(true);
    console.log('deleteMessages', props.activeChat.chat_id);
    socket.emit('deleteMessages', JSON.stringify({
      chat_id: props.activeChat.chat_id
    }))
  }

  return <div className="active-chat__menu active-chat-menu">
    <div className={menuClass}>
      <ul className="active-chat-menu__list">
        <li className="active-chat-menu__item">Информация о чате</li>
        <li className="active-chat-menu__item">Отключить уведомления</li>
        <li className="active-chat-menu__item" onClick={() => truncateMessages()}>Очистить чат</li>
        <li className="active-chat-menu__item" onClick={() => deleteChat(false)}>Удалить чат</li>
        <li className="active-chat-menu__item" onClick={() => deleteChat(true)}>Заблокировать пользователя</li>
      </ul>
    </div>
  </div>
}

export default ChatMenu;

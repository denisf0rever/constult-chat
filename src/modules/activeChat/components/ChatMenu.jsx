

const ChatMenu = (props) => {

  const menuClass = (props.isMenuHidden === true)
    ? 'active-chat-menu__wrapper active-chat-menu__hide'
    : 'active-chat-menu__wrapper';

  const deleteChatFunction = (toBan) => {
    props.setIsMenuHidden(true);
    props.deleteChat(toBan);
  }

  const truncateMessagesFunction = () => {
    props.setIsMenuHidden(true);
    props.truncateMessages();
  }

  return <div className="active-chat__menu active-chat-menu">
    <div className={menuClass}>
      <ul className="active-chat-menu__list">
        <li className="active-chat-menu__item">Информация о чате</li>
        <li className="active-chat-menu__item">Отключить уведомления</li>
        <li className="active-chat-menu__item" onClick={() => truncateMessagesFunction()}>Очистить чат</li>
        <li className="active-chat-menu__item" onClick={() => deleteChatFunction(false)}>Удалить чат</li>
        <li className="active-chat-menu__item" onClick={() => deleteChatFunction(true)}>Заблокировать пользователя</li>
      </ul>
    </div>
  </div>
}

export default ChatMenu;



const ChatMenu = (props) => {

  const menuClass = (props.isMenuHidden === true)
    ? 'active-chat-menu__wrapper active-chat-menu__hide'
    : 'active-chat-menu__wrapper';

  return <div className="active-chat__menu active-chat-menu">
    <div className={menuClass}>
      <ul className="active-chat-menu__list">
        <li className="active-chat-menu__item">Информация о чате</li>
        <li className="active-chat-menu__item">Отключить уведомления</li>
        <li className="active-chat-menu__item">Пожаловаться</li>
        <li className="active-chat-menu__item">Очистить историю</li>
      </ul>
    </div>
  </div>
}

export default ChatMenu;

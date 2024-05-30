import avatar from '../../../images/avatar.jpg';

const chatHeader = (props) => {

  return <div className="active-chat__header chat-header">
    <div className="chat-header__wrapper">
      <img src={avatar} alt="" className="chat-header__user-avatar" />
      <div className="chat-header__user-name">{props.activeChatName}</div>
      <div class="chat-header__menu-btn" onClick={() => props.setIsMenuHidden(!props.isMenuHidden)}>
        <svg class="chat-header__menu-btn-svg">
          <circle r="2" fill="#000" cx="50%" cy="50%"></circle>
          <circle r="2" fill="#000" cx="50%" cy="25%"></circle>
          <circle r="2" fill="#000" cx="50%" cy="75%"></circle>
        </svg>
      </div>
    </div>
  </div>
}

export default chatHeader;
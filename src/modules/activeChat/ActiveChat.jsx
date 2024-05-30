import ChatHeader from "./components/ChatHeader";
import ChatBottom from "./components/ChatBottom";
import ChatList from "./components/ChatList";
import ChatMenu from "./components/ChatMenu";
import { useState } from "react";


const ActiveChat = (props) => {

  const [isMenuHidden, setIsMenuHidden] = useState(true);

  return <div className="operator-chat__active-chat-wrapper active-chat">
    <div className="active-chat__wrapper">
      <ChatHeader activeChatName={props.activeChat.name} isMenuHidden={isMenuHidden} setIsMenuHidden={setIsMenuHidden} />
      <ChatList activeChatMessages={props.activeChatMessages} />
      <ChatBottom sendMessage={props.sendMessage} />
      <ChatMenu isMenuHidden={isMenuHidden} />
    </div>

  </div>
}

export default ActiveChat;
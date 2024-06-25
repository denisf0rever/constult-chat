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
      <ChatList activeChatMessages={props.activeChatMessages} messageRefs={props.messageRefs} isNowWriting={props.isNowWriting} />
      <ChatBottom sendMessage={props.sendMessage} isWriting={props.isWriting} />
      <ChatMenu isMenuHidden={isMenuHidden} deleteChat={props.deleteChat} truncateMessages={props.truncateMessages}
        setIsMenuHidden={setIsMenuHidden} />
    </div>

  </div>
}

export default ActiveChat;
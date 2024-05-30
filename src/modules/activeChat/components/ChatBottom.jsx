import { useState } from "react";


const chatBottom = (props) => {

  const [newMessageText, setNewMessageText] = useState('');

  const handleChange = (e) => {
    setNewMessageText(e.target.value);
  }

  const sendNewMessage = () => {
    props.sendMessage(newMessageText);
    setNewMessageText('')
  }

  return <div className="active-chat__bottom-form bottom-form">
    <div className="bottom-form__wrapper">
      <img src="../../../images/avatar.jpg" alt="" className="bottom-form__smiles" />
      <img src="../../../images/avatar.jpg" alt="" className="bottom-form__add-file" />
      <input type="text" value={newMessageText} onChange={(e) => handleChange(e,)} className="bottom-form__input" />
      <img src="../../../images/avatar.jpg" alt="" onClick={sendNewMessage} className="bottom-form__send-button" />
    </div>
  </div>
}

export default chatBottom;
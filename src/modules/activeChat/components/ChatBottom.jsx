import { useState, useEffect, useRef } from "react";


const chatBottom = (props) => {

  const [newMessageText, setNewMessageText] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('sendMessage');
      props.isWriting(false);
      clearTimeout(timeoutRef.current);
      setTimerActive(false);

      props.sendMessage(newMessageText);
      setNewMessageText('')
    }
  };

  const handleChange = (e) => {
    setNewMessageText(e.target.value);
    setTimerActive(true);
    startTimeout();
  }

  const sendNewMessage = () => {
    console.log('sendMessage');
    props.isWriting(false);
    clearTimeout(timeoutRef.current);
    setTimerActive(false);

    props.sendMessage(newMessageText);
    setNewMessageText('')
  }

  const [timerActive, setTimerActive] = useState(false); // Состояние для активации таймера
  const timeoutRef = useRef(null);

  const startTimeout = () => {
    console.log('startTimeout');
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      props.isWriting(false);
      setTimerActive(false); // Сброс состояния активации после срабатывания таймера
    }, 1500);
  };

  useEffect(() => {
    if (timerActive) {
      props.isWriting(true);
    }
  }, [timerActive])

  useEffect(() => {
    if (timerActive) {
      startTimeout(); // Запустить таймер при активации
    }

    return () => {
      clearTimeout(timeoutRef.current); // Очистить таймер при размонтировании компонента
    };
  }, [timerActive]);





  return <div className="active-chat__bottom-form bottom-form">
    <div className="bottom-form__wrapper">
      <img src="../../../images/avatar.jpg" alt="" className="bottom-form__smiles" />
      <img src="../../../images/avatar.jpg" alt="" className="bottom-form__add-file" />
      <input type="text" value={newMessageText} onChange={(e) => handleChange(e)} onKeyDown={handleKeyPress}
        className="bottom-form__input" />
      <img src="../../../images/avatar.jpg" alt="" onClick={sendNewMessage} className="bottom-form__send-button" />
    </div>
  </div>
}

export default chatBottom;
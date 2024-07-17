'use client';

import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

let socket;

export default function Chat() {
  const [history, setHistory] = useState('');
  const [message, setMessage] = useState('');

  const { sendMessage, lastMessage, readyState } = useWebSocket(process.env.NEXT_PUBLIC_BACKEND_URL);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('Connected!');
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage?.data) {
      console.log(`Got message ${lastMessage.data}`);
      setHistory((history) => history.concat(`${lastMessage.data}\n`));
    }
  }, [lastMessage]);


  async function onSend(e) {
    e.preventDefault();
    console.log(message);
    setHistory((history) => history.concat(`> ${message}\n`));
    sendMessage(message);
  }

  function onMessageChange(e) {
    e.preventDefault();
    setMessage(e.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <textarea readOnly value={history} class="text-gray-900" />
      <input type="text" value={message} onChange={onMessageChange} class="text-gray-900" />
      <button onClick={onSend}>Send</button>
    </main>
  );
}

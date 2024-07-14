'use client';

import { useState } from 'react';
import { io } from 'socket.io-client';

export default function Chat() {
  const [history, setHistory] = useState('');
  const [message, setMessage] = useState('');

  async function onSend(e) {
    e.preventDefault();
    console.log(message);
    setHistory(history + "> " + message + "\n");
    // TODO: Send message to backend!
  }

  function onMessageChange(e) {
    e.preventDefault();
    setMessage(e.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <textarea readOnly value={history} />
      <input type="text" value={message} onChange={onMessageChange} />
      <button onClick={onSend}>Send</button>
    </main>
  );
}

'use client';

import { ChangeEvent, KeyboardEvent, MouseEvent, useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

let socket;

interface History {
  id: string,
  self: boolean,
  message: string,
}

export default function Chat() {
  const [history, setHistory] = useState<History[]>([]);
  const [message, setMessage] = useState('');

  const { sendMessage, lastMessage, readyState } = useWebSocket(process.env.NEXT_PUBLIC_BACKEND_URL!);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('Connected!');
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage?.data) {
      console.log(`Got message ${lastMessage.data}`);
      setHistory(history => [...history, { id: crypto.randomUUID(), self: false, message: lastMessage.data}]);
    }
  }, [lastMessage]);


  async function onSend(e: KeyboardEvent | MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(message);
    setHistory([...history, { id: crypto.randomUUID(), self: true, message: message}]);
    sendMessage(message);
  }

  function onMessageChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setMessage(e.target.value);
  }

  function renderHistory(history: History[]) {
    if (history.length) {
      const items = history.map(entry => {
        if (entry.self) {
          return (<li key={entry.id}>&gt; {entry.message}</li>)
        } else {
          return (<li key={entry.id} className="text-right">{entry.message}</li>)
        }
      });
      return <ul>{items}</ul>
    } else {
      return <p>...</p>
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-white-900">{renderHistory(history)}</div>
      <input type="text" value={message} onChange={onMessageChange} className="text-gray-900"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSend(e);
          }
        }}
      />
      <button onClick={onSend}>Send</button>
    </main>
  );
}

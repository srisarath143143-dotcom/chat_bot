import { useRef, useState } from 'react';
import { Heart, Send, Smile, AtSign, MessageCircle } from 'lucide-react';

const users = ['Alan', 'Bob', 'Carol', 'Dean', 'Elin'];
const emojis = ['😀', '😂', '❤️', '👍', '🎉', '😎'];

export default function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: 'Alan',
      text: 'Welcome to the chat! Send a message to get started.',
      likes: 0,
      liked: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const inputRef = useRef(null);

  function sendMessage(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    const username = users[Math.floor(Math.random() * users.length)];
    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        username,
        text,
        likes: 0,
        liked: false,
      },
    ]);
    setInput('');
    setShowEmojis(false);
    setShowMentions(false);
  }

  function toggleLike(id) {
    setMessages((current) =>
      current.map((message) =>
        message.id === id
          ? {
              ...message,
              liked: !message.liked,
              likes: message.likes + (message.liked ? -1 : 1),
            }
          : message
      )
    );
  }

  function addEmoji(emoji) {
    setInput((current) => current + emoji);
    setShowEmojis(false);
    inputRef.current?.focus();
  }

  function addMention(username) {
    setInput((current) =>
      `${current}${current && !current.endsWith(' ') ? ' ' : ''}@${username} `
    );
    setShowMentions(false);
    inputRef.current?.focus();
  }

  return (
    <main className="page">
      <section className="chat-card">
        <header className="chat-header">
          <div className="header-icon"><MessageCircle size={23} /></div>
          <div>
            <h1>Community Chat</h1>
            <p>Share your thoughts with everyone</p>
          </div>
          <span className="online"><span /> Online</span>
        </header>

        <div className="messages" aria-live="polite">
          {messages.map((message) => (
            <article className="message" key={message.id}>
              <div className={`avatar avatar-${message.username.toLowerCase()}`}>
                {message.username[0]}
              </div>
              <div className="message-content">
                <div className="message-meta">
                  <strong>{message.username}</strong>
                  <span>{message.id === 1 ? 'Just now' : 'Sent just now'}</span>
                </div>
                <p className="message-text">{message.text}</p>
              </div>
              <button
                type="button"
                className={`like-button ${message.liked ? 'liked' : ''}`}
                onClick={() => toggleLike(message.id)}
                aria-label={`Like message from ${message.username}`}
                title="Like message"
              >
                <Heart size={17} fill={message.liked ? 'currentColor' : 'none'} />
                <span>{message.likes}</span>
              </button>
            </article>
          ))}
        </div>

        <form className="composer" onSubmit={sendMessage}>
          <div className="composer-tools">
            <div className="tool-wrap">
              <button
                type="button"
                className="tool-button"
                title="Add emoji"
                aria-label="Add emoji"
                onClick={() => {
                  setShowEmojis((shown) => !shown);
                  setShowMentions(false);
                }}
              >
                <Smile size={19} />
              </button>
              {showEmojis && (
                <div className="popup emoji-popup">
                  {emojis.map((emoji) => (
                    <button type="button" key={emoji} onClick={() => addEmoji(emoji)}>
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="tool-wrap">
              <button
                type="button"
                className="tool-button"
                title="Mention a user"
                aria-label="Mention a user"
                onClick={() => {
                  setShowMentions((shown) => !shown);
                  setShowEmojis(false);
                }}
              >
                <AtSign size={19} />
              </button>
              {showMentions && (
                <div className="popup mention-popup">
                  <span className="popup-title">Mention someone</span>
                  {users.map((username) => (
                    <button type="button" key={username} onClick={() => addMention(username)}>
                      <span className="small-avatar">{username[0]}</span>
                      {username}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your message..."
            aria-label="Type your message"
          />
          <button className="send-button" type="submit" disabled={!input.trim()}>
            Send <Send size={16} />
          </button>
        </form>
        <p className="hint">Press Enter to send · Use the @ button to mention someone or 😊 to add an emoji</p>
      </section>
      <footer>Built with React <span>•</span> Messages stay on this page while it is open</footer>
    </main>
  );
}

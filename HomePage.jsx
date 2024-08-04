import React, { useState, useEffect } from 'react';
import './HomePage.css';

const friends = ["Prithik", "Mohan", "Abhi", "Kanitha", "Nihitha", "Siva"];

const HomePage = ({ loggedInUser, chatHistory, updateChatHistory }) => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Filter out the logged-in user from the friend list
  const filteredFriends = friends.filter((friend) => friend !== loggedInUser);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setNewMessage('');
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      updateChatHistory(loggedInUser, selectedFriend, newMessage);
      setNewMessage('');
    }
  };

  const getChatMessages = (friend) => {
    const key = `${loggedInUser}-${friend}`;
    return chatHistory[key] || [];
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <h1>ChatPulse</h1>
      </header>
      <div className="content">
        <div className="friend-list">
          <h2>Friend List</h2>
          <div className="friend-list-content">
            {filteredFriends.map((friend) => (
              <div
                key={friend}
                className={`friend-item ${
                  selectedFriend === friend ? 'selected' : ''
                }`}
                onClick={() => handleFriendClick(friend)}
              >
                {friend}
              </div>
            ))}
          </div>
        </div>
        <div className="chat-section">
          {selectedFriend ? (
            <div>
              <h2>Chat with {selectedFriend}</h2>
              <div className="chat-history">
                {getChatMessages(selectedFriend).map((msg, index) => (
                  <div key={index} className="message">
                    {msg}
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          ) : (
            <div className="no-chat">Select a friend to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

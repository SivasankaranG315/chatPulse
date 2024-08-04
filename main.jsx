import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';
import './index.css';

const Main = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [chatHistory, setChatHistory] = useState({});

  useEffect(() => {
    const storedChatHistory = localStorage.getItem('chatHistory');
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    if (storedChatHistory) {
      setChatHistory(JSON.parse(storedChatHistory));
    }
    if (storedLoggedInUser) {
      setLoggedInUser(storedLoggedInUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    localStorage.setItem('loggedInUser', loggedInUser);
  }, [chatHistory, loggedInUser]);

  const updateChatHistory = (sender, recipient, message) => {
    setChatHistory((prevChatHistory) => {
      const senderKey = `${sender}-${recipient}`;
      const recipientKey = `${recipient}-${sender}`;
      return {
        ...prevChatHistory,
        [senderKey]: [...(prevChatHistory[senderKey] || []), message],
        [recipientKey]: [...(prevChatHistory[recipientKey] || []), message],
      };
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App setLoggedInUser={setLoggedInUser} />} />
        <Route
          path="/home"
          element={
            <HomePage
              loggedInUser={loggedInUser}
              chatHistory={chatHistory}
              updateChatHistory={updateChatHistory}
            />
          }
        />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));

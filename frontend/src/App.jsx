import React, { useState, useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const IframeContainer = () => {
  return (
    <div className="iframe-container">
      <iframe
        src="https://sexemodel.com"
        className="iframe"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const Message = ({ text, isSender }) => {
  return (
    <div className={`message ${isSender ? 'sender' : 'receiver'}`}>
      {!isSender && <div className="avatar"></div>}
      <div className="message-box">{text}</div>
    </div>
  );
};

const ChatBox = ({ isExpanded, toggleChat }) => {
  const [contacts, setContacts] = useState([]);
  const [platforms] = useState(["SMS", "WhatsApp", "Telegram"]);
  const [selectedPlatform, setSelectedPlatform] = useState("SMS");
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/contacts")
      .then(response => response.json())
      .then(data => setContacts(data));
  }, []);

  return (
    <div className={`chatbox ${isExpanded ? 'expanded' : ''}`}>
      <div className="chat-header d-flex align-items-center justify-content-between p-2 bg-dark text-white">
        <button className="btn btn-sm btn-outline-light" onClick={() => setShowContacts(!showContacts)}>
          📂
        </button>
        <span className="fw-bold">Contact</span>
        <div className="platforms d-flex gap-2">
          {platforms.map(platform => (
            <button 
              key={platform} 
              className={`btn btn-sm ${selectedPlatform === platform ? 'btn-primary' : 'btn-outline-light'}`} 
              onClick={() => setSelectedPlatform(platform)}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
      {showContacts && (
        <div className="contact-list bg-secondary text-white p-2">
          {contacts.map(contact => (
            <div key={contact.id} className="contact-item border-bottom py-1">{contact.name}</div>
          ))}
        </div>
      )}
      <div className="chat-messages flex-grow-1 overflow-auto p-2">
        <Message text="Message exemple..." isSender={false} />
        <Message text="Réponse exemple..." isSender={true} />
      </div>
      <div className="chat-input d-flex p-2 bg-dark">
        <input type="text" className="form-control" placeholder="Écrire un message..." />
        <button className="btn btn-primary ms-2">Envoyer</button>
      </div>
    </div>
  );
};

const StreamSite = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleChat = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`stream-site ${isExpanded ? 'chat-expanded' : ''}`}>
      <IframeContainer />
      <button className={`custom-toggle-chat ${isExpanded ? 'expanded' : ''}`} onClick={toggleChat}>
        {isExpanded ? "◀" : "▶"}
      </button>
      <ChatBox isExpanded={isExpanded} />
    </div>
  );
};

export default StreamSite;

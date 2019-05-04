import React, { useState } from "react";
import { usePublishToApplicationSubmissions } from "./usePublishToApplicationSubmissions";
import { useSubscribeToApplicationFeedback } from "./useSubscribeToApplicationFeedback";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [
    applicationFeedback,
    setApplicationFeedback
  ] = useSubscribeToApplicationFeedback();
  const sendApplication = usePublishToApplicationSubmissions();
  const [name, setName] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    sendApplication(name);
    setName("");
  }
  function handleClose(e) {
    sendApplication(name);
    setApplicationFeedback("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Become an Avenger today!</h2>
        <input
          autoFocus
          name="avenger-name"
          value={name}
          onChange={handleNameChange}
        />
        <button type="submit">Sign up</button>
      </form>

      {applicationFeedback && (
          <div className={`feedback ${applicationFeedback.decision}`}>
            {applicationFeedback.decision}!&nbsp;
            {applicationFeedback.fault}
            <span className="closeButton" onClick={handleClose}>
              (close)
            </span>
          </div>
        )}
    </div>
  );
}

export default App;

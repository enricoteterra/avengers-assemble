import React, { useState } from "react";
import { usePublishToApplicationSubmissions } from "./usePublishToApplicationSubmissions";
import { useSubscribeToApplicationFeedback } from "./useSubscribeToApplicationFeedback";
import { useSubscribeToRoster } from "./useSubscribeToRoster";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [name, setName] = useState();
  const [submissionToken, setSubmissionToken] = useState();
  const [submitApplication] = usePublishToApplicationSubmissions();
  const [
    applicationFeedback,
    setApplicationFeedback
  ] = useSubscribeToApplicationFeedback(submissionToken);
  const [roster] = useSubscribeToRoster();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await submitApplication(name);
    setSubmissionToken(token);
    setName("");
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleClose(e) {
    setApplicationFeedback("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="roster">
        <h2>Current Roster</h2>
        {roster.length > 0 ? roster.map(member => (
          <p key={member}>{member}</p>
        )): <p>no avengers signed up yet!</p>}
      </div>

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

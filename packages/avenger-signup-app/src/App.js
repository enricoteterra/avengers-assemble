import React, { useState } from "react";
import { usePublishToApplicationSubmissions } from "./usePublishToApplicationSubmissions";
import { useSubscribeToApplicationFeedback } from "./useSubscribeToApplicationFeedback";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const applicationFeedback = useSubscribeToApplicationFeedback([]);
  const sendApplication = usePublishToApplicationSubmissions();

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    sendApplication(name);
    setName("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="roster">
        {JSON.stringify(applicationFeedback)}
        {/* {roster.size ? (
          Array.from(roster).map(avenger => <p key={avenger}>{avenger}</p>)
        ) : (
          <p>no avengers signed up yet</p>
        )} */}
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
    </div>
  );
}

export default App;

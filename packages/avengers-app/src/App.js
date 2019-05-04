import React, { useState } from "react";
import { useSubscribeToRoster } from "./useSubscribeToRoster";
import { usePublishToRoster } from "./usePublishToRoster";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const roster = useSubscribeToRoster([]);
  const publishAvenger = usePublishToRoster();

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleSubmit() {
    publishAvenger(name);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <h2>Roster</h2>
        {roster.length ? (
          roster.map(avenger => <p key={avenger}>{avenger}</p>)
        ) : (
          <p>no avengers signed up yet</p>
        )}
      </div>
      <div>
        <h2>Become an Avenger today!</h2>
        <input
          autoFocus
          name="avenger-name"
          value={name}
          onChange={handleNameChange}
        />
        <button onClick={handleSubmit}>Sign up</button>
      </div>
    </div>
  );
}

export default App;

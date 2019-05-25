import React from "react";
import { useSubscribeToRoster } from "./useSubscribeToRoster";
import logo from "./logo.svg";
import "./App.css";
import SignupForm from "./components/SignupForm";

function App() {
  const [roster] = useSubscribeToRoster();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="roster">
        <h2>Current Roster</h2>
        {roster.length > 0 ? (
          roster.map(({ name, team }) => <p key={`${name}-${team}`}>{`${name}-${team}`}</p>)
        ) : (
          <p>no avengers signed up yet!</p>
        )}
      </div>

      <SignupForm />
    </div>
  );
}

export default App;

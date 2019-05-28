import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="new-hires">
        <h2>New Hires - [country]</h2>
        <p>TODO: apigee login</p>
        <p>TODO: show s3 bucket content for country</p>
      </div>
    </div>
  );
}

export default App;

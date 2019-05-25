import React, { useState } from "react";
import SelectTeam from "./SelectTeam";
import { withSignupEffects } from "./withSignupEffects";
import './SignupForm.css'

const BecomeAvengerForm = ({dispatchSignup, renderFeedback, renderError}) => {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleTeamChange(newValue) {
    return () => setTeam(newValue);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    dispatchSignup({name, team})
    setName("");
    setTeam("");
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Become an Avenger today!</h2>
      {renderError}
      {renderFeedback}
      <SelectTeam selected={team} handleChange={handleTeamChange} />
      <input type="text" autoFocus value={name} onChange={handleNameChange} />
      <button type="submit">Sign up</button>
    </form>
  );
};

export const SignupForm = withSignupEffects(BecomeAvengerForm);
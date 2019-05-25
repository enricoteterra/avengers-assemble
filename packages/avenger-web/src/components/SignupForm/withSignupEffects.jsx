import React, { useState } from "react";
import { usePublishToApplicationSubmissions } from "../../usePublishToApplicationSubmissions";
import { useSubscribeToApplicationFeedback } from "../../useSubscribeToApplicationFeedback";

export const withSignupEffects = WrappedComponent => props => {

  
  const [submissionToken, setSubmissionToken] = useState();
  const [submissionError, setSubmissionError] = useState();

  const [submitApplication] = usePublishToApplicationSubmissions();
  const [applicationFeedback, setApplicationFeedback] = useSubscribeToApplicationFeedback(submissionToken);
  
  function handleClose() {
    setApplicationFeedback("");
  }

  async function dispatchSignup({ name, team }) {
    setSubmissionError("")
    setApplicationFeedback("");
    try {
      const token = await submitApplication({ name, team });
      setSubmissionToken(token);
    } catch (error) {
      setSubmissionError(error.message);
    }
  }

  return (
    <WrappedComponent
      {...props}
      dispatchSignup={dispatchSignup}
      renderError={submissionError && <p className="submission-error">{submissionError}</p>}
      renderFeedback={
        <>
          {applicationFeedback && (
            <div className={`feedback ${applicationFeedback.decision}`}>
              {applicationFeedback.decision}!&nbsp;
              {applicationFeedback.fault}
              <span className="closeButton" onClick={handleClose}>
                (close)
              </span>
            </div>
          )}
        </>
      }
    />
  );
};

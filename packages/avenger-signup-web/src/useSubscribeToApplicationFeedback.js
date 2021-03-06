import { useState, useEffect } from "react";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

export const useSubscribeToApplicationFeedback = submissionToken => {
  const [applicationFeedback, setApplicationFeedback] = useState();
  useEffect(() => {
    const subscribe = () =>
      // @TODO: submissionToken should be unset after feedback is received
      // to prevent polling for feedback on the stale token
      !submissionToken ||
      fetch(`/signup/feedback/${submissionToken}`)
        .then(response => response.json())
        .then(data => {
          setApplicationFeedback(data);
          setTimeout(subscribe, 1000);
        });
    subscribe();
    // @TODO: check that long-poll is retriggered after request timeout
  }, [submissionToken]);
  return [applicationFeedback, setApplicationFeedback];
};

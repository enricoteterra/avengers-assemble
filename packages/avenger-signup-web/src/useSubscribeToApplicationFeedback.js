import { useState, useEffect } from "react";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

export const useSubscribeToApplicationFeedback = initialValue => {
  const [applicationFeedback, setApplicationFeedback] = useState(initialValue);
  useEffect(() => {
    const subscribe = () =>
      fetch("/api/feedback")
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setApplicationFeedback(data);
        setTimeout(subscribe, 1000);
      });
    subscribe();
  }, [] // dont run this effect more than once, even on rerender
  );
  return [applicationFeedback, setApplicationFeedback];
};

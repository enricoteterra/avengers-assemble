import { useState, useEffect } from "react";
import { Consumer } from "sqs-consumer";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

export const useSubscribeToApplicationFeedback = initialValue => {
  const [applicationFeedback, setApplicationFeedback] = useState(initialValue);
  useEffect(
    () => {
      const app = Consumer.create({
        queueUrl: process.env.REACT_APP_AWS_ROSTER_APPLICATION_FEEDBACK_URL,
        handleMessage: ({ Body, MessageAttributes }) =>
          setApplicationFeedback({
            name: Body,
            decision: MessageAttributes.decision.StringValue,
            fault: MessageAttributes.fault
              ? MessageAttributes.fault.StringValue
              : undefined
          }),
        messageAttributeNames: ["decision", "fault"]
      });
      app.on("error", err => {
        console.error(err.message);
      });
      app.on("processing_error", err => {
        console.error(err.message);
      });
      app.on("timeout_error", err => {
        console.error(err.message);
      });
      app.start();

      return () => app.stop();
    },
    [] // never recreate consumer between rerenders
  );
  return [applicationFeedback, setApplicationFeedback];
};

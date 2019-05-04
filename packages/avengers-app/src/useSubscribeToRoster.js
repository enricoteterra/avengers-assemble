import { useReducer, useEffect } from "react";
import { Consumer } from "sqs-consumer";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

function reducer(set, { type, payload }) {
  switch (type) {
    case "add":
      return new Set([...Array.from(set), payload]);
    default:
      throw new Error(`action '${type}' not found in reducer`);
  }
}

export const useSubscribeToRoster = initialValue => {
  const [knownAvengers, dispatchKnownAvengers] = useReducer(
    reducer,
    initialValue
  );
  useEffect(
    () => {
      const app = Consumer.create({
        queueUrl: process.env.REACT_APP_AWS_SQS_URL,
        handleMessage: ({ Body }) => {
          console.log(Body);
          dispatchKnownAvengers({ type: "add", payload: Body });
        }
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
  return knownAvengers;
};

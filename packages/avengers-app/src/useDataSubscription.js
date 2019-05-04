import { useReducer, useEffect } from "react";
import { Consumer } from "sqs-consumer";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

function reducer(state, { type, payload }) {
  switch (type) {
    case "add":
      return [...state, payload];
    default:
      throw new Error(`action '${type}' not found in reducer`);
  }
}

export const useDataSubscription = initialValue => {
  const [knownAvengers, dispatchKnownAvengers] = useReducer(
    reducer,
    initialValue
  );
  useEffect(() => {
    const app = Consumer.create({
      queueUrl: process.env.REACT_APP_AWS_SQS_URL,
      handleMessage: function handleMessage({Body}) {
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
  });
  return knownAvengers;
};

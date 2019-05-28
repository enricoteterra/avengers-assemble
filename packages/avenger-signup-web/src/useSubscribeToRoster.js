import { useState, useEffect } from "react";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

export const useSubscribeToRoster = () => {
  const [roster, setRoster] = useState([]);
  const [firstRequest, setFirstRequest] = useState(true);
  useEffect(
    () => {
      console.log("firstRequest", firstRequest);
      const requestUrl = firstRequest
        ? "/roster/members?waittimeseconds=0"
        : "/roster/members";
      const subscribe = () =>
        fetch(requestUrl)
          .then(response => response.json())
          .then(data => {
            setRoster(data.roster);
            firstRequest ? setFirstRequest(false) : setTimeout(subscribe, 1000);
          });
      subscribe();
    },
    [firstRequest]
  );
  return [roster];
};

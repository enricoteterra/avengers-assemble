import Producer from "sqs-producer";

export const usePublishToApplicationSubmissions = () => {
  const producer = Producer.create({
    queueUrl: process.env.REACT_APP_AWS_ROSTER_APPLICATION_SUBMISSIONS_URL,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  });

  const sendApplication = name => {
    producer.send(name, function(err) {
      if (err) console.log(err);
    });
  };
  return sendApplication;
};

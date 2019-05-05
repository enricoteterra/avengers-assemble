require("dotenv").config();

require("aws-sdk").config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

const Producer = require("sqs-producer");
const producer = Producer.create({
  queueUrl: process.env.AWS_ROSTER_APPLICATION_FEEDBACK_URL,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const { Consumer } = require("sqs-consumer");
const consumer = Consumer.create({
  queueUrl: process.env.AWS_ROSTER_APPLICATION_SUBMISSIONS_URL,
  messageAttributeNames: ["submissionToken"],
  handleMessage: async (message) => {
    const {MessageId, Body, MessageAttributes} = message;
    console.log(`received: ${Body}`);
    blacklist = [
      "thor",
      "loki",
      "hulk",
      "black widow",
      "captain america",
      "iron man",
      "hawkeye"
    ];
    if (blacklist.includes(Body.toLowerCase())) {
      console.log(`denied: ${Body}`);
      producer.send(
        {
          id: MessageId,
          body: Body,
          messageAttributes: {
            submissionToken: {
              DataType: "String",
              StringValue: MessageAttributes.submissionToken.StringValue
            },
            decision: {
              DataType: "String",
              StringValue: "denied"
            },
            fault: {
              DataType: "String",
              StringValue: `Name ${Body} is already taken`
            }
          }
        },
        function(err) {
          if (err) console.log(err);
        }
      );
    } else {
      console.log(`approved: ${Body}`);
      producer.send(
        {
          id: MessageId,
          body: Body,
          messageAttributes: {
            submissionToken: {
              DataType: "String",
              StringValue: MessageAttributes.submissionToken.StringValue
            },
            decision: {
              DataType: "String",
              StringValue: "approved"
            }
          }
        },
        function(err) {
          if (err) console.log(err);
        }
      );
    }
  }
});
consumer.on("error", err => {
  console.error(err.message);
});
consumer.on("processing_error", err => {
  console.error(err.message);
});
consumer.on("timeout_error", err => {
  console.error(err.message);
});
consumer.start();

// keep app alive
console.log("subscribed to roster application queue..");
process.stdin.resume();

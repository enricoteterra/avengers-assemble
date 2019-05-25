require("dotenv").config();

require("aws-sdk").config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

const Producer = require("sqs-producer");
const feedbackProducer = Producer.create({
  queueUrl: process.env.AWS_ROSTER_APPLICATION_FEEDBACK_URL,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const rosterProducer = Producer.create({
  queueUrl: process.env.AWS_ROSTER_APPLICATION_ROSTER_URL,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const { Consumer } = require("sqs-consumer");
const consumer = Consumer.create({
  queueUrl: process.env.AWS_ROSTER_APPLICATION_SUBMISSIONS_URL,
  messageAttributeNames: ["submissionToken", "name", "team"],
  handleMessage: async (message) => {
    const {MessageId, Body, MessageAttributes} = message;
    console.log(`received: ${Body}, ${JSON.stringify(MessageAttributes)}`);
    blacklist = [
      "thor",
      "loki",
      "hulk",
      "black widow",
      "captain america",
      "iron man",
      "hawkeye"
    ];
    if( !MessageAttributes || MessageAttributes.name === undefined || MessageAttributes.team === undefined) {
      console.log("received event malformed");
      return;
    }
    if (blacklist.includes(MessageAttributes.name.StringValue.toLowerCase())) {
      console.log(`denied: ${Body}`);
      feedbackProducer.send(
        {
          id: MessageId,
          body: Body,
          messageAttributes: {
            submissionToken: {
              DataType: "String",
              StringValue: MessageAttributes.submissionToken.StringValue
            },
            name: {
              DataType: "String",
              StringValue: MessageAttributes.name.StringValue
            },
            team: {
              DataType: "String",
              StringValue: MessageAttributes.team.StringValue
            },
            decision: {
              DataType: "String",
              StringValue: "denied"
            },
            fault: {
              DataType: "String",
              StringValue: `Name '${Body}' is already taken`
            }
          }
        },
        function(err) {
          if (err) console.log(err);
        }
      );
    } else {
      console.log(`approved: ${Body}`);
      feedbackProducer.send(
        {
          id: MessageId,
          body: Body,
          messageAttributes: {
            submissionToken: {
              DataType: "String",
              StringValue: MessageAttributes.submissionToken.StringValue
            },
            name: {
              DataType: "String",
              StringValue: MessageAttributes.name.StringValue
            },
            team: {
              DataType: "String",
              StringValue: MessageAttributes.team.StringValue
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
      rosterProducer.send(
        {
          id: MessageId,
          body: Body,
          messageAttributes: {
            name: {
              DataType: "String",
              StringValue: MessageAttributes.name.StringValue
            },
            team: {
              DataType: "String",
              StringValue: MessageAttributes.team.StringValue
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
console.log("approval service started..");
process.stdin.resume();

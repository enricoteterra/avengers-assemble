require("dotenv").config();

require("aws-sdk").config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

const Producer = require("sqs-producer");
const producer = Producer.create({
  queueUrl: process.env.AWS_SQS_URL,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const { Consumer } = require("sqs-consumer");
const consumer = Consumer.create({
  queueUrl: process.env.AWS_SQS_URL,
  handleMessage: ({ Body }) => {
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
      producer.send({
        body: `${Body} application denied!`
      });
    } else {
      producer.send({
        body: `${Body} application approved!`
      });
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
console.log("subscribed to roster application queue..")
process.stdin.resume();

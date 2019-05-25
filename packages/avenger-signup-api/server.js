require("dotenv").config();
require("aws-sdk").config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
});

const Producer = require("sqs-producer");
const producer = Producer.create({
  queueUrl: process.env.AWS_ROSTER_APPLICATION_SUBMISSIONS_URL,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.post("/signup/application/:token", (req, res) => {
  console.log(`submitting application: ${JSON.stringify(req.body)}`);
  producer.send(
    {
      id: req.params.token,
      body: req.body.name,
      messageAttributes: {
        submissionToken: {
          DataType: "String",
          StringValue: req.params.token
        },
        name: {
          DataType: "String",
          StringValue: req.body.name
        },
        team: {
          DataType: "String",
          StringValue: req.body.team
        }
      }
    },
    err =>
      err
        ? res.status(err.statusCode || 500).send({ fault: err.message })
        : res.sendStatus(200)
  );
});

var longpoll = require("express-longpoll")(app, { DEBUG: true });
longpoll.create("/signup/feedback/:token", (req, _, next) => {
  req.id = req.params.token;
  next();
});

var port = 3020;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

var { Consumer } = require("sqs-consumer");
const consumer = Consumer.create({
  queueUrl: process.env.AWS_ROSTER_APPLICATION_FEEDBACK_URL,
  handleMessage: message => {
    const { MessageId, Body, MessageAttributes } = message;
    console.log(
      `handling feedback: ${Body}, ${JSON.stringify(MessageAttributes)}`
    );
    if (
      MessageAttributes === undefined ||
      MessageAttributes.submissionToken === undefined
    )
      return;
    return longpoll.publishToId(
      "/signup/feedback/:token",
      MessageAttributes.submissionToken.StringValue,
      {
        id: MessageId,
        name: Body,
        decision: MessageAttributes.decision
          ? MessageAttributes.decision.StringValue
          : undefined,
        fault: MessageAttributes.fault
          ? MessageAttributes.fault.StringValue
          : undefined
      }
    );
  },
  messageAttributeNames: ["submissionToken", "decision", "fault"]
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

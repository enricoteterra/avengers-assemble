require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

var longpoll = require("express-longpoll")(app, { DEBUG: true });
longpoll.create("/api/roster");

var port = 3021;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

const roster = new Array();

var { Consumer } = require("sqs-consumer");
const consumer = Consumer.create({
  queueUrl: process.env.AWS_ROSTER_APPLICATION_ROSTER_URL,
  handleMessage: message => {
    // @TODO: change to reducer to handle all kinds of roster changes
    const { MessageAttributes } = message;
    if (MessageAttributes === undefined || MessageAttributes.name === undefined)
      return;
    roster.push(MessageAttributes.name.StringValue);
    longpoll.publish("/api/roster", { roster });
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

require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

var longpoll = require("express-longpoll")(app, { DEBUG: true });
longpoll.create("/roster/members", function(req, res, next) {
  // @TODO: implement proper waittimeseconds handling
  req.query.waittimeseconds === undefined ? next() : res.send({ roster });
});

var port = 3021;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// @TODO: refactor to in-memory strategy
const roster = new Array();

var { Consumer } = require("sqs-consumer");
const consumer = Consumer.create({
  queueUrl: process.env.AWS_ROSTER_APPLICATION_ROSTER_URL,
  messageAttributeNames: ["name", "team"],
  handleMessage: message => {
    console.log("roster received: " + message.Body + " "  + JSON.stringify(message.MessageAttributes))
    // @TODO: change to reducer to handle all types of roster changes
    const { MessageAttributes } = message;
    if( !MessageAttributes || MessageAttributes.name === undefined || MessageAttributes.team === undefined) {
      console.log("received roster event malformed");
      return;
    }
    roster.push({
      name: MessageAttributes.name.StringValue,
      team: MessageAttributes.team.StringValue
    });
    longpoll.publish("/roster/members", { roster });
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
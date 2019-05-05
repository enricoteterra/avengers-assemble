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

var express = require("express");
var app = express();
app.post("/application", (req, _) => {
  console.log(`posted application: ${req.query.name}`);
  producer.send(name, function(err) {
    if (err) console.log(err);
  });
});

// var longpoll = require("express-longpoll")(app);
// longpoll.create("/feedback");

var port = 3020;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// do queue stuff
// var data = { text: "Some data" };

// Publishes data to all clients long polling /poll endpoint
// You need to call this AFTER you make a GET request to /poll
// longpoll.publish("/poll", data);

// Publish every 5 seconds
// setInterval(function() {
//   longpoll.publish("/poll", data);
// }, 5000);

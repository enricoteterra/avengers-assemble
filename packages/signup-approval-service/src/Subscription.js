const { Consumer } = require("sqs-consumer");

// understands how to listen to incoming messages
export class Subscription {
  handlers = [];
  constructor(handleMessage) {
    this.consumer = Consumer.create({
      queueUrl: process.env.AWS_ROSTER_APPLICATION_SUBMISSIONS_URL,
      messageAttributeNames: ["submissionToken"],
      handleMessage: message => handlers.forEach(handler => handler(message))
    });
  }

  attachHandler = handler => this.handlers.push(handler);
  detachHandler = handler => delete this.handlers[handler];

  start = () => {
    this.consumer.on("error", console.error);
    this.consumer.on("processing_error", console.error);
    this.consumer.on("timeout_error", console.error);
    this.consumer.start();
  };
}

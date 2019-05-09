require("dotenv").config();

// understands how to respond to other applications
export class Client {
  queueAccessSettings = Object.seal({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  constructor(
    feedbackProducer = Producer.create({
      ...this.queueAccessSettings,
      queueUrl: process.env.AWS_ROSTER_APPLICATION_FEEDBACK_URL
    }),
    rosterProducer = Producer.create({
      ...this.queueAccessSettings,
      queueUrl: process.env.AWS_ROSTER_APPLICATION_ROSTER_URL
    })
  ) {
    this.feedbackProducer = feedbackProducer;
    this.rosterProducer = rosterProducer;
  }
  respondWith = (signupApproval, token) => {
    this.feedbackProducer.send(
      {
        id: MessageId,
        body: Body,
        messageAttributes: {
          submissionToken: { DataType: "String", StringValue: token },
          decision: { DataType: "String", StringValue: signupApproval.decision },
          explanation: { DataType: "String", StringValue: signupApproval.rationale }
        }
      },
      console.error
    );
    // @todo: make into standalone client
    if (signupApproval.decision === true) {
      rosterProducer.send({ id: MessageId, body: Body }, console.error);
    }
  };
}

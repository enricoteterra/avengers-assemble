import { SignupApproval } from "./domain/SignupApproval";
import { Client } from "./Client";
import { Subscription } from "./Subscription";

// understands how it relates to other applications
export class SignupApprovalApp {
  constructor(client = new Client(), signupSubscription = new Subscription()) {
    this.client = client;
    this.signupSubscription = signupSubscription;
    signupSubscription.attachHandler(this.handleMessage);
  }
  handleMessage = message => {
    const { MessageId, Body, MessageAttributes } = message;
    const factSheet = { age: 0, residence: "", fightingExperience: 0 };
    this.client.respondWith(new SignupApproval(factSheet));
  };

  stop = () => signupSubscription.detachHandler(this.handleMessage);

  // keep the app alive
  start = process.stdin.resume();
}

new SignupApprovalApp().start()
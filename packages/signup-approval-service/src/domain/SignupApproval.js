import { NotAMinorRule, MostlyOnEarthRule, FightsBaddiesRule } from "./Rules";

// signup approval understands if someone is eligible to sign up
export class SignupApproval {
  // @todo: this map should disappear into a fact class
  ruleAppliedOn = {
    age: NotAMinorRule,
    residence: MostlyOnEarthRule,
    fightingExperience: FightsBaddiesRule
  };

  constructor(factSheet) {
    this.factSheet = factSheet;
  }

  decisionFor = (fact, value) => this.ruleAppliedOn[fact].isSatisfiedBy(value);

  get decision() {
    return Object.keys(this.factSheet)
      .map(fact => this.decisionFor(fact, this.factSheet[fact]))
      .every(decision => decision === true);
  }

  // @todo: rule should become a command and return a decision object that can be interrogated on return
  reasonForDecision = (fact, value) => this.ruleAppliedOn[fact].reasonForDecision(value);

  get rationale() {
    return Object.keys(this.factSheet).map(fact => ({
      fact,
      reason: this.reasonForDecision(fact, this.factSheet[fact])
    }));
  }
}

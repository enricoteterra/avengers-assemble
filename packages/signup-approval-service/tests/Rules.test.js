import {
  MostlyOnEarthRule,
  FightsBaddiesRule,
  NotAMinorRule
} from "../src/domain/Rules";

describe("Rule", () => {
  test("rule is satisfied", () => {
    // @TODO: 0 should be years, no naked primitives in dsl
    // extend number with years getter so we can write: 0.years
    // @TODO: make planets enums?
    expect(MostlyOnEarthRule.isSatisfiedBy("earth")).toBe(true);
    expect(MostlyOnEarthRule.isSatisfiedBy("space")).toBe(false);
    expect(FightsBaddiesRule.isSatisfiedBy(0)).toBe(false);
    expect(FightsBaddiesRule.isSatisfiedBy(2)).toBe(true);
    expect(NotAMinorRule.isSatisfiedBy(21)).toBe(true);
    expect(NotAMinorRule.isSatisfiedBy(16)).toBe(false);
  });
  test("gives reason", () => {
    // @TODO: reason should become its own class so that these tests can be improved
    expect(MostlyOnEarthRule.reasonForDecision(true)).toBeDefined()
    expect(MostlyOnEarthRule.reasonForDecision(false)).toBeDefined()
    expect(FightsBaddiesRule.reasonForDecision(true)).toBeDefined()
    expect(FightsBaddiesRule.reasonForDecision(false)).toBeDefined()
    expect(NotAMinorRule.reasonForDecision(true)).toBeDefined()
    expect(NotAMinorRule.reasonForDecision(false)).toBeDefined()
  })
});

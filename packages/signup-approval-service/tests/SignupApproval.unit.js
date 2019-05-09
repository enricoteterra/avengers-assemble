import { SignupApproval } from "../src/domain/SignupApproval";

describe("Signup Approval", () => {
  const factSheetHumanChild = { age: 12, residence: "earth", fightingExperience: 0 };
  const factSheetHumanInSpace = { age: 34, residence: "space", fightingExperience: 6 };
  const factSheetKreeOnHala = { age: 180, residence: "hala", fightingExperience: 12 };
  const factSheetCaptainAmerica = { age: 120, residence: "earth", fightingExperience: 40 };

  test("make decision", () => {
    expect(new SignupApproval(factSheetHumanChild).decision).toBe(false);
    expect(new SignupApproval(factSheetHumanInSpace).decision).toBe(false);
    expect(new SignupApproval(factSheetKreeOnHala).decision).toBe(false);
    expect(new SignupApproval(factSheetCaptainAmerica).decision).toBe(true);
  });

  test("explain decision", () => {
    // @TODO: improve test assertion
    expect(new SignupApproval(factSheetHumanChild).rationale).toBeDefined();
    expect(new SignupApproval(factSheetHumanInSpace).rationale).toBeDefined();
    expect(new SignupApproval(factSheetKreeOnHala).rationale).toBeDefined();
    expect(new SignupApproval(factSheetCaptainAmerica).rationale).toBeDefined();
  });
});

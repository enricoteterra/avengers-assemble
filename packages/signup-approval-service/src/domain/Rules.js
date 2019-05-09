// rules understand about conditions that need to be met

export const MostlyOnEarthRule = {
  isSatisfiedBy: placeOfResidence => placeOfResidence === "earth",
  reasonForDecision: ruling => ruling 
     ? "Great! We need our Avengers close by" 
     : "How will we get a hold of you next time Thanos turns up :("
};

const NO_EXPERIENCE = 0
export const FightsBaddiesRule = {
  isSatisfiedBy: fightingExperience => fightingExperience > NO_EXPERIENCE,
  reasonForDecision: ruling => ruling 
     ? "keep your nun-chucks at hand!" 
     : "..do you even know how to use that?"
};

const AGE_OF_CONSENT = 18
export const NotAMinorRule = {
  isSatisfiedBy: age => age > AGE_OF_CONSENT,
  reasonForDecision: ruling => ruling 
     ? "you seem old enough for this" 
     : "No teenagers allowed, who knows when we get stuck in the pocket dimension again.."
};

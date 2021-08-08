const assignPts = (scores, student, index) => {
  // return table state, challenge name
  // TO DO: stop at 1
};

const decrementChallenge = (challenges, title) => {
  // return state copy
};

const getNextChallenge = (student, challenges) => {
  // return challenge name + state copy
};

const updateMaxPts = (challenges, attending) => {
  console.log("update chall", attending);
  const newChallenges = challenges.map((c) => {
    // upon first render OR if no students have finished challenge
    if (c.maxPts === 0 || c.maxPts == c.nextPt) {
      c.maxPts = attending;
      c.nextPt = attending;
    }

    // otherwise keep it the same
    return c;
  });
  return newChallenges;
};

export const scoring = {
  assignPts: assignPts,
  decrementChallenge: decrementChallenge,
  updateMaxPts: updateMaxPts,
};

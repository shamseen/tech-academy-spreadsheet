const assignPts = (scores, student, index, targetChall) => {
  // adding points based on chall's next point to assign
  student[targetChall.key] += targetChall.nextPt;
  student.total += targetChall.nextPt;

  // updating student's next challenge
  student.nextChallenge += 1; // TODO: stop at last challenge

  // updating table data
  scores[index] = student;

  // returning data
  return [...scores];
};

const decrementChallenge = (challenges, targetChall, index) => {
  const nextPt = targetChall.nextPt;

  // last students still get one point. never 0.
  targetChall.nextPt = nextPt > 1 ? nextPt - 1 : 1;

  // updating state
  challenges[index] = targetChall;

  return [...challenges];
};

const updateMaxPts = (challenges, attending) => {
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

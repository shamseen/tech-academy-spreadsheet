const assignPts = (scores, student, index) => {
  const assignTo = `challenge${student.nextChallenge}`;

  // adding points
  student[assignTo] += 1;
  student.total += 1;

  // updating student's next challenge
  student.nextChallenge += 1; // TODO: stop at last challenge

  // updating table data
  scores[index] = student;

  // returning data
  return [...scores];
};

const decrementChallenge = (challenges, title) => {
  // TO DO: stop at 1
  // return state copy
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

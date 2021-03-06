import { Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { scoring } from "./scoringLogic";

export default function ScoresTable() {
  const { challenges, setChallenges, roster } = useContext(DataContext);
  const [classScores, setScores] = useState([]);
  const [attending, setAttending] = useState([]);

  // array of all column names attached to initial score of 0
  // then set to student "scores" prop
  const [challKeys, setChallKeys] = useState({});

  const [columns, setColumns] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
    },
  ]);

  /* --- Functions --- */
  const assignPts = (student, index) => {
    const targetChall = challenges[student.nextChallenge];

    const scoresCopy = scoring.assignPts(
      [...classScores],
      { ...student },
      index, // index to update
      targetChall // for nextPt
    );

    // updating challenge's next pt
    const challengesCopy = scoring.decrementChallenge(
      challenges,
      targetChall,
      student.nextChallenge // index to update
    );

    // updating states
    setScores(scoresCopy);
    setChallenges(challengesCopy);
  };

  const populateColumns = () => {
    // workaround: updating attendance duplicates challenges
    if (columns.length > 2) {
      return;
    }
    // temp copy
    const col = [...columns];
    let scores = {
      total: 0, // total column shows before challenges
    };

    // adding challenge names to table columns
    challenges.forEach((c) => {
      // adding column info
      col.push({
        title: c.title,
        dataIndex: c.key,
        key: c.key,
        ellipsis: true, // abbreviates long titles
      });

      // key will be the link to rows
      scores[c.key] = 0;
    });

    // updating state
    setColumns([...col]);
    setChallKeys({ ...scores });
  };

  const populateRows = () => {
    const tempScores = [...classScores];
    const attendingCopy = [...attending];

    // grabbing students not already listed
    const newStudents = Object.keys(roster).filter(
      (name) => !attending.includes(name) && roster[name].present
    );

    for (let i = 0; i < newStudents.length; i++) {
      const name = newStudents[i];
      tempScores.push({
        name: name,
        nextChallenge: 0,
        ...challKeys,
      });

      attendingCopy.push(name);
    }

    // updating state
    setAttending(attendingCopy);
    // each row maps column key to student score
    setScores([...tempScores]);
  };

  const updateMaxPts = () => {
    const updated = scoring.updateMaxPts(challenges, attending.length);
    setChallenges(updated);
  };

  /* --- Setup --- */

  // filling columns on render
  useEffect(() => {
    populateColumns();
  }, []);

  // filling table with students
  useEffect(() => {
    // WORKAROUND
    // stupid bug where the keys don't populate immediately.
    if (challKeys.challenge1 == undefined) return;

    populateRows();
  }, [challKeys, roster]);

  // changing maximum points for challenges
  // after student is added
  useEffect(() => {
    updateMaxPts();
  }, [attending]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={classScores}
        pagination={false}
        bordered={true}
        onRow={(row, index) => {
          return {
            onClick: () => {
              assignPts(row, index);
            },
          };
        }}
      />

      {/* ---- DEBUGGING ----- */}
      {/* <hr />
      <p>Students present: {attending.length}</p>
      <hr />
      {challenges.map((c, i) => {
        return <p>{`${c.title}: max(${c.maxPts}) next(${c.nextPt})`}</p>;
      })}*/}
    </div>
  );
}

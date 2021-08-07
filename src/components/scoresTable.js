import { Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

export default function ScoresTable() {
  const { challenges, roster } = useContext(DataContext);
  const [classScores, setScores] = useState([]);
  const [attending, setAttending] = useState(0);

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

  const assignPts = (student, index) => {
    // adding points
    student.challenge1 += 1;
    student.total += 1;

    // copying and updating state
    const tableDataCopy = [...classScores];
    tableDataCopy[index] = { ...student };

    setScores(tableDataCopy);
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
    challenges.forEach((c, i) => {
      // adding column info
      col.push({
        title: c.title,
        dataIndex: c.key,
        key: c.key,
        ellipsis: true, // abbreviates long titles
      });

      // saving key to link to rows
      scores[c.key] = 0;
    });

    // updating state
    setColumns([...col]);
    setChallKeys({ ...scores });
  };

  const populateRows = () => {
    const tempScores = [];
    let copyAttend = 0;

    for (let a in roster) {
      if (roster[a].present) {
        tempScores.push({
          name: a,
          ...challKeys,
        });

        copyAttend += 1; // tracking attendance num
      }
    }
    // updating state
    // each row maps column key to student score
    setScores([...tempScores]);
    setAttending(copyAttend);
  };

  useEffect(() => {
    populateColumns();
  }, []);

  useEffect(() => {
    populateRows();
    // updateMaxPts()
  }, [challKeys, roster]);

  return (
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
  );
}

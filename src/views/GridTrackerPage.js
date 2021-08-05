import { Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

export default function GridTrackerPage({ activeStudentsArr }) {
  const { challenges, roster } = useContext(DataContext);
  const [rows, setRows] = useState([]);

  // array of all column names attached to initial score of 0
  // then set to student "scores" prop
  const [colKeys, setColKeys] = useState({});

  const [columns, setColumns] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ]);

  const populateColumns = () => {
    // temp copy
    const col = [...columns];
    let scores = {
      total: 0, // total column shows before challenges
    };

    // adding challenge names to table columns
    challenges.forEach((name, i) => {
      const dataIndex = `challenge${i}`;
      // adding column info
      col.push({
        title: name,
        dataIndex: dataIndex,
        key: dataIndex,
      });

      // saving key to set rows
      scores[dataIndex] = 0;
    });

    // updating state
    setColumns([...col]);
    setColKeys({ ...scores });
  };

  const populateRows = () => {
    const tempRows = [];

    for (let a in roster) {
      if (roster[a].present) {
        const tempRow = { ...colKeys };
        tempRow.name = a;
        tempRows.push(tempRow);
      }
    }

    console.log(tempRows);

    // updating state
    // each row maps column key to student score
    setRows([...tempRows]);
  };

  useEffect(() => {
    if (activeStudentsArr.length !== 0) {
      populateColumns();
      populateRows();
      console.log("useeffect");
    }
  }, [roster]);

  return (
    <>
      <Table columns={columns} dataSource={rows} />
    </>
  );
}
// TO DO: router, redirect on submit (modal?), data table, attendance btn

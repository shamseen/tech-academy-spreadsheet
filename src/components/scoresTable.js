import { Button, message, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

export default function ScoresTable({ activeStudentsArr }) {
  const { challenges, roster, updateRoster } = useContext(DataContext);
  const [rows, setRows] = useState([]);

  // array of all column names attached to initial score of 0
  // then set to student "scores" prop
  const [colKeys, setColKeys] = useState({});

  const [columns, setColumns] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, data, index) => (
        <Button
          onClick={() => {
            assignPts(data, index);
          }}
        >
          {name}
        </Button>
      ),
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ]);

  const assignPts = (data, index) => {
    message.info(`(TESTING) ${data.name} was clicked`);
    const copyTableData = [...rows];
    console.log("rows", JSON.stringify(columns, null, 2));
    console.log("copy", JSON.stringify(copyTableData, null, 2));
  };

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
        ellipsis: true,
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
        tempRows.push({
          name: a,
          ...colKeys,
        });
      }
    }
    // updating state
    // each row maps column key to student score
    setRows([...tempRows]);
  };

  useEffect(() => {
    populateColumns();
  }, []);

  useEffect(() => {
    populateRows();
  }, [colKeys, roster]);

  return (
    <>
      <Table columns={columns} dataSource={rows} pagination={false} />
    </>
  );
}

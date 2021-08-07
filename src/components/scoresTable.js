import { Button, message, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

export default function ScoresTable() {
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
    const tableDataCopy = [...rows];
    tableDataCopy[index] = { ...student };

    setRows(tableDataCopy);
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
      <Table
        columns={columns}
        dataSource={rows}
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
    </>
  );
}

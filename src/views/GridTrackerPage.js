import { Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

export default function GridTrackerPage() {
  const { challenges } = useContext(DataContext);

  const [columns, setColumns] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Total",
      dataIndex: "totalPts",
      key: "totalPts",
    },
  ]);

  useEffect(() => {
    // temp copy
    const col = [...columns];

    // adding challenge names to table columns
    challenges.forEach((name, i) => {
      col.push({
        title: name,
        dataIndex: `challenge-${i}`,
        key: `challenge-${i}`,
      });
    });

    // updating state
    setColumns(col);
  }, challenges);
  return (
    <>
      <Table columns={columns} />
    </>
  );
}
// TO DO: router, redirect on submit (modal?), data table, attendance btn

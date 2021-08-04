import { useContext, useEffect, useState } from "react";
import { Button, Card, Space } from "antd";
import { DataContext } from "../App";

export default function ActiveStudentsList({ activeStudents, setActive }) {
  const { roster, updateRoster } = useContext(DataContext);

  // populating list of active students
  useEffect(() => {
    // temp var
    const active = {};

    // filtering by attendance
    for (let name in roster) {
      if (roster[name].present) {
        active[name] = roster[name];
      }
    }

    // updating state
    setActive({ ...active });
  }, [roster]);

  return (
    <Card title="All Students">
      <Space wrap>
        {Object.keys(activeStudents).map((name) => {
          return (
            <Button key={name} size="large">
              {name}
            </Button>
          );
        })}
      </Space>
    </Card>
  );
}

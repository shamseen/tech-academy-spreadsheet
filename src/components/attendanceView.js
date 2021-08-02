import { useContext } from "react";
import { Button, Card, Space } from "antd";
import { DataContext } from "../App";

export default function AttendanceView() {
  const { roster, updateRoster } = useContext(DataContext);

  const updateAttendance = (name, info) => {
    // copying state var
    const copy = { ...roster };

    // updating copy and state
    copy[name].present = !info;
    updateRoster({ ...copy });
  };

  return (
    <>
      <Card title="Attendance">
        <Space wrap>
          {Object.keys(roster).map((name) => {
            const info = roster[name].present;

            return (
              <Button
                key={name}
                size="large"
                onClick={() => updateAttendance(name, info)}
                type={info ? "primary" : "ghost"}
              >
                {name}
              </Button>
            );
          })}
        </Space>
      </Card>
    </>
  );
}

import { useContext, useState } from "react";
import { DataContext } from "../App";

import { Alert, Button, Card, message } from "antd";

export default function AttendanceCard() {
  const { roster, updateRoster, maxPts, setMaxPts } = useContext(DataContext);

  const [rosterCopy, setRosterCopy] = useState({ ...roster });

  const saveData = () => {
    // updating true roster
    updateRoster({ ...rosterCopy });

    // notifying user
    message.success({
      content:
        "Attendance updated! You can see the changes in the Score Tracker tab.",
      className: "notif-saved",
      duration: 2,
    });
  };

  const updateAttendance = (name, info) => {
    // copying state var
    const copy = { ...roster };

    // updating copy and state
    copy[name].present = !info;
    setRosterCopy({ ...copy });

    // max points to earn = number of students present
    setMaxPts(rosterCopy[name].present ? maxPts + 1 : maxPts - 1);
  };

  // TODO: save btn
  return (
    <>
      <Card
        title={
          <Alert
            type="warning"
            message="Select all students present - remember to click save!"
            showIcon
          />
        }
        actions={[
          <Button type="primary" onClick={saveData} size="large">
            Save
          </Button>,
        ]}
      >
        {Object.keys(rosterCopy).map((name) => {
          const present = rosterCopy[name].present;
          return (
            <Card.Grid
              key={name}
              onClick={() => updateAttendance(name, present)}
            >
              <Alert
                message={name}
                type={present ? "success" : "info"}
                showIcon={present}
              />
            </Card.Grid>
          );
        })}
      </Card>
    </>
  );
}

import { useContext, useEffect, useState } from "react";
import { Button, Card, Modal, notification } from "antd";
import { DataContext } from "../App";
import GridTrackerPage from "../views/GridTrackerPage";
import AttendanceBtnGroup from "./attendanceBtnGroup";
import { Link } from "react-router-dom";

export default function ChallengeView() {
  const { maxPts, nextPt, roster, challenges, resetData } =
    useContext(DataContext);
  const { updateRoster, setMaxPts } = useContext(DataContext);
  const [activeStudents, setActive] = useState([]);
  const [showModal, setModal] = useState(false);

  const handleOk = () => {
    setModal(false);
    notification.success({
      message: "Attendance updated.",
      placement: "topLeft",
    });
  };

  // populating list of active students
  useEffect(() => {
    // temp var
    const active = [];

    // filtering by attendance
    Object.keys(roster).map((name, i) => {
      if (roster[name].present) {
        active.push({
          name: name,
          key: i, // id for transfer list item
        });
      }
    });

    // updating state
    setActive([...active]);
  }, [roster]);

  return (
    <div>
      <Card
        title="Score Tracker"
        extra={[
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              setModal(!showModal);
            }}
          >
            Update Attendance
          </Button>,
          <Button danger type="text" onClick={resetData}>
            <Link to="/">Start a new class</Link>
          </Button>,
        ]}
      >
        {activeStudents.length == 0 ? null : (
          <GridTrackerPage activeStudentsArr={activeStudents} />
        )}
      </Card>
      <Modal
        visible={showModal}
        title={`Who's present? (${maxPts})`}
        onOk={handleOk}
        onCancel={() => {
          setModal(false);
        }}
      >
        <AttendanceBtnGroup
          students={roster}
          updateStudents={updateRoster}
          setMaxPts={setMaxPts}
          maxPts={maxPts}
        />
      </Modal>
    </div>
  );
}

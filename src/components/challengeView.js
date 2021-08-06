import { useContext, useEffect, useState } from "react";
import { Button, Card, Modal, notification } from "antd";
import { DataContext } from "../App";
import GridTrackerPage from "../views/GridTrackerPage";
import AttendanceBtnGroup from "./attendanceBtnGroup";

export default function ChallengeView() {
  const { maxPts, nextPt, roster, challenges } = useContext(DataContext);
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

  const assignPts = () => {};

  return (
    <div>
      <Card
        title="Score Tracker"
        extra={
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              setModal(!showModal);
            }}
          >
            Update Attendance
          </Button>
        }
      >
        {activeStudents.length == 0 ? null : (
          <GridTrackerPage activeStudentsArr={activeStudents} />
        )}
        {/* <Transfer
          dataSource={activeStudents}
          titles={["In Progress", "Complete"]}
          render={(student) => student.name} // render specifically the student's name
          // targetKeys={}
          // selectedKeys={}
          // onSelectChange={}
          onChange={assignPts}
          oneWay={true}
        /> */}
      </Card>
      <Modal
        visible={showModal}
        title={`Select Present Students ${maxPts}`}
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

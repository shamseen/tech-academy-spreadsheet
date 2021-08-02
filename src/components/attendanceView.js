import { useContext, useEffect, useState } from "react";
import { Button, Modal, Space } from "antd";
import { DataContext } from "../App";

export default function AttendanceView() {
  const { showModal, toggleModal, roster, updateRoster } =
    useContext(DataContext);

  const [rosterCopy, updateCopy] = useState({});

  // populating copy of the roster
  useEffect(() => {
    updateCopy({ ...roster });
    console.log("roster updated");
  }, [roster]);

  const saveAttendance = () => {
    updateRoster({ ...rosterCopy });

    toggleModal(!showModal);
  };

  const updateAttendance = (name, info) => {
    // copying state var
    const copy = { ...rosterCopy };

    // updating copy and state
    copy[name].present = !info;
    updateCopy({ ...copy });
  };

  return (
    <Modal
      title="Getting Started"
      closable={false}
      visible={showModal}
      footer={[
        <Button key="save" type="primary" onClick={saveAttendance}>
          Save
        </Button>,
      ]}
    >
      <Space wrap>
        {Object.keys(rosterCopy).map((name) => {
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
    </Modal>
  );
}

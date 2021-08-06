import { useContext, useState } from "react";
import { Button, Divider, Form, Input } from "antd";
import { DataContext } from "../App";
import AttendanceBtnGroup from "./attendanceBtnGroup";

const { Item } = Form;

export function ClassSetupForm() {
  const { maxPts, setMaxPts, setChallenges, updateRoster, toggleModal } =
    useContext(DataContext);

  const [rosterCopy, updateCopy] = useState({});

  // TO DO: add max pts to each challenge
  const handleChallengeEntry = (e) => {
    // parsing input
    const names = e.target.value.split("\t");
    setChallenges([...names]);
  };

  const handleNameEntry = (str) => {
    // parsing input
    const names = str.target.value.split("\n");
    const temp = {};

    // setting up student records
    names.forEach((n) => {
      temp[n] = {
        present: false,
      };
    });
    // updating roster copy
    updateCopy({ ...temp });
  };

  const handleSubmit = () => {
    // updating true roster
    updateRoster({ ...rosterCopy });

    toggleModal(true);

    // notifying user
    // message.success("Class information saved!");
  };

  return (
    <Form layout={"horizontal"} size={"large"} onFinish={handleSubmit}>
      {/* -- Challenges Input -- */}
      <Divider orientation="left">Challenges</Divider>
      <Item
        name={"challenges"}
        label="Enter Challenges:"
        onChange={handleChallengeEntry}
      >
        <Input.TextArea />
      </Item>

      {/* -- Attendance Input-- */}
      <Divider orientation="left">Attendance ({maxPts})</Divider>
      <Item name={"names"} label="Enter Names:" onChange={handleNameEntry}>
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
      </Item>

      {/* -- Student Absence Toggle -- */}
      <Item name={"roster"} label="Who is present?">
        <AttendanceBtnGroup
          students={rosterCopy}
          updateStudents={updateCopy}
          setMaxPts={setMaxPts}
          maxPts={maxPts}
        />
      </Item>

      {/* -- Submit Btn -- */}
      <Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  );
}

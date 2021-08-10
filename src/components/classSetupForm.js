import { useContext } from "react";
import { Alert, Button, Divider, Form, Input } from "antd";
import { DataContext } from "../App";

const { Item } = Form;

export function ClassSetupForm() {
  const { setChallenges, updateRoster, toggleModal } = useContext(DataContext);

  // TO DO: add max pts to each challenge
  const saveChallenges = (str) => {
    // parsing input
    const names = str.split("\t");

    // data setup
    const challenges = [];
    names.forEach((name, i) => {
      challenges.push({
        title: name,
        key: `challenge${i}`,
        maxPts: 0,
        nextPt: 0,
      });
    });

    // updating state
    setChallenges([...challenges]);
  };

  const saveStudents = (str) => {
    // parsing input
    const names = str.split("\n");
    const copy = {};

    // setting up student records
    names.forEach((n) => {
      copy[n] = {
        present: false,
      };
    });
    // updating state
    updateRoster({ ...copy });
  };

  const handleSubmit = (formData) => {
    saveChallenges(formData.challenges);
    saveStudents(formData.names);
    toggleModal(true);
  };

  return (
    <Form size="large" onFinish={handleSubmit} id="class-setup-form">
      <h2>Enter class information</h2>
      <Alert
        type="warning"
        message="NOTE: Please copy and paste directly from the spreadsheet!"
        showIcon
      />
      {/* -- Challenges Input -- */}
      <Divider orientation="left">Challenge Names</Divider>
      <Item name={"challenges"}>
        <Input.TextArea />
      </Item>

      {/* -- Attendance Input -- */}
      <Divider orientation="left">Student Names</Divider>
      <Item name={"names"}>
        <Input.TextArea />
      </Item>

      {/* -- Submit Btn -- */}
      <Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Item>
    </Form>
  );
}

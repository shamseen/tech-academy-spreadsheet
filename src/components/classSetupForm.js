import { useContext, useState } from "react";
import { Button, Divider, Form, Input, message, Space } from "antd";
import { DataContext } from "../App";
const { Item } = Form;

export function ClassSetupForm() {
  const { maxPts, setMaxPts, challenges, setChallenges, updateRoster } =
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

        // starting scores + total are all 0
        scores: Array(challenges.length + 1).fill(0),
      };
    });
    // updating roster copy
    updateCopy({ ...temp });
  };

  const handleSubmit = (formData) => {
    // updating true roster
    updateRoster({ ...rosterCopy });

    // notifying user
    message.success("Class information saved!");
  };

  const updateAttendance = (name, info) => {
    // copying state var
    const copy = { ...rosterCopy };

    // updating copy and state
    copy[name].present = !info;
    updateCopy({ ...copy });

    // max points to earn = number of students present
    setMaxPts(copy[name].present ? maxPts + 1 : maxPts - 1);
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
      <Item name={"roster"} label="Select Students Present:">
        <Space wrap>
          {Object.keys(rosterCopy).map((name) => {
            const info = rosterCopy[name].present;
            return (
              <Button
                key={name}
                onClick={() => updateAttendance(name, info)}
                type={info ? "primary" : "ghost"}
              >
                {name}
              </Button>
            );
          })}
        </Space>
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

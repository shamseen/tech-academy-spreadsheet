import { useContext, useEffect, useState } from "react";
import { Button, Divider, Form, Input, Space } from "antd";
import { DataContext } from "../App";
const { Item } = Form;

export function ClassSetupForm() {
  const { showModal, toggleModal, roster, updateRoster, maxPts, setMaxPts } =
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

    // max points to earn = number of present students
    setMaxPts(copy[name].present ? maxPts + 1 : maxPts - 1);
  };
  return (
    <Form layout={"horizontal"}>
      <Divider orientation="left">Attendance ({maxPts})</Divider>
      <Item name={"names"} label="Enter Names:">
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
      </Item>
      <Item name={"roster"} label="Select Students Present:">
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
      </Item>

      <Divider orientation="left">Challenges</Divider>
      <Item name={"challenges"} label="Enter Challenges:">
        <Input.TextArea />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Item>
    </Form>
  );
}

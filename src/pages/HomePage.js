import { useState } from "react";
import AttendanceView from "../components/attendanceView";
import { Steps, Radio } from "antd";

export default function HomePage() {
  const [currentView, setCurrent] = useState(0);

  const [views] = useState([
    {
      label: "Attendance",
      value: 0,
      component: <AttendanceView />,
    },
    {
      label: "Challenge 1",
      value: 1,
      component: "challenge 1",
    },
    {
      label: "Challenge 2",
      value: 2,
      component: "challenge 2",
    },
  ]);

  return (
    <>
      <Radio.Group
        onChange={(e) => setCurrent(e.target.value)}
        options={views}
        value={currentView}
        optionType="button"
        buttonStyle="solid"
      />

      {/* -- Title of action -- */}
      <Steps current={currentView}>
        {views.map((view) => {
          return <Steps.Step key={view.title} />;
        })}
      </Steps>

      {/* -- Action area (component) --- */}
      <div>{views[currentView].component}</div>
    </>
  );
}

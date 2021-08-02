import { useRef, useState } from "react";
import AttendanceView from "../components/attendanceView";
import { Carousel, Steps, Radio } from "antd";

export default function HomePage() {
  const [currentView, setCurrent] = useState(1);
  const carousel = useRef(null);

  const [views] = useState([
    {
      label: "Attendance",
      value: 1,
    },
    {
      label: "Challenge 1",
      value: 2,
    },
    {
      label: "Challenge 2",
      value: 3,
    },
  ]);

  const goToView = (e) => {
    setCurrent(e.target.value);
    carousel.current.goTo(currentView, false);
  };

  return (
    <>
      <Radio.Group
        onChange={goToView}
        options={views}
        value={currentView}
        optionType="button"
        buttonStyle="solid"
      />

      <Carousel ref={carousel} dots={false}>
        <div>
          <AttendanceView />
        </div>

        <div>
          <h2>Challenge 1</h2>
        </div>

        <div>
          <h2>Challenge 2</h2>
        </div>
      </Carousel>
    </>
  );
}

import { useRef, useState } from "react";
import AttendanceView from "../components/attendanceView";

import { Carousel, Modal, Radio } from "antd";
import ActiveStudentsList from "../components/activeStudentsList";

export default function HomePage() {
  const [currentView, setCurrent] = useState(1);
  const carousel = useRef(null);

  const [views] = useState([
    {
      label: "Challenge 1",
      value: 1,
    },
    {
      label: "Challenge 2",
      value: 2,
    },
  ]);

  const goToView = (e) => {
    setCurrent(e.target.value);
    carousel.current.goTo(currentView, false);
  };

  return (
    <>
      <AttendanceView />
      <Radio.Group
        onChange={goToView}
        options={views}
        value={currentView}
        optionType="button"
        buttonStyle="solid"
      />

      <Carousel ref={carousel} dots={false}>
        <div>
          <h2>Challenge 1</h2>
          <ActiveStudentsList />
        </div>

        <div>
          <h2>Challenge 2</h2>
        </div>
      </Carousel>
    </>
  );
}

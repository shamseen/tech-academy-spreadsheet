import { useRef, useState } from "react";
import { Carousel, Modal, PageHeader, Radio } from "antd";
import { ClassSetupForm } from "../components/classSetupForm";
import ChallengeView from "../components/challengeView";

export default function HomePage() {
  const [currentView, setCurrent] = useState(1);
  const carousel = useRef(null);

  const [views] = useState([
    {
      label: "Class Setup",
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
      {/* Navigation */}
      <Radio.Group
        onChange={goToView}
        options={views}
        value={currentView}
        optionType="button"
        buttonStyle="solid"
      />

      <Carousel ref={carousel} dots={false}>
        <div>
          <PageHeader className="site-page-header" title="Class Setup" />
          <ClassSetupForm />
        </div>
        <div>
          <PageHeader className="site-page-header" title="Challenge 1" />
          <ChallengeView />
        </div>

        <div>
          <PageHeader className="site-page-header" title="Challenge 2" />
        </div>
      </Carousel>
    </>
  );
}

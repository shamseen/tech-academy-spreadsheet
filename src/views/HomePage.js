import { useEffect, useRef, useState } from "react";
import { Carousel, Modal, PageHeader, Radio } from "antd";
import { ClassSetupForm } from "../components/classSetupForm";
import ChallengeView from "../components/challengeView";

export default function HomePage({ challenges }) {
  const [currentView, setCurrent] = useState(1);
  const carousel = useRef(null);

  const [views, setViews] = useState([
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

  useEffect(() => {
    // only update buttons once names are populated
    if (challenges.length == 0) {
      return;
    }

    const btns = [];

    // setting data
    challenges.forEach((name, val) => {
      btns.push({
        label: name,
        value: val + 1,
      });
    });

    // updating state
    setViews(btns);
  }, challenges);

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

import { useContext, useEffect, useRef, useState } from "react";
import { Modal, PageHeader } from "antd";
import { ClassSetupForm } from "../components/classSetupForm";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

export default function HomePage() {
  const { challenges, showModal } = useContext(DataContext);
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
      <Link className="btn btn-outline-light" to="/scores">
        <h3>See Table</h3>
      </Link>
      <div>
        <PageHeader className="site-page-header" title="Class Setup" />
        <ClassSetupForm />
      </div>
      <Modal
      title=""
      visible={showModal}
      footer={}>
        
      </Modal>
    </>
  );
}

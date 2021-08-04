import React, { useEffect, useState } from "react";
import HomePage from "./views/HomePage";
import "antd/dist/antd.css";

export const DataContext = React.createContext();

export default function App() {
  const [roster, updateRoster] = useState({});
  const [challenges, setChallenges] = useState([]);
  const [showModal, toggleModal] = useState(true);
  const [maxPts, setMaxPts] = useState(0);
  const [nextPt, setNextPt] = useState(maxPts);

  return (
    <DataContext.Provider
      value={{
        challenges,
        setChallenges,
        maxPts,
        setMaxPts,
        showModal,
        toggleModal,
        roster,
        updateRoster,
      }}
    >
      <HomePage challenges={challenges} />
    </DataContext.Provider>
  );
}

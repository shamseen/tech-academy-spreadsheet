import React, { useEffect, useState } from "react";
import { getNames } from "./dataServices/mockNameService";
import HomePage from "./views/HomePage";
import "antd/dist/antd.css";

export const DataContext = React.createContext();

export default function App() {
  const [roster, updateRoster] = useState({});

  const [showModal, toggleModal] = useState(true);
  const [maxPts, setMaxPts] = useState(0);
  const [nextPt, setNextPt] = useState(maxPts);

  const getRoster = async () => {
    const data = await getNames();
    updateRoster(data);
  };

  useEffect(() => {
    getRoster();
  }, []);

  return (
    <DataContext.Provider
      value={{
        maxPts,
        setMaxPts,
        showModal,
        toggleModal,
        roster,
        updateRoster,
      }}
    >
      <HomePage />
    </DataContext.Provider>
  );
}

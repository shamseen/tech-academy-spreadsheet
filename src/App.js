import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./views/HomePage";
import "antd/dist/antd.css";
import ChallengeView from "./components/challengeView";

export const DataContext = React.createContext();

export default function App() {
  const [roster, updateRoster] = useState({});
  const [challenges, setChallenges] = useState([]);
  const [showModal, toggleModal] = useState(false);
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
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return <HomePage showModal={showModal} />;
          }}
        />

        <Route
          path="/tracker"
          exact
          render={() => {
            return <ChallengeView />;
          }}
        />
      </Switch>
    </DataContext.Provider>
  );
}

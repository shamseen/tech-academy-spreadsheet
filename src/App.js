import { useEffect, useState } from "react";
import { getNames } from "./dataServices/mockNameService";
import HomePage from "./pages/HomePage";
import "antd/dist/antd.css";

export default function App() {
  const [roster, setRoster] = useState([]);
  const [activeStudents, setActive] = useState([]);

  const getRoster = async () => {
    const data = await getNames();
    setRoster(data);
  };

  useEffect(() => {
    getRoster();
  }, []);

  return (
    <>
      <HomePage names={roster} />
    </>
  );
}

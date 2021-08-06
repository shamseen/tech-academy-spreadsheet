import { useContext, useEffect, useState } from "react";
import { Button, Card, message, PageHeader, Space, Tabs } from "antd";
import { DataContext } from "../App";
import ScoresTable from "../components/scoresTable";
import { Link } from "react-router-dom";
import AttendanceCard from "../components/attendanceCard";

const { TabPane } = Tabs;

export default function ChallengeView() {
  const { maxPts, nextPt, roster, challenges, resetData } =
    useContext(DataContext);
  const { updateRoster, setMaxPts } = useContext(DataContext);
  const [activeStudents, setActive] = useState([]);

  // populating list of active students
  useEffect(() => {
    // temp var
    const active = [];

    // filtering by attendance
    Object.keys(roster).map((name, i) => {
      if (roster[name].present) {
        active.push({
          name: name,
          key: i, // id for transfer list item
        });
      }
    });

    // updating state
    setActive([...active]);
  }, [roster]);

  return (
    <div id="live-class-page">
      <PageHeader className="site-page-header" title="Live Classroom" />

      <Tabs
        defaultActiveKey="2"
        size="large"
        type="card"
        tabBarGutter={10}
        animated={true}
        tabBarExtraContent={{
          left: (
            <Button danger type="text" onClick={resetData}>
              <Link to="/">Start a new class</Link>
            </Button>
          ),
        }}
      >
        {/* -- Score tracking -- */}
        <TabPane tab="Score Tracker" key="1">
          <ScoresTable activeStudentsArr={activeStudents} />
        </TabPane>

        {/* -- Attendance tracking -- */}
        <TabPane tab="Attendance" key="2">
          <AttendanceCard />
        </TabPane>
      </Tabs>
    </div>
  );
}

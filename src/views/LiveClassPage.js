import { useContext, useEffect, useState } from "react";
import { Button, Card, message, PageHeader, Space, Tabs } from "antd";
import { DataContext } from "../App";
import ScoresTable from "../components/scoresTable";
import { Link } from "react-router-dom";

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

  /* -- Attendance functions -- */

  const updateAttendance = (name, info) => {
    // copying state var
    const copy = { ...roster };

    // updating copy and state
    copy[name].present = !info;
    updateRoster({ ...copy });

    // max points to earn = number of students present
    setMaxPts(copy[name].present ? maxPts + 1 : maxPts - 1);

    // notifying user
    message.success(
      "Attendance updated! You can see the changes in the Score Tracker tab."
    );
  };

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
            <Button danger type="link" onClick={resetData}>
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
          <h3>Who is here?</h3>
          <Space wrap>
            {Object.keys(roster).map((name) => {
              const info = roster[name].present;
              return (
                <Button
                  key={name}
                  onClick={() => updateAttendance(name, info)}
                  type={info ? "primary" : "ghost"}
                >
                  {name}
                </Button>
              );
            })}
          </Space>
        </TabPane>
      </Tabs>
    </div>
  );
}

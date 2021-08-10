import { Button, PageHeader, Tabs } from "antd";
import { DataContext } from "../App";
import ScoresTable from "../components/scoresTable";
import { Link } from "react-router-dom";
import AttendanceCard from "../components/attendanceCard";
import "../styles/liveClassPage.scss";

const { TabPane } = Tabs;

export default function LiveClassPage({ resetData }) {
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
            <Button danger type="text" onClick={resetData} size="large">
              <Link to="/">Start a new class</Link>
            </Button>
          ),
        }}
      >
        {/* -- Score tracking -- */}
        <TabPane tab="Score Tracker" key="1">
          <ScoresTable />
        </TabPane>

        {/* -- Attendance tracking -- */}
        <TabPane tab="Attendance" key="2">
          <AttendanceCard />
        </TabPane>
      </Tabs>
    </div>
  );
}

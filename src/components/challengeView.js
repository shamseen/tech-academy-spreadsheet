import { useContext, useEffect, useState } from "react";
import { Card, Transfer } from "antd";
import { DataContext } from "../App";
import GridTrackerPage from "../views/GridTrackerPage";

export default function ChallengeView() {
  const { maxPts, nextPt, roster, challenges } = useContext(DataContext);
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

  const assignPts = () => {};

  return (
    <div>
      <Card title="Active students">
        {challenges.length == 0 ? null : <GridTrackerPage />}
        <Transfer
          dataSource={activeStudents}
          titles={["In Progress", "Complete"]}
          render={(student) => student.name} // render specifically the student's name
          // targetKeys={}
          // selectedKeys={}
          // onSelectChange={}
          onChange={assignPts}
          oneWay={true}
        />
      </Card>
    </div>
  );
}

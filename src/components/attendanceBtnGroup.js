import { Button, Space } from "antd";

export default function AttendanceBtnGroup({
  students,
  updateStudents,
  maxPts,
  setMaxPts, // getting error from useContext()
}) {
  /* Cannot destructure property 'maxPts' of 
    'Object(...)(...)' as it is undefined. 
  */
  // const { setMaxPts } = useContext(DataContext);

  const updateAttendance = (name, info) => {
    // copying state var
    const copy = { ...students };

    // updating copy and state
    copy[name].present = !info;
    updateStudents({ ...copy });

    // max points to earn = number of students present
    setMaxPts(copy[name].present ? maxPts + 1 : maxPts - 1);
  };

  return (
    <Space wrap>
      {Object.keys(students).map((name) => {
        const info = students[name].present;
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
  );
}

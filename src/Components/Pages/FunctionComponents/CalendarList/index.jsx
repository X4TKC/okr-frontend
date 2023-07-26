import Calendar from "react-calendar";

function CalendarList({ data }) {
  const functionData = {
    outputHTML() {
      if (data.length === 0)
        return (
          <div>
            <img src={require("../../../Images/calendar.png")} />
            <br></br>
            <>This screen is where all your calendar goals will appear</>
          </div>
        );
      return (
        <div>
          <h3 className="calendar-title">Calendar</h3>
          {data.map((objective) => {
            return (
              <Calendar
                key={objective.id}
                className={["react-calendar"]}
                tileClassName={({ date }) => {
                  const currentDate = new Date(date);
                  const startDate = new Date(objective.dateStart);
                  const endDate = new Date(objective.dateEnd);
                  if (currentDate >= startDate && currentDate <= endDate) {
                    return "highlight";
                  }
                  return "";
                }}
              />
            );
          })}
        </div>
      );
    },
  };
  return <div className="calendar-section">{functionData.outputHTML()}</div>;
}
export default CalendarList;

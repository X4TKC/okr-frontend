import Calendar from "react-calendar";
import "./index.css";
import { Link } from "react-router-dom";
import KeyResultListFunction from "../KeyResultListFunction";
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
        <div className="objectives">
          {data.map((objective) => (
            <div key={objective.id} className="objective-item">
              {<h3 className="">{objective.name}</h3>}
              <KeyResultListFunction list={objective.keyResultList} />
              <Link
                to={`/objective-details/${objective.id}`}
                className="edit-link"
              >
                Details
              </Link>
              <div className="calendar-container">
                <h3 className="calendar-title">Calendar</h3>
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
              </div>
            </div>
          ))}
        </div>
      );
    },
  };
  return <div className="">{functionData.outputHTML()}</div>;
}
export default CalendarList;

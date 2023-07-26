import { Link } from "react-router-dom";
import "./index.css";
import KeyResultListFunction from "../KeyResultListFunction";
function ObjectiveList({ data }) {
  console.log("data", data);
  const functionData = {
    outputHTML() {
      if (data.length === 0)
        return (
          <div>
            <img src={require("../../../Images/star.png")} />
            <br></br>
            <>This screen is where all your goals will appear</>
            <h3>Add new Objectives!.</h3>
          </div>
        );
      return (
        <div>
          <h3 className="objectives-title">
            Here is a list of all your objectives:
          </h3>
          <ul className="custom-ul">
            {data.map((objective) => (
              <li key={objective.id} className="objective-item">
                {<h3 className="objective-title">{objective.name}</h3>}
                {/*<p className="objective-date">
                  {" "}
                  Start Date : {objective.dateStart.substring(0, 10)}
                </p>
                <p className="objective-date">
                  {" "}
                  End Date : {objective.dateEnd.substring(0, 10)}
            </p>*/}
                <KeyResultListFunction list={objective.keyResultList} />
                <Link
                  to={`/objective-details/${objective.id}`}
                  className="edit-link"
                >
                  Details
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    },
  };
  return <div className="calendar-section">{functionData.outputHTML()}</div>;
}
export default ObjectiveList;

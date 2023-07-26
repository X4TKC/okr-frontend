import { Link } from "react-router-dom";
function KeyResultListFunction({ list }) {
  const functionData = {
    outputHTML() {
      if (list.length === 0)
        return (
          <div>
            <img src={require("../../../Images/key.png")} />
            <br></br>
            <>This screen is where all your Key results will appear</>
            <h3>Add new KeyResults using the Details button!.</h3>
          </div>
        );
      return (
        <div>
          <h3 className="objectives-title">
            Here is the keys to complete your goal
          </h3>
          <ul className="custom-ul">
            {list.map((keyResult) => (
              <li key={keyResult.id} className="objective-item">
                {<h3 className="objective-title">{keyResult.description}</h3>}
              </li>
            ))}
          </ul>
        </div>
      );
    },
  };
  return <div className="objective-item">{functionData.outputHTML()}</div>;
}
export default KeyResultListFunction;

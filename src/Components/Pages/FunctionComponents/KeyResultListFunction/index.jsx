import "./index.css";
import React, { useState, useEffect } from "react";
import { checkKey } from "../../../../Services/keyService";
import { checkObjective } from "../../../../Services/objectiveService";
function KeyResultListFunction({ list }) {
  const [dataVersion, setDataVersion] = useState(0);

  const handleKeyResultClick = async (keyResultId, objectiveId) => {
    await checkKey(keyResultId); // Perform the update to the check property in the database
    await checkObjective(objectiveId);
    // Update the clicked key result in the list
    setKeyResults((prevKeyResults) =>
      prevKeyResults.map((keyResult) =>
        keyResult.id === keyResultId ? { ...keyResult, check: true } : keyResult
      )
    );
  };

  useEffect(() => {
    // Increment the data version whenever the key results list changes
    setDataVersion((prevVersion) => prevVersion + 1);
  }, [list]);

  const [keyResults, setKeyResults] = useState(list);

  return (
    <div className="objective-item">
      {keyResults.length === 0 ? (
        <div>
          <img src={require("../../../Images/key.png")} />
          <br />
          <h3 className="instructions-h3-title">
            This section is where all your Key Results will appear.
          </h3>

          <h3 className="instructions-h3-title">
            Add new Key Results using the Details button!
          </h3>
        </div>
      ) : (
        <div>
          <h3 className="objectives-title">
            Here are the keys to complete your goal:
          </h3>
          <ul className="custom-ul">
            {keyResults.map((keyResult) => (
              <li
                key={keyResult.id}
                className={`objective-item ${
                  keyResult.check ? "keylist" : "nokeylist"
                }`}
                onClick={() =>
                  handleKeyResultClick(keyResult.id, keyResult.objectiveId)
                }
                style={{ cursor: "pointer" }}
              >
                <h3
                  className={`keyresult-description ${
                    keyResult.check ? "checkmark" : ""
                  }`}
                >
                  {keyResult.description}
                </h3>
                {/* Conditional rendering for measurement and action */}
                {keyResult.measurement || keyResult.action ? (
                  <div>
                    {keyResult.action && (
                      <h4 className="keyresult-action">{keyResult.action}</h4>
                    )}
                    {keyResult.measurement && (
                      <h4 className="keyresult-measurement">
                        {keyResult.measurement}
                      </h4>
                    )}
                  </div>
                ) : (
                  <p className="empty-text">
                    No measurement or action provided
                    <small>
                      {" "}
                      <br></br>please complete the keyresult{" "}
                    </small>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KeyResultListFunction;

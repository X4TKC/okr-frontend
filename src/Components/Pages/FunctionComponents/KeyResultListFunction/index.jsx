import "./index.css";
import React, { useState, useEffect } from "react";
import { checkKey } from "../../../../Services/keyService";

function KeyResultListFunction({ list }) {
  const [dataVersion, setDataVersion] = useState(0);

  const handleKeyResultClick = async (keyResultId) => {
    await checkKey(keyResultId); // Perform the update to the check property in the database

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
          <>This screen is where all your Key results will appear</>
          <h3>Add new KeyResults using the Details button!.</h3>
        </div>
      ) : (
        <div>
          <h3 className="objectives-title">
            Here are the keys to complete your goal
          </h3>
          <ul className="custom-ul">
            {keyResults.map((keyResult) => (
              <li
                key={keyResult.id}
                className={`objective-item ${keyResult.check ? "keylist" : ""}`}
                onClick={() => handleKeyResultClick(keyResult.id)}
                style={{ cursor: "pointer" }}
              >
                <h3 className="">{keyResult.description}</h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KeyResultListFunction;

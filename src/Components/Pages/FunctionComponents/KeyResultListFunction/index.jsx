import "./index.css";
import React, { useState, useEffect } from "react";
import { checkKey, unCheckKey } from "../../../../Services/keyService";
import { checkObjective } from "../../../../Services/objectiveService";
import ProgressChart from "../../../../Utils/ProgressChart";
import {
  getAllKeyValueByKeyId,
  getAllKeyValueByObjectiveId,
} from "../../../../Services/keyvalueService"; // Import your API function
function KeyResultListFunction({ list }) {
  const [dataVersion, setDataVersion] = useState(0);
  const [inputValues, setInputValues] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [progressData, setProgressData] = useState([]);

  const handleSubmit = (e, keyResultId) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Now you can send the input value corresponding to keyResultId to your API
    const inputValue = inputValues[keyResultId];
    if (inputValue) {
      // Get the objectiveId corresponding to the keyResultId, you'll need to adapt this part to your data structure
      const objectiveId = list.find(
        (keyResult) => keyResult.id === keyResultId
      ).objectiveId;

      handleKeyResultClick(keyResultId, objectiveId, inputValue);
    }
  };
  const fetchProgressData = async (objectiveId) => {
    try {
      const response = await getAllKeyValueByObjectiveId(objectiveId); // Use the appropriate API function
      const data = response.data; // Assuming the data is in the "data" property of the response

      return data; // This should be your progressData
    } catch (error) {
      console.error("Error fetching progress data:", error);
      return []; // Handle the error appropriately
    }
  };
  const handleKeyResultClick = async (keyResultId, objectiveId, inputValue) => {
    if (inputValue && !isSubmitted) {
      // Perform the update to the check property in the database
      await checkKey(keyResultId);

      // Update the clicked key result in the list
      setKeyResults((prevKeyResults) =>
        prevKeyResults.map((keyResult) =>
          keyResult.id === keyResultId
            ? { ...keyResult, check: true }
            : keyResult
        )
      );

      // Send the inputValue to checkObjective
      const currentDate = new Date().toISOString();
      await checkObjective(objectiveId, currentDate, inputValue, keyResultId);

      // Mark as submitted for this specific keyResult
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [keyResultId]: inputValue,
      }));
    }
  };

  useEffect(() => {
    const fetchDataForAllKeyResults = async () => {
      const promises = keyResults.map(async (keyResult) => {
        const objectiveId = keyResult.objectiveId;
        const keyId = keyResult.id;
        try {
          const data = await fetchProgressData(objectiveId);
          const currentDate = new Date().toISOString().substring(0, 10);
          if (currentDate != keyResult.day) {
            await unCheckKey(keyId);
          }

          return { keyResultId: keyResult.id, data };
        } catch (error) {
          console.error(
            `Error fetching progress data for keyId ${keyResult.id}:`,
            error
          );
          return { keyResultId: keyResult.id, data: [] }; // Handle the error appropriately
        }
      });

      // Wait for all promises to resolve
      const progressDataArray = await Promise.all(promises);
      console.log(progressDataArray[0].data, "test");

      setProgressData(progressDataArray[0].data);
    };

    fetchDataForAllKeyResults();
    // Increment the data version whenever the key results list changes
    setDataVersion((prevVersion) => prevVersion + 1);
  }, [list]);

  const [keyResults, setKeyResults] = useState(list);

  /*  const progressDataTest = [
    { id: 1, value: 10, day: new Date("2023-06-01") },
    { id: 2, value: 15, day: new Date("2023-06-02") },
    { id: 3, value: 25, day: new Date("2023-06-03") },
    { id: 4, value: 30, day: new Date("2023-06-04") },
    { id: 5, value: 45, day: new Date("2023-06-05") },
    { id: 6, value: 60, day: new Date("2023-06-06") },
  ];*/

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
                  handleKeyResultClick(
                    keyResult.id,
                    keyResult.objectiveId,
                    inputValues[keyResult.id]
                  )
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
                      <br></br>please complete the Key Result{" "}
                    </small>
                  </p>
                )}
                <form onSubmit={(e) => handleSubmit(e, keyResult.id)}>
                  <label>
                    <input
                      key={keyResult.id}
                      className="input-add-value"
                      type="text"
                      placeholder={keyResult.value}
                      value={inputValues[keyResult.id] || ""}
                      onChange={(e) =>
                        setInputValues({
                          ...inputValues,
                          [keyResult.id]: e.target.value,
                        })
                      }
                      disabled={isSubmitted} // Disable input after submission
                    />
                  </label>
                  {keyResult.check ? null : (
                    <button
                      className="add-value-button"
                      type="submit"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Submit
                    </button>
                  )}
                </form>
                {isSubmitted && (
                  <div>
                    <p>Submitted Value: {inputValues[keyResult.id]}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="chart-custom-li">
        {progressData ? (
          <ProgressChart progressData={progressData} />
        ) : (
          <p>Loading progress data...</p>
        )}
      </div>
    </div>
  );
}

export default KeyResultListFunction;

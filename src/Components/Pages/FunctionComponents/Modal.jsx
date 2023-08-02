import { useState } from "react";
import KeysModal from "./KeysModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MeasurementModal from "./MeasurementModal";

const Modal = ({ setNextSection }) => {
  const [stage, setStage] = useState(false);
  const [addKey, setAddKey] = useState([]);
  const [addMeasurement, setAddMeasurement] = useState([]);
  const ocultarModal = () => {
    setNextSection(false);
  };
  const nextStep = () => {};
  const handleSubmit = (e) => {
    const info = [
      {
        addKey,
        addMeasurement,
      },
    ];
  };

  return (
    <div className=" modal">
      <form onSubmit={handleSubmit}>
        <div className="arrow-icon ">
          <ArrowBackIcon onClick={ocultarModal}></ArrowBackIcon>
        </div>
        {!stage ? (
          <KeysModal setStage={setStage} setAddKey={setAddKey}></KeysModal>
        ) : (
          <MeasurementModal
            setAddMeasurement={setAddMeasurement}
          ></MeasurementModal>
        )}

        {/*  <input className="rounded-full bg-white text-black" type="submit" value={"Add Key"} ></input>*/}
      </form>
    </div>
  );
};

export default Modal;

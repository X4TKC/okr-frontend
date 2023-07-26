import { useState } from "react";


const MeasurementModal = ({setAddMeasurement}) => {
    //const [addMeasurement, setAddMeasurement] = useState([]);
  //  const handleSubmit = (e) => {
      
       
   //   };

    return (

        <div className='key-modal'>
        <h2 className="text-4xl text-center font-bold p-20">Add Measurements</h2>
       
            <div className='flex flex-col p-10  place-self-center space-y-10 '>
                <div className="campo ">
                    <input
                        className='text-center rounded-full '
                        type="text"
                        //value={addMeasurement}
                        onChange={(e) => setAddMeasurement(e.target.value)}
                        placeholder='Measurement name'
                        />
                
                </div>
                <div className="campo">
                    <input
                        className='text-center rounded-full '
                        placeholder='...'
                        type="text"
                      //  value={artistName}
                       // onChange={(e) => setArtistName(e.target.value)}
                        />
                </div>

                <input type="submit" value={"Add Key"} ></input>
            </div>
       
    </div>
    
    );
}
export default MeasurementModal;
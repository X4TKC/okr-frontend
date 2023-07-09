import { useState } from "react";


const KeysModal = ({setStage, setAddKey}) => {
    //const [addKey, setAddKey]=useState([])

     const nextPage = () => {
        setStage(true);
     }
    return (

        <div className='key-modal'>
        <h2 className="text-4xl text-center font-bold p-20">Add Keys</h2>
     
            <div className='flex flex-col p-10  place-self-center space-y-10 '>
                <div className="campo ">
                    <input
                        className='text-center rounded-full '
                        type="text"
                      //  value={addKey}
                        onChange={(e) => setAddKey(e.target.value)}
                        placeholder='Key name'
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
               <button onClick={()=> {nextPage(); console.log("sjsj")}}>Next</button>
              {/*  <input className="rounded-full bg-white text-black" type="submit" value={"Add Key"} ></input>*/}
            </div>
        
    </div>
    
    );
}
export default KeysModal;
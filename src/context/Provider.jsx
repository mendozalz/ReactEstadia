import { useState } from "react";
import Contexto from "./Contexto";


const Provider=({children})=>{
    const [misDatos, setMisDatos]=useState([]);
    const [step, setStep] = useState(0);
    return(
        <Contexto.Provider value={{step, setStep, misDatos, setMisDatos}}>
        {children}
    </Contexto.Provider>
    )
}
export default Provider;
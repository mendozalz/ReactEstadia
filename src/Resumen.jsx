import React, { useContext } from 'react'
import Contexto from './context/Contexto'

const Resumen = () => {
    const campos =["Imagen", "Zona", "$COP por día", "Nombre", "Habitaciones", "Personas", "Días"];

    const {misDatos} = useContext(Contexto)
  return (
    <div className='contenedor grid grid-cols-1 md:w-[50%] m-auto'>
    <h1 className='text-2xl my-4'>Resumen:</h1>
    {
        campos.map((campo, index)=>{
            return(
                misDatos[index] &&
                <div className={`orden ${campo} flow-root rounded-lg border border-gray-100 py-3 shadow-sm my-2`} key={index}>
                {index===0
                ?
                <img src={misDatos[0]} alt="sitio a visitar" />
                :
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 p-3  sm:gap-4">
                    <dt className="font-medium text-gray-900">{campo}:</dt>
                    <dd className="text-gray-700 sm:col-span-2">{(misDatos[index]).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</dd>
                </div>
                </dl>
        }
                </div>
            )
        })
    }
    {
        misDatos[3] &&
        <div className="mt-8">
        <dl className="grid grid-cols-1 gap-4 w-full md:w-96">
          <div className="flex flex-col rounded-lg bg-blue-100 px-2 py-4 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Total a pagar
            </dt>
  
            <dd className="text-4xl font-extrabold text-blue-600">
              {(Number(misDatos[2] || 1) * Number(misDatos[4] || 1) * Number(misDatos[5] || 1) * Number(misDatos[6] || 1))
      .toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
            </dd>
          </div>
  
        </dl>
      </div>
    }
    </div>
  )
}

export default Resumen
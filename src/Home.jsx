import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { datos } from "./utils/data";
import { preguntas } from "./utils/preguntas";
import Contexto from './context/Contexto';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const {step, setStep, misDatos} = useContext(Contexto);
  const navegacion = useNavigate()
  const obtener =(data)=>{
    const zonas = data.valor;
    const buscarZona = datos.find(z=>z.lugar===zonas)
    misDatos.push(buscarZona.imagen);
    misDatos.push(buscarZona.lugar);
    misDatos.push(buscarZona.precio);
    console.table(misDatos)
    setStep(step+3)
    navegacion("/form")
  }
  return (
    <>
    <form onSubmit={handleSubmit(obtener)}>
    <nav className='m-auto flex flex-col justify-center items-center'>
      <div>
        <span className='text-center text-3xl'>{preguntas[step].texto}</span>
            <input  className="ml-2 inline-block rounded border border-indigo-600 bg-indigo-600 px-10 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" type="submit" value="Enviar" />
      </div>
    {errors.valor?.type==="required" && <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
  <strong className="block font-medium text-red-800"> Selecciona una Zona a Visitar </strong>
</div>}
    </nav>
      <fieldset className="grid md:grid-cols-2 gap-10 w-[60%] m-auto justify-center mt-8">
  {
    datos.map(dato=>{
      return(
        <div className='w-[350px]' key={dato.lugar}>
    <input
      type="radio"
      name="lugar"
      value={dato.lugar}
      id={dato.lugar}
      className="peer hidden [&:checked_+_label_svg]:block"
      {...register("valor", {required:true}) }
    />
    <label
      htmlFor={dato.lugar}
      className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-700">{dato.lugar}</p>

        <svg
          className="hidden h-5 w-5 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <p className="mt-1 text-gray-900">Precio a pagar: COP$ {(dato.precio).toLocaleString('es-CO', {style:'currency', currency: 'COP'})}</p>
    <img className='w-full rounded-md' src={dato.imagen} alt={dato.lugar} />
    </label>
  </div>
      )
    })
  }
</fieldset>
    </form>
    </>
  )
}

export default Home
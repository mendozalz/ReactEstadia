import React, { useContext } from "react";
import Contexto from "./context/Contexto";
import { preguntas } from "./utils/preguntas";
import { useForm } from "react-hook-form";
import Resumen from "./Resumen";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const { step, setStep, misDatos, setMisDatos } = useContext(Contexto);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
    watch,
  } = useForm();
  const obtener = (data) => {
    misDatos[step] = data.valor;
    setStep(step + 1);
    setFocus("valor");
    reset();
  };
  const imprimir = () => {
    window.print();
  };
  const volver = () => {
    setStep(0);
    setMisDatos([]);
    navigate("/");
  };

  return (
    <>
      {step > 6 ? (
        <div className="btn-imprimir flex justify-center gap-2">
          <button
            type="button"
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            href="/download"
            onClick={volver}
          >
            Volver al Inicio
          </button>

          <button
            typ="button"
            className="inline-block rounded border border-indigo-600 px-6 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
            href="/download"
            onClick={imprimir}
          >
            Imprimir pedido
          </button>
        </div>
      ) : (
        <form className="md:w-[50%] m-auto" onSubmit={handleSubmit(obtener)}>
          <label className="block text-lg font-medium text-gray-700">
            {preguntas[step].texto}
          </label>

          <input
            type={preguntas[step].tipo}
            id="valor"
            placeholder={preguntas[step].texto}
            className="mb-2 mt-1 w-full rounded-md border-gray-200 p-2 shadow-sm sm:text-sm"
            autoFocus
            autoComplete="off"
            {...register("valor", {
              required: true,
              min: preguntas[step].minimo,
              max: preguntas[step].maximo,
            })}
          />
          {watch("valor") && (
            <span className="my-2 inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
              <p className="whitespace-nowrap text-sm font-medium">
                {watch("valor")}
              </p>
              <span className="ml-2 text-sm">{preguntas[step].sufijo}</span>
            </span>
          )}
          {errors.valor?.type === "required" && (
            <div
              role="alert"
              className="rounded border-s-4 border-red-500 bg-red-50 p-4"
            >
              <strong className="block font-medium text-red-800">
                {" "}
                Este campo es obligatorio{" "}
              </strong>
            </div>
          )}
          {errors.valor?.type === "min" && (
            <div
              role="alert"
              className="rounded border-s-4 border-red-500 bg-red-50 p-4"
            >
              <strong className="block font-medium text-red-800">
                {" "}
                El valor minimo a seleccionar es {preguntas[step].minimo}{" "}
              </strong>
            </div>
          )}
          {errors.valor?.type === "max" && (
            <div
              role="alert"
              className="rounded border-s-4 border-red-500 bg-red-50 p-4"
            >
              <strong className="block font-medium text-red-800">
                {" "}
                El valor maximo a seleccionar es {preguntas[step].maximo}{" "}
              </strong>
            </div>
          )}

          <input
            className="ml-2 inline-block rounded border border-indigo-600 bg-indigo-600 px-10 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            type="submit"
            value="Enviar"
          />
        </form>
      )}
      <Resumen />
    </>
  );
};

export default Form;

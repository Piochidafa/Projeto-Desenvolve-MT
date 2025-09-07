import { useState, useEffect } from "react";
import Detalhes from "../pages/Detalhes";
import EnviarInformacoes from "../pages/EnviarInformacoes";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import MaisInformacoes from "../pages/MaisInformacoes";


export default function ModalTabs() {
  const { id } = useParams();
  const [abaAtiva, setAbaAtiva] = useState<"detalhes" | "informacoes" | "MaisInformacoes">("detalhes");


  return (
    <div className="bg-white dark:bg-gray-900 rounded shadow-lg max-w-4xl w-full p-4">
      <div className="flex justify-between border-b mb-4">
        <button
          onClick={() => setAbaAtiva("detalhes")}
          className={`px-4 py-2 ${
            abaAtiva === "detalhes"
              ? "border-b-2 border-blue-500 dark:border-amber-300 font-bold dark:text-white"
              : "text-gray-500"
          }`}
        >
          Detalhes
        </button>

        
        <button
          onClick={() => setAbaAtiva("MaisInformacoes")}
          // disabled={!vivo}
          className={`px-4 py-2 ${
            abaAtiva === "MaisInformacoes"
              ? "border-b-2 border-blue-500 dark:border-amber-300 font-bold dark:text-white"
              : "text-gray-500"
          }
           
        
          `}
        >
          Mais Informações
        </button>
        
        
        <button
          onClick={() => setAbaAtiva("informacoes")}
          // disabled={!vivo}
          className={`px-4 py-2 ${
            abaAtiva === "informacoes"
              ? "border-b-2 border-blue-500 dark:border-amber-300 font-bold dark:text-white"
              : "text-gray-500"
          }
           
        
          `}
        >
          Enviar Informações
        </button>


      </div>

      <div>
        {abaAtiva === "detalhes" && <Detalhes />}
        {abaAtiva === "informacoes" && 
        id 
        // && vivo 
        && <EnviarInformacoes />}
        {abaAtiva === "MaisInformacoes" && 
        id 
        // && vivo 
        && <MaisInformacoes />}
      </div>
    </div>
  );
}

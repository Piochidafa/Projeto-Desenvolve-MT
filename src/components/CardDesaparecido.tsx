import { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import ImagemComFallback from "./ImagemComFallBack";
import { buscarDetalhesPessoa } from "../services/api"

interface Props {
  id: number;
  nome: string;
  foto: string;
  situacao: string;
  dataDesaparecimento: string;
  paginaAtual: number;
  situacaoAtualVivoMorto: boolean
}

export default function CardDesaparecido({
  id,
  nome,
  foto,
  situacao,
  dataDesaparecimento,
  paginaAtual,
  situacaoAtualVivoMorto
}: Props) {
  const location = useLocation(); 

  useEffect(() => {
    if (id) {
        buscarDetalhesPessoa(id)
            .then((res) => {
                // setOcoId(res.data?.ultimaOcorrencia?.ocoId ?? null);
            })
            .catch((err) => {
                console.error("Erro ao buscar dados:", err);
            });
    }
}, [id]);

  return (
    <Link
      to={`/detalhes/${id}`}
      state={{ backgroundLocation: location, paginaAtual }}
    >
      
      <div className="bg-white gap-2 h-full rounded-md shadow-lg p-3 flex flex-col items-center border border-gray-200 hover:shadow-2xl transition">
        

          <span
            className={`inline-block mt-1 px-3x py-2 p-2 text-md font-bold rounded-md ${
              situacao === "DESAPARECIDO"
                ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-white"
                : "bg-green-200 text-green-800 dark:bg-green-800 dark:text-white"
            }`}
          >
            {situacao} 
          </span>

        <ImagemComFallback

          src={foto}
          alt={nome}
          destaqueStatus={situacaoAtualVivoMorto == true ? 'Vivo' : "Morto"}
          className="w-64 h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Conteúdo */}
        <div className="mt-3 text-center">
          <h2 className="text-lg font-bold text-primary">{nome}</h2>
          <p className="text-sm text-gray-500">
            Desaparecido desde:{" "}
            {new Date(dataDesaparecimento).toLocaleDateString("pt-BR")}
          </p>
          {/* Botão */}
          <button className="mt-2 px-4 py-2 bg-accent rounded hover:bg-secondary transition">
            Ver detalhes
          </button>
        </div>
      </div>
    </Link>
  );
}

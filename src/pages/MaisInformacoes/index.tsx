import { useEffect, useState } from "react";
import { buscarDetalhesPessoa, buscarInformacoesDesaparecido } from "../../services/api";
import { useParams } from "react-router-dom";
import { PessoaDesaparecida } from "../../Interfaces/PessoaDesaparecida";
import { InfoEnviada } from "../../Interfaces/InfoEnviada";
import { DetalhesPessoa } from "../../Interfaces/IdetalhesPessoa";
import { use } from "framer-motion/m";




export default function MaisInformacoes(){


    const { id } = useParams();
    const [informacoes, setInformacoes] = useState<InfoEnviada[]>([]);
    const [pessoa, setPessoa] = useState<DetalhesPessoa>();
    const [erro, setErro] = useState<string | null>(null);
    const [pagina, setPagina] = useState(1);
    const itensPorPagina = 7;

    const [err, setErr] = useState<string>("Carregando informações do desaparecido....")

    const totalPaginas = Math.ceil(informacoes.length / itensPorPagina);
    const informacoesPaginadas = informacoes.slice(
      (pagina - 1) * itensPorPagina,
      pagina * itensPorPagina
    );



    const carregarInformacoesEnviadas = async () => {
        try {
          const res = await buscarInformacoesDesaparecido(pessoa?.ultimaOcorrencia.ocoId!);
            console.log(res);
            
            if (informacoes.length === 0) {
              setErr("Desaparecido nao possui mais informações.")
            }
          setInformacoes(res.data);
        //   setMostrarInfos(true);
        } catch (err) {
          console.error("Erro ao carregar informações enviadas:", err);
        }
        
    };
    
    useEffect(() => {
        if (pessoa) {
            carregarInformacoesEnviadas()
        }
    },[pessoa])


        useEffect(() => {
        const carregarDetalhes = async () => {
          try {
            const res = await buscarDetalhesPessoa(id!);
            if (!res.data || !res.data.id) {
              setErro("Pessoa não encontrada.");
            } else {
              setPessoa(res.data);
              setErro(null);
            }
          } catch (err) {
            console.error("Erro ao buscar pessoa:", err);
            setErro("Ocorreu um erro ao carregar os dados.");
          }
        };
    
        if (id) carregarDetalhes();
      }, [id]);
        

    return (
        <div className="flex flex-col justify-between w-full max-w-5xl mx-auto p-3 min-h-[80vh] items-center">
        
            {(!pessoa || informacoes.length === 0) ? (
                <>
                <h1></h1>
                <h1 className="text-xl">{err}</h1>
                </>
            ) : (
                <div className="w-full  max-h-[80vh] overflow-y-auto">
                {informacoesPaginadas.map((item, idx) => (
                <div key={idx} className="mb-4 p-3 border-b border-black-200"> 
                <div>
                    <div className="flex flex-col items-start">
                        <h1 className=""><strong>Informação: </strong>{item.informacao}</h1>
                        <p className="text-sm text-gray-600">Data: {item.data}</p>
                        <h1 className=""><strong>Imagens: </strong></h1>
                    </div>

                    <div className="flex gap-3">
                    {item.anexos[0] &&
                      <>
                      {item.anexos.map(src => {
                          return(
                              
                              
                              <a href={src} className="w-24 h-24" >
                                <img className="w-lg h-24" src={`${src}`}></img>
                              </a>
                            )
                        })
                    }
                    </>
                }
                </div>
                {/* </div> */}
                </div>
                </div>
                ))}
                </div>
                
            )}
    
    
        <div className="flex gap-4  bg-white/90 p-1">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
        </div>
    );

}
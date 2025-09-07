import { Link } from "react-router-dom";
import TopoInstitucional from "./TopoInstitucional";
import RodapeInstitucional from "./RodapeInstitucional";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-primary">
      {/* Topo */}
      <TopoInstitucional />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      {/* Rodapé */}
      <RodapeInstitucional />
    </div>
  );
}

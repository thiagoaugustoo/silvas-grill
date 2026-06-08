import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase'; // A conexão que criamos antes

export default function Services() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // Esta função busca os dados no Supabase toda vez que a página é aberta
    const carregarEventos = async () => {
      const { data, error } = await supabase
        .from('eventos') // Nome da sua tabela no Supabase
        .select('*');
      
      if (data) {
        setEventos(data);
      }
    };

    carregarEventos();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">Serviços Realizados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventos.map((evento) => (
            <div key={evento.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <img src={evento.imagem_url} alt={evento.titulo} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold mb-2">{evento.titulo}</h3>
              <p className="text-gray-600">{evento.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

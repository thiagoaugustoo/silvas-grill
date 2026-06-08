import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export default function Services() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const carregarEventos = async () => {
      const { data } = await supabase
        .from('eventos')
        .select('*')
        .order('created_at', { ascending: false }); // Puxa os mais recentes primeiro
      
      if (data) setEventos(data);
    };

    carregarEventos();
  }, []);

  return (
    <section id='servicos' className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">Últimos Eventos Realizados</h2>
        
        {eventos.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum evento publicado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos.map((evento) => (
              <div key={evento.id} className="bg-gray-50 rounded-lg shadow-sm border border-gray-100 overflow-hidden transform transition duration-300 hover:scale-105">
                <img 
                  src={evento.imagem_url} 
                  alt={evento.titulo} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{evento.titulo}</h3>
                  <p className="text-gray-600 leading-relaxed">{evento.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
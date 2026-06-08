import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export default function Testimonials() {
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    const carregarDepoimentos = async () => {
      const { data } = await supabase
        .from('depoimentos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setDepoimentos(data);
    };

    carregarDepoimentos();
  }, []);

  // Se não tiver nenhum depoimento no painel, ele esconde essa seção para não ficar um buraco em branco
  if (depoimentos.length === 0) return null;

  return (
    <section id='depoimentos' className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">O Que Nossos Clientes Dizem</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {depoimentos.map((depoimento) => (
            <div key={depoimento.id} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-600 italic mb-4">"{depoimento.texto}"</p>
              <div className="flex items-center mt-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xl mr-3">
                  {depoimento.nome.charAt(0)}
                </div>
                <span className="font-bold text-gray-800">{depoimento.nome}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
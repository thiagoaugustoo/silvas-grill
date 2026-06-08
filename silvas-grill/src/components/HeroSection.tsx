import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export default function HeroSection() {
  const [fundoUrl, setFundoUrl] = useState('');

  useEffect(() => {
    const carregarConfig = async () => {
      const { data } = await supabase.from('configuracoes').select('*').eq('id', 1).single();
      if (data) setFundoUrl(data.hero_imagem);
    };

    carregarConfig();
  }, []);

  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat h-[80vh] flex items-center justify-center transition-all duration-500"
      style={{ backgroundImage: `url('${fundoUrl}')` }}
    >
      {/* Camada escura sobre a imagem para dar contraste no texto */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Conteúdo Central */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          A Experiência do Verdadeiro Churrasco no Seu Evento
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-10 drop-shadow-md">
          Qualidade, sabor inesquecível e pontualidade. Nós cuidamos da grelha, você curte a festa.
        </p>
        <a 
          href="#orcamento"
          className="inline-block bg-orange-600 text-white font-bold text-lg py-4 px-8 rounded-md hover:bg-orange-700 hover:scale-105 transition duration-300 shadow-lg"
        >
          Solicitar Meu Orçamento
        </a>
      </div>
    </section>
  );
}
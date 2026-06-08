import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export default function HeroSection() {
  const [fundoUrl, setFundoUrl] = useState('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  const [posicao, setPosicao] = useState('center'); // Posição padrão centralizada

  useEffect(() => {
    const carregarConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('configuracoes')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (!error && data) {
          if (data.hero_imagem) setFundoUrl(data.hero_imagem);
          if (data.hero_posicao) setPosicao(data.hero_posicao); // Puxa a posição do banco
        }
      } catch (err) {
        console.error("Erro inesperado:", err);
      }
    };

    carregarConfig();
  }, []);

  return (
    <section 
      className="relative bg-cover bg-no-repeat h-[80vh] flex items-center justify-center transition-all duration-500 bg-gray-900"
      style={{ 
        backgroundImage: `url('${fundoUrl}')`,
        backgroundPosition: posicao // Aplica o enquadramento escolhido
      }}
    >
      {/* Cortina transparente do Tailwind v4 */}
      <div className="absolute inset-0 bg-black/60"></div>
      
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
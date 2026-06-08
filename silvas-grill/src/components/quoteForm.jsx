import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    nome: '',
    servico: '',
    convidados: '',
    observacoes: ''
  });

  // Estados vazios aguardando o banco de dados
  const [listaServicos, setListaServicos] = useState([]);
  const [listaConvidados, setListaConvidados] = useState([]);

  // Busca os dados reais do painel assim que a tela carrega
  useEffect(() => {
    const carregarOpcoes = async () => {
      // Puxando Serviços
      const { data: servicos } = await supabase
        .from('servicos')
        .select('*')
        .order('created_at', { ascending: true });
      if (servicos) setListaServicos(servicos);

      // Puxando Convidados
      const { data: convidados } = await supabase
        .from('convidados')
        .select('*')
        .order('created_at', { ascending: true });
      if (convidados) setListaConvidados(convidados);
    };

    carregarOpcoes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Substitua pelo número real do Silva's Grill
    const telefoneSilvasGrill = "5548000000000"; 
    const mensagem = `Olá, Silva's Grill! Meu nome é ${formData.nome}. Gostaria de um orçamento.\n\n*Serviço Desejado:* ${formData.servico}\n*Número de Convidados:* ${formData.convidados}\n*Observações:* ${formData.observacoes || 'Nenhuma'}`;
    const urlWhatsApp = `https://wa.me/${telefoneSilvasGrill}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div id='orcamento' className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Faça seu Orçamento</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Seu Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Como podemos te chamar?"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Serviço</label>
          <select
            name="servico"
            value={formData.servico}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-orange-500 focus:border-orange-500 bg-white"
          >
            <option value="">Selecione um serviço...</option>
            {listaServicos.map((item) => (
              <option key={item.id} value={item.nome}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Número de Convidados</label>
          <select
            name="convidados"
            value={formData.convidados}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-orange-500 focus:border-orange-500 bg-white"
          >
            <option value="">Selecione a quantidade...</option>
            {listaConvidados.map((item) => (
              <option key={item.id} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Observações Adicionais (Opcional)</label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows="3"
            placeholder="Alguma restrição alimentar ou detalhe importante?"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-orange-500 focus:border-orange-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-md hover:bg-orange-700 transition duration-300 mt-4"
        >
          Enviar via WhatsApp
        </button>
      </form>
    </div>
  );
}
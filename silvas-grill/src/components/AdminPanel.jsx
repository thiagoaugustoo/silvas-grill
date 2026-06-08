import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  // Estados dos módulos anteriores
  const [servicos, setServicos] = useState([]);
  const [novoServico, setNovoServico] = useState('');
  const [convidados, setConvidados] = useState([]);
  const [novoConvidado, setNovoConvidado] = useState('');
  const [depoimentos, setDepoimentos] = useState([]);
  const [novoDepoimentoNome, setNovoDepoimentoNome] = useState('');
  const [novoDepoimentoTexto, setNovoDepoimentoTexto] = useState('');
  const [eventos, setEventos] = useState([]);
  const [novoEventoTitulo, setNovoEventoTitulo] = useState('');
  const [novoEventoDescricao, setNovoEventoDescricao] = useState('');
  const [novoEventoImagem, setNovoEventoImagem] = useState('');
  // Estados da Configuração Global (Foto Principal e Ajuste Fino)
  const [heroPosicao, setHeroPosicao] = useState('');
  const [heroImagem, setHeroImagem] = useState('');
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);

  useEffect(() => {
    verificarAcesso();
    carregarDados();
  }, []);

  const verificarAcesso = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/login');
    else setCarregando(false);
  };

  const carregarDados = async () => {
    // ... (mantenha os carregamentos dos outros itens aqui) ...

    const { data: dataEventos } = await supabase.from('eventos').select('*').order('created_at', { ascending: false });
    if (dataEventos) setEventos(dataEventos);

    // LENDO A CONFIGURAÇÃO GLOBAL COM PRECISÃO
    const { data: config } = await supabase.from('configuracoes').select('*').eq('id', 1).single();
    if (config) {
      setHeroImagem(config.hero_imagem || '');
      
      // Se houver uma posição salva em porcentagem (ex: "45% 60%"), ele separa os números
      if (config.hero_posicao && config.hero_posicao.includes('%')) {
        const [x, y] = config.hero_posicao.match(/\d+/g) || [50, 50];
        setPosX(Number(x));
        setPosY(Number(y));
      } else {
        setPosX(50);
        setPosY(50);
      }
    }
  };

  const handleRemover = async (tabela, id) => {
    await supabase.from(tabela).delete().eq('id', id);
    carregarDados();
  };

  // NOVO: Função para salvar a foto principal
  const handleSalvarConfig = async (e) => {
    e.preventDefault();
    await supabase.from('configuracoes').upsert({ 
      id: 1, 
      hero_imagem: heroImagem,
      hero_posicao: heroPosicao // Salva a posição
    });
    alert('Configurações da vitrine atualizadas com sucesso!');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (carregando) return <div className="text-center mt-20">Verificando segurança...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Painel de Controle - Silva's Grill</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">Sair</button>
      </nav>
      
      <main className="p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* BLOCO: CONFIGURAÇÕES GLOBAIS */}
        <section className="bg-white p-6 rounded-lg shadow-sm md:col-span-2 border-t-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Configurações da Vitrine Principal</h2>
          
          <form onSubmit={handleSalvarConfig} className="flex flex-col gap-6">
            
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Link da Foto Principal do Site</label>
              <input type="url" value={heroImagem} onChange={(e) => setHeroImagem(e.target.value)} required placeholder="Cole a URL da imagem aqui" className="w-full rounded-md border-gray-300 shadow-sm p-3 border focus:ring-blue-500" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              
              {/* Controle Deslizante Milimétrico */}
              <div className="w-full md:w-64 flex flex-col gap-4 bg-gray-50 p-4 rounded-md border">
                <p className="block text-sm font-bold text-gray-700 text-center md:text-left">Ajuste Fino da Foto</p>

                <div>
                  <label className="flex justify-between text-xs font-medium text-gray-600 mb-2">
                    <span>↔️ Horizontal</span>
                    <span>{posX}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={posX}
                    onChange={(e) => setPosX(e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-xs font-medium text-gray-600 mb-2">
                    <span>↕️ Vertical</span>
                    <span>{posY}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={posY}
                    onChange={(e) => setPosY(e.target.value)}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              {/* Pré-visualização Instantânea */}
              {heroImagem && (
                <div className="flex-1 w-full">
                  <p className="text-sm text-gray-500 mb-2">Como o cliente verá:</p>
                  <div 
                    className="w-full h-40 rounded-md border-2 border-gray-300 bg-no-repeat bg-cover shadow-sm transition-none"
                    style={{ 
                      backgroundImage: `url('${heroImagem}')`,
                      backgroundPosition: `${posX}% ${posY}%` 
                    }}
                  ></div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t mt-2">
              <button type="submit" className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition shadow-md">
                Salvar Configurações
              </button>
            </div>

          </form>
        </section>

        {/* BLOCO: EVENTOS */}
        <section className="bg-white p-6 rounded-lg shadow-sm md:col-span-2 border-t-4 border-orange-500">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Últimos Eventos Publicados</h2>
          <form onSubmit={(e) => handleAdicionar(e, 'eventos', { titulo: novoEventoTitulo, descricao: novoEventoDescricao, imagem_url: novoEventoImagem }, () => { setNovoEventoTitulo(''); setNovoEventoDescricao(''); setNovoEventoImagem(''); })} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input type="text" value={novoEventoTitulo} onChange={(e) => setNovoEventoTitulo(e.target.value)} required placeholder="Título (Ex: Casamento)" className="rounded-md border p-2" />
            <input type="url" value={novoEventoImagem} onChange={(e) => setNovoEventoImagem(e.target.value)} required placeholder="Link da Imagem (URL)" className="rounded-md border p-2" />
            <textarea value={novoEventoDescricao} onChange={(e) => setNovoEventoDescricao(e.target.value)} required placeholder="Breve descrição..." rows="1" className="rounded-md border p-2"></textarea>
            <button type="submit" className="bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 md:col-span-3">Publicar Evento</button>
          </form>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventos.map((evt) => (
              <div key={evt.id} className="border rounded-md bg-gray-50 overflow-hidden relative">
                <button onClick={() => handleRemover('eventos', evt.id)} className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full font-bold hover:bg-red-800">X</button>
                <img src={evt.imagem_url} alt={evt.titulo} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className="font-bold text-gray-800">{evt.titulo}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOCO: TIPOS DE SERVIÇO */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tipos de Serviço</h2>
          <form onSubmit={(e) => handleAdicionar(e, 'servicos', { nome: novoServico }, () => setNovoServico(''))} className="flex gap-2 mb-4">
            <input type="text" value={novoServico} onChange={(e) => setNovoServico(e.target.value)} required placeholder="Ex: Costela" className="flex-1 rounded-md border p-2" />
            <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-md">Add</button>
          </form>
          <ul className="divide-y divide-gray-200">
            {servicos.map((s) => (
              <li key={s.id} className="py-2 flex justify-between">
                <span>{s.nome}</span>
                <button onClick={() => handleRemover('servicos', s.id)} className="text-red-500 font-bold hover:text-red-700">X</button>
              </li>
            ))}
          </ul>
        </section>

        {/* BLOCO: CONVIDADOS */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Número de Convidados</h2>
          <form onSubmit={(e) => handleAdicionar(e, 'convidados', { label: novoConvidado }, () => setNovoConvidado(''))} className="flex gap-2 mb-4">
            <input type="text" value={novoConvidado} onChange={(e) => setNovoConvidado(e.target.value)} required placeholder="Ex: De 50 a 100" className="flex-1 rounded-md border p-2" />
            <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-md">Add</button>
          </form>
          <ul className="divide-y divide-gray-200">
            {convidados.map((c) => (
              <li key={c.id} className="py-2 flex justify-between">
                <span>{c.label}</span>
                <button onClick={() => handleRemover('convidados', c.id)} className="text-red-500 font-bold hover:text-red-700">X</button>
              </li>
            ))}
          </ul>
        </section>

        {/* BLOCO: DEPOIMENTOS */}
        <section className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Depoimentos</h2>
          <form onSubmit={(e) => handleAdicionar(e, 'depoimentos', { nome: novoDepoimentoNome, texto: novoDepoimentoTexto }, () => { setNovoDepoimentoNome(''); setNovoDepoimentoTexto(''); })} className="grid grid-cols-1 gap-4 mb-6">
            <input type="text" value={novoDepoimentoNome} onChange={(e) => setNovoDepoimentoNome(e.target.value)} required placeholder="Nome do Cliente" className="w-full rounded-md border p-2" />
            <textarea value={novoDepoimentoTexto} onChange={(e) => setNovoDepoimentoTexto(e.target.value)} required placeholder="Texto..." rows="2" className="w-full rounded-md border p-2"></textarea>
            <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-md">Add Depoimento</button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {depoimentos.map((d) => (
              <div key={d.id} className="p-4 border rounded-md bg-gray-50 relative">
                <button onClick={() => handleRemover('depoimentos', d.id)} className="absolute top-2 right-2 text-red-500 font-bold hover:text-red-700">X</button>
                <p className="font-bold">{d.nome}</p>
                <p className="text-sm mt-1">"{d.texto}"</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
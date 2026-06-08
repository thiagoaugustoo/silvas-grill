export default function Footer() {
  return (
    <footer id="contatos" className="w-full bg-bg-base border-t border-gray-200 pt-16 pb-8 px-6 md:px-12 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        
        {/* Coluna 1: Marca e Sobre */}
        <div>
          <h3 className="text-2xl font-bold text-brand-copper mb-4">Silva's Grill</h3>
          <p className="text-text-dark leading-relaxed">
            A verdadeira experiência do churrasco e carreteiro no seu evento. Levamos estrutura, sabor e tranquilidade para você aproveitar a festa.
          </p>
        </div>

        {/* Coluna 2: Área de Atendimento */}
        <div>
          <h4 className="text-lg font-bold text-brand-green mb-4">Área de Atendimento</h4>
          <p className="text-text-dark leading-relaxed mb-2">
            📍 Atendemos em Palhoça, Florianópolis e região.
          </p>
          <p className="text-text-dark leading-relaxed">
            Consulte-nos para deslocamentos a outras cidades.
          </p>
        </div>

        {/* Coluna 3: Contatos Rápidos */}
        <div>
          <h4 className="text-lg font-bold text-brand-green mb-4">Fale Conosco</h4>
          <ul className="space-y-3">
            <li>
              <a href="https://wa.me/5548996486020" target="_blank" rel="noreferrer" className="text-text-dark hover:text-brand-copper transition-colors flex items-center gap-2">
                📱 WhatsApp: (48) 99648-6020
              </a>
            </li>
            <li>
              <a href="#" className="text-text-dark hover:text-brand-copper transition-colors flex items-center gap-2">
                📸 Instagram: @silvasgrill
              </a>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center border-t border-gray-200 pt-8">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Silva's Grill. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
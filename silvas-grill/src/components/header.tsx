export default function Header() {
  return (
    <header className="w-full bg-bg-base shadow-sm py-4 px-6 md:px-12 flex justify-between items-center fixed top-0 z-50">
      <div className="text-2xl font-bold text-brand-copper">
        Silva's Grill
      </div>
      
      <nav className="hidden md:flex gap-6">
        <a href="#servicos" className="text-brand-green hover:text-brand-copper font-medium transition-colors">Serviços</a>
        <a href="#depoimentos" className="text-brand-green hover:text-brand-copper font-medium transition-colors">Depoimentos</a>
        <a href="#contatos" className="text-brand-green hover:text-brand-copper font-medium transition-colors">Contatos</a>
      </nav>

      <a href="#orcamento" className="bg-brand-copper text-white px-5 py-2 rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity">
        Pedir Orçamento
      </a>
    </header>
  )
}
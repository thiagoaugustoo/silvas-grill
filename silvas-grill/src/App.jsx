import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importando os componentes
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import QuoteForm from './components/QuoteForm';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import Testimonials from './components/testimonials';
import Footer from './components/Footer';

// Componente que junta a vitrine (Página Inicial)
function Vitrine() {
  return (
    <>
      <Header />
      <HeroSection />
      <Services />
      <Testimonials />
      <div className="py-16 bg-gray-50">
        <QuoteForm />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Livre para Clientes */}
        <Route path="/" element={<Vitrine />} />
        
        {/* Rotas Restritas do Chefe */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
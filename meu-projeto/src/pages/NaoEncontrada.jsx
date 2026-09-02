import { Link } from 'react-router-dom';

export function NaoEncontrada() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '72px', color: 'var(--cor-primaria)', marginBottom: '16px' }}>404</h1>
      <h2>Página não encontrada</h2>
      <p style={{ margin: '16px 0', color: 'var(--cor-texto-secundario)' }}>
        Ops! A página que você está procurando não existe ou foi movida.
      </p>
      <Link 
        to="/" 
        style={{ 
          display: 'inline-block',
          backgroundColor: 'var(--cor-primaria)', 
          color: 'white', 
          padding: '12px 24px', 
          borderRadius: '8px', 
          textDecoration: 'none',
          fontWeight: 'bold',
          marginTop: '16px'
        }}
      >
        Voltar para a Vitrine
      </Link>
    </div>
  );
}
import './FiltroCategorias.css';

export function FiltroCategorias({ categorias, categoriaAtiva, setCategoriaAtiva }) {
  return (
    <div className="categorias-bar">
      <button
        className={`pilula ${categoriaAtiva === 'Todas' ? 'ativa' : ''}`}
        onClick={() => setCategoriaAtiva('Todas')}
      >
        Todas
      </button>

      {categorias.map((cat) => (
        <button
          key={cat}
          className={`pilula ${categoriaAtiva === cat ? 'ativa' : ''}`}
          onClick={() => setCategoriaAtiva(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
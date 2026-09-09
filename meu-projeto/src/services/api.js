const BASE_URL = 'https://dummyjson.com';

export async function listarProdutos(categoria, busca) {
  // limit=0 na DummyJSON faz a API retornar TODOS os produtos cadastrados
  let url = 'https://dummyjson.com/products?limit=0';

  // 1. Se o usuário digitou algo na busca
  if (busca && busca.trim() !== '') {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(busca)}&limit=0`;
  } 
  // 2. Se selecionou uma categoria específica (ignorando quando for "Todas" ou "all")
  else if (
    categoria && 
    categoria.toLowerCase() !== 'todas' && 
    categoria.toLowerCase() !== 'all'
  ) {
    url = `https://dummyjson.com/products/category/${encodeURIComponent(categoria)}?limit=0`;
  }

  const resposta = await fetch(url);
  
  if (!resposta.ok) {
    throw new Error('Falha ao carregar produtos');
  }

  const dados = await resposta.json();
  
  // Retorna o array de produtos (DummyJSON retorna dentro do objeto .products)
  return dados.products || dados;
}
export async function listarCategorias() {
  const response = await fetch(`${BASE_URL}/products/category-list`);
  if (!response.ok) {
    throw new Error('Não foi possível carregar as categorias');
  }
  return await response.json();
}
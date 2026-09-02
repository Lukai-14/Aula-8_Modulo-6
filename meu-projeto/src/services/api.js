const BASE_URL = 'https://dummyjson.com';

export async function listarProdutos(categoria = '', busca = '') {
  let url = `${BASE_URL}/products?limit=12`;

  if (busca) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(busca)}&limit=12`;
  } else if (categoria && categoria !== 'Todas') {
    url = `${BASE_URL}/products/category/${categoria}?limit=12`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Não foi possível carregar os produtos');
  }
  const data = await response.json();
  return data.products;
}

export async function listarCategorias() {
  const response = await fetch(`${BASE_URL}/products/category-list`);
  if (!response.ok) {
    throw new Error('Não foi possível carregar as categorias');
  }
  return await response.json();
}
import axios from 'axios';

// Création d'une instance axios avec l'URL de base de JSONPlaceholder
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// Fonction pour récupérer tous les produits (utilisant les posts comme produits)
export const fetchProducts = async () => {
  const response = await api.get('/posts');
  
  // Transformation des posts en produits avec des propriétés supplémentaires
  return response.data.map(post => ({
    id: post.id,
    title: post.title,
    description: post.body,
    price: Math.floor(Math.random() * 100) + 10, // Prix aléatoire entre 10 et 109
    category: ['Électronique', 'Vêtements', 'Alimentation', 'Livres', 'Maison'][Math.floor(Math.random() * 5)],
    rating: {
      rate: (Math.random() * 5).toFixed(1),
      count: Math.floor(Math.random() * 500) + 10
    }
  }));
};

// Fonction pour récupérer un produit par son ID
export const fetchProductById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  
  // Transformation du post en produit
  return {
    id: response.data.id,
    title: response.data.title,
    description: response.data.body,
    price: Math.floor(Math.random() * 100) + 10,
    category: ['Électronique', 'Vêtements', 'Alimentation', 'Livres', 'Maison'][Math.floor(Math.random() * 5)],
    rating: {
      rate: (Math.random() * 5).toFixed(1),
      count: Math.floor(Math.random() * 500) + 10
    }
  };
};

// Fonction pour mettre à jour un produit
export const updateProduct = async (product) => {
  const response = await api.put(`/posts/${product.id}`, {
    title: product.title,
    body: product.description,
    userId: 1
  });
  
  // Retourne le produit mis à jour
  return {
    ...product,
    title: response.data.title,
    description: response.data.body
  };
};

// Fonction pour supprimer un produit
export const deleteProduct = async (id) => {
  await api.delete(`/posts/${id}`);
  return id;
};

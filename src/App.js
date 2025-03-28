import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, updateProduct, deleteProduct } from './api';
import ProductCard from './components/ProductCard';
import EditProductForm from './components/EditProductForm';

function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();
  
  // Bug 6: Boucle infinie à cause d'un mauvais paramétrage des dépendances de useQuery
  // L'objet {} en tant que queryKey est recréé à chaque rendu, provoquant une boucle infinie
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'], // Devrait être ['products'] pour éviter la boucle infinie
    queryFn: fetchProducts,
    // Bug 2: Problème de gestion d'erreur qui provoque un plantage
    // Pas de gestion d'erreur appropriée
    onError: () => {
      
      console.error('Erreur lors de la récupération des produits:', error);
      // Mais ici, on ne fait rien, ce qui provoque un plantage
    }
  });

  // Mutation pour mettre à jour un produit
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    // Bug 4: Problème de mise à jour optimiste
    // La mise à jour optimiste est mal implémentée
    onMutate: async (updatedProduct) => {
      // Annulation des requêtes en cours
      await queryClient.cancelQueries({ queryKey: ['products'] });
      
      // Sauvegarde de l'état précédent
      const previousProducts = queryClient.getQueryData(['products']);
      
      // Mise à jour optimiste incorrecte - ne met pas à jour le cache correctement
      queryClient.setQueryData(['products'], (old) => {
        // Ici, on ne fait pas une copie profonde, ce qui peut causer des problèmes
        return old.map(p => p.id === updatedProduct.id ? updatedProduct : p)
      });
      
      return { previousProducts };
    },
    onError: (err, updatedProduct, context) => {
      // En cas d'erreur, on revient à l'état précédent
      queryClient.setQueryData(['products'], context.previousProducts);
    },
    onSettled: () => {
      // Rafraîchissement des données après la mutation
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  // Mutation pour supprimer un produit
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = (updatedProduct) => {
    updateProductMutation.mutate(updatedProduct);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    deleteProductMutation.mutate(id);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };
  if (isLoading) {
      return <div className="container loading">Chargement des produits...</div>;
  }
  // Bug 3: Erreur de rendu conditionnel pendant le chargement
 
  if (products && products.length === 0) {
    return <div className="container">Aucun produit trouvé.</div>;
  }

  if (error) {
    return <div className="container error">Erreur: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Catalogue de Produits</h1>
        <p>Découvrez notre sélection de produits de qualité</p>
      </div>
      
      {/* Bug 5: Rendu qui cause "Object is not a React child" */}
      <div className="debug-info">
        Informations de débogage: {products[0].rating.title} {/* Tente d'afficher un objet directement */}
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isEditing={editingProduct && editingProduct.id === product.id}
          >
            {editingProduct && editingProduct.id === product.id && (
              <EditProductForm
                product={editingProduct}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
          </ProductCard>
        ))}
      </div>
    </div>
  );
}

export default App;

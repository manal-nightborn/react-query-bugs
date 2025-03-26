import React from 'react';

function ProductCard({ product, onEdit, onDelete, isEditing, children }) {
  const handleEdit = () => {
    onEdit(product);
  };

  const handleDelete = () => {
    onDelete(product.id);
  };

  return (
    <div className="product-card">
      {!isEditing && (
        <>
          <h3 className="product-title">{product.title}</h3>
          <div className="product-price">{product.price} €</div>
          <p className="product-description">{product.description}</p>
          <div className="product-category">{product.category}</div>
          <div className="product-rating">
            Note: {product.rating.rate} ({product.rating.count} avis)
          </div>
          <div style={{ marginTop: '15px' }}>
            <button className="button edit-button" onClick={handleEdit}>
              Modifier
            </button>
            <button className="button delete-button" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        </>
      )}
      {children}
    </div>
  );
}

export default ProductCard;

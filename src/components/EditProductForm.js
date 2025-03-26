import React, { useState } from 'react';

function EditProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    rating: product.rating
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h3>Modifier le produit</h3>
      
      <div>
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="price">Prix (€)</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
      </div>
      
      <div>
        <label htmlFor="category">Catégorie</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>
      
      <div style={{ marginTop: '15px' }}>
        <button type="submit" className="button save-button">
          Enregistrer
        </button>
        <button type="button" className="button cancel-button" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
}

export default EditProductForm;

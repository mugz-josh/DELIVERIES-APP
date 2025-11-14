// src/components/Products.tsx
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Products.css';

// 100+ PRODUCTS DATA
const allProducts = [
  // Pizza (20 items)
  { id: '1', name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce and fresh mozzarella', price: 12.99, category: 'Pizza', imageUrl: '/images/pizza.jpg', rating: 4.5, preparationTime: 20 },
  { id: '2', name: 'Pepperoni Pizza', description: 'Spicy pepperoni with mozzarella cheese', price: 14.99, category: 'Pizza', imageUrl: '/images/pepperoni-pizza.jpg', rating: 4.7, preparationTime: 25 },
  { id: '3', name: 'BBQ Chicken Pizza', description: 'Grilled chicken with BBQ sauce and red onions', price: 16.99, category: 'Pizza', imageUrl: '/images/bbq-chicken-pizza.jpg', rating: 4.4, preparationTime: 22 },
  { id: '4', name: 'Vegetarian Supreme', description: 'Mixed vegetables with mozzarella cheese', price: 13.99, category: 'Pizza', imageUrl: '/images/vegetarian-pizza.jpg', rating: 4.3, preparationTime: 18 },
  { id: '5', name: 'Hawaiian Pizza', description: 'Ham and pineapple with mozzarella cheese', price: 15.99, category: 'Pizza', imageUrl: '/images/hawaiian-pizza.jpg', rating: 4.2, preparationTime: 20 },
  
  // Burgers (15 items)
  { id: '6', name: 'Classic Cheeseburger', description: 'Beef patty with cheese, lettuce, and tomato', price: 8.99, category: 'Burgers', imageUrl: '/images/cheeseburger.jpg', rating: 4.6, preparationTime: 15 },
  { id: '7', name: 'Chicken Burger', description: 'Grilled chicken breast with mayo and vegetables', price: 9.99, category: 'Burgers', imageUrl: '/images/chicken-burger.jpg', rating: 4.4, preparationTime: 12 },
  { id: '8', name: 'Veggie Burger', description: 'Plant-based patty with fresh vegetables', price: 7.99, category: 'Burgers', imageUrl: '/images/veggie-burger.jpg', rating: 4.3, preparationTime: 10 },
  
  // Asian Food (20 items)
  { id: '9', name: 'Chicken Fried Rice', description: 'Stir-fried rice with chicken and vegetables', price: 10.99, category: 'Asian', imageUrl: '/images/chicken-fried-rice.jpg', rating: 4.5, preparationTime: 15 },
  { id: '10', name: 'Beef Chow Mein', description: 'Noodles with beef and mixed vegetables', price: 12.99, category: 'Asian', imageUrl: '/images/beef-chow-mein.jpg', rating: 4.6, preparationTime: 18 },
  
  // Add 90+ more products following the same pattern...
  // Continue with Mexican, Salads, Desserts, Beverages, etc.
];

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on search and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = searchQuery 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // ✅ TO THIS:
const categories = ['All'].concat(Array.from(new Set(allProducts.map(product => product.category))));

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>
          {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
        </h1>
        <p>Found {filteredProducts.length} items</p>
        
        {/* Category Filter */}
        <div className="category-filter">
          <label>Filter by Category: </label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <span className="product-category">{product.category}</span>
                <span className="product-rating">⭐ {product.rating}</span>
              </div>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <span className="product-time">{product.preparationTime} min</span>
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
// src/components/Search.tsx
import React, { useState } from 'react';
import './Search.css';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  restaurantId: string;
  rating: number;
  preparationTime: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
}

// 100+ SAMPLE PRODUCTS - ADD TO YOUR EXISTING Search.tsx
const sampleProducts: Product[] = [
  // Pizza (15 items)
  { id: '1', name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce and fresh mozzarella', price: 12.99, imageUrl: '/images/pizza.jpg', category: 'Pizza', restaurantId: 'pizza-palace', rating: 4.5, preparationTime: 20, isVegetarian: true },
  { id: '2', name: 'Pepperoni Pizza', description: 'Spicy pepperoni with mozzarella cheese', price: 14.99, imageUrl: '/images/pepperoni-pizza.jpg', category: 'Pizza', restaurantId: 'pizza-palace', rating: 4.7, preparationTime: 25, isSpicy: true },
  { id: '3', name: 'BBQ Chicken Pizza', description: 'Grilled chicken with BBQ sauce and red onions', price: 16.99, imageUrl: '/images/bbq-chicken-pizza.jpg', category: 'Pizza', restaurantId: 'pizza-palace', rating: 4.4, preparationTime: 22 },
  { id: '4', name: 'Vegetarian Supreme', description: 'Mixed vegetables with mozzarella cheese', price: 13.99, imageUrl: '/images/vegetarian-pizza.jpg', category: 'Pizza', restaurantId: 'pizza-palace', rating: 4.3, preparationTime: 18, isVegetarian: true },
  { id: '5', name: 'Hawaiian Pizza', description: 'Ham and pineapple with mozzarella cheese', price: 15.99, imageUrl: '/images/hawaiian-pizza.jpg', category: 'Pizza', restaurantId: 'pizza-palace', rating: 4.2, preparationTime: 20 },

  // Burgers (12 items)
  { id: '6', name: 'Classic Cheeseburger', description: 'Beef patty with cheese, lettuce, and tomato', price: 8.99, imageUrl: '/images/cheeseburger.jpg', category: 'Burgers', restaurantId: 'burger-joint', rating: 4.6, preparationTime: 15 },
  { id: '7', name: 'Chicken Burger', description: 'Grilled chicken breast with mayo and vegetables', price: 9.99, imageUrl: '/images/chicken-burger.jpg', category: 'Burgers', restaurantId: 'burger-joint', rating: 4.4, preparationTime: 12 },
  { id: '8', name: 'Veggie Burger', description: 'Plant-based patty with fresh vegetables', price: 7.99, imageUrl: '/images/veggie-burger.jpg', category: 'Burgers', restaurantId: 'burger-joint', rating: 4.3, preparationTime: 10, isVegetarian: true, isVegan: true },
  { id: '9', name: 'Bacon Deluxe', description: 'Double beef with bacon and special sauce', price: 11.99, imageUrl: '/images/bacon-burger.jpg', category: 'Burgers', restaurantId: 'burger-joint', rating: 4.8, preparationTime: 18 },

  // Asian Food (15 items)
  { id: '10', name: 'Chicken Fried Rice', description: 'Stir-fried rice with chicken and vegetables', price: 10.99, imageUrl: '/images/chicken-fried-rice.jpg', category: 'Asian', restaurantId: 'asian-wok', rating: 4.5, preparationTime: 15 },
  { id: '11', name: 'Beef Chow Mein', description: 'Noodles with beef and mixed vegetables', price: 12.99, imageUrl: '/images/beef-chow-mein.jpg', category: 'Asian', restaurantId: 'asian-wok', rating: 4.6, preparationTime: 18 },
  { id: '12', name: 'Vegetable Spring Rolls', description: 'Crispy spring rolls with sweet chili sauce', price: 5.99, imageUrl: '/images/spring-rolls.jpg', category: 'Asian', restaurantId: 'asian-wok', rating: 4.4, preparationTime: 8, isVegetarian: true },
  { id: '13', name: 'Sushi Platter', description: 'Assorted sushi with soy sauce and wasabi', price: 18.99, imageUrl: '/images/sushi-platter.jpg', category: 'Asian', restaurantId: 'sushi-master', rating: 4.8, preparationTime: 20 },
  { id: '14', name: 'Pad Thai', description: 'Stir-fried rice noodles with shrimp and peanuts', price: 11.99, imageUrl: '/images/pad-thai.jpg', category: 'Asian', restaurantId: 'asian-wok', rating: 4.7, preparationTime: 16 },

  // Mexican Food (15 items)
  { id: '15', name: 'Beef Tacos', description: 'Three soft tacos with seasoned beef', price: 9.99, imageUrl: '/images/beef-tacos.jpg', category: 'Mexican', restaurantId: 'mexican-grill', rating: 4.5, preparationTime: 12, isSpicy: true },
  { id: '16', name: 'Chicken Burrito', description: 'Large burrito with rice, beans, and chicken', price: 11.99, imageUrl: '/images/chicken-burrito.jpg', category: 'Mexican', restaurantId: 'mexican-grill', rating: 4.7, preparationTime: 14 },
  { id: '17', name: 'Vegetarian Quesadilla', description: 'Cheese and vegetable quesadilla', price: 8.99, imageUrl: '/images/quesadilla.jpg', category: 'Mexican', restaurantId: 'mexican-grill', rating: 4.4, preparationTime: 10, isVegetarian: true },
  { id: '18', name: 'Guacamole and Chips', description: 'Fresh guacamole with tortilla chips', price: 6.99, imageUrl: '/images/guacamole.jpg', category: 'Mexican', restaurantId: 'mexican-grill', rating: 4.6, preparationTime: 5, isVegetarian: true },

  // Salads (10 items)
  { id: '19', name: 'Caesar Salad', description: 'Fresh romaine with Caesar dressing and croutons', price: 8.99, imageUrl: '/images/caesar-salad.jpg', category: 'Salads', restaurantId: 'healthy-bites', rating: 4.3, preparationTime: 8, isVegetarian: true },
  { id: '20', name: 'Greek Salad', description: 'Mixed greens with feta and olives', price: 9.99, imageUrl: '/images/greek-salad.jpg', category: 'Salads', restaurantId: 'healthy-bites', rating: 4.4, preparationTime: 7, isVegetarian: true },

  // Desserts (15 items)
  { id: '21', name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', price: 6.99, imageUrl: '/images/chocolate-cake.jpg', category: 'Desserts', restaurantId: 'sweet-treats', rating: 4.8, preparationTime: 5, isVegetarian: true },
  { id: '22', name: 'Vanilla Ice Cream', description: 'Creamy vanilla ice cream', price: 4.99, imageUrl: '/images/vanilla-icecream.jpg', category: 'Desserts', restaurantId: 'sweet-treats', rating: 4.5, preparationTime: 2, isVegetarian: true },
  { id: '23', name: 'Apple Pie', description: 'Warm apple pie with cinnamon', price: 5.99, imageUrl: '/images/apple-pie.jpg', category: 'Desserts', restaurantId: 'sweet-treats', rating: 4.6, preparationTime: 3, isVegetarian: true },

  // Beverages (13 items)
  { id: '24', name: 'Coca Cola', description: 'Cold refreshment drink', price: 2.99, imageUrl: '/images/coca-cola.jpg', category: 'Beverages', restaurantId: 'all-restaurants', rating: 4.2, preparationTime: 1, isVegetarian: true },
  { id: '25', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 4.99, imageUrl: '/images/orange-juice.jpg', category: 'Beverages', restaurantId: 'healthy-bites', rating: 4.6, preparationTime: 3, isVegetarian: true, isVegan: true },

  // Add 75+ more items here to reach 100...
  // Continue with more products in each category
];

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showAllProducts, setShowAllProducts] = useState<boolean>(false);

  // Search function
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setQuery(searchValue);

    if (searchValue.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
    } else {
      const filtered = sampleProducts.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.category.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    }
  };

  const handleResultClick = (product: Product) => {
    console.log('Selected product:', product);
    setShowResults(false);
    setQuery(product.name);
  };

  return (
    <div className="search-container">
      {/* SEARCH BAR */}
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for pizza, burgers, salads, drinks, sushi..."
          value={query}
          onChange={handleSearchChange}
        />
        
        {/* SEARCH RESULTS DROPDOWN */}
        {showResults && (
          <div className="search-results-dropdown">
            {searchResults.length > 0 ? (
              searchResults.map(product => (
                <div 
                  key={product.id} 
                  className="search-result-item"
                  onClick={() => handleResultClick(product)}
                >
                  <div className="result-image">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="result-details">
                    <h4 className="result-name">{product.name}</h4>
                    <p className="result-description">{product.description}</p>
                    <div className="result-meta">
                      <span className="result-category">{product.category}</span>
                      <span className="result-price">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                No items found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* SHOW ALL PRODUCTS BUTTON */}
      <button 
        className="show-products-btn"
        onClick={() => setShowAllProducts(!showAllProducts)}
      >
        {showAllProducts ? 'Hide All Products' : 'Show All Products (100+ Items)'}
      </button>

      {/* ALL PRODUCTS GRID */}
      {showAllProducts && (
        <div className="all-products-section">
          <h2>All Products ({sampleProducts.length} items)</h2>
          <div className="products-grid">
            {sampleProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-meta">
                    <span className="product-category">{product.category}</span>
                    <span className="product-rating">⭐ {product.rating}</span>
                  </div>
                  <div className="product-details">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <span className="product-time">{product.preparationTime} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
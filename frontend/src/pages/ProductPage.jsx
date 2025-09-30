import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import styles from '../styles/ProductPage.module.css';
import { useParams } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const {categoryName} = useParams()
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price-low-to-high');
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/foodItem/category/${categoryName}`,{
          headers:{
            Authorization : `Bearer ${token}`
          }
        }); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally{
        setLoading(false)
      }
    };
    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    let newFilteredProducts = [...products];

    if (searchQuery) {
      newFilteredProducts = newFilteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === 'price-low-to-high') {
      newFilteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-to-low') {
      newFilteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(newFilteredProducts);
  }, [products, searchQuery, sortBy]);

  return (
    <div className={styles.productsPage}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder='Search here'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="price-low-to-high">Sort by Price: Low to High</option>
          <option value="price-high-to-low">Sort by Price: High to Low</option>
        </select>
      </div>

      <div className={styles.productsContainer}>
        {loading ? (
              <div className={styles.spinnerWrapper}>
                <div className={styles.spinner}></div>
              </div>
        ) : (
          <>
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
          {filteredProducts.length === 0 && <p className={styles.noProducts}>No products found.</p>}
          </>
        )}
     
      </div>
    </div>
  );
};

export default ProductsPage;
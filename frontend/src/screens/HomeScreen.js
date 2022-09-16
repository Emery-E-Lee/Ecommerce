// import data from '../data';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useReducer } from 'react';
import { Container } from '@mui/material';
import HomeHero from '../components/HomeHero';
import Product from '../components/Product';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state; // 현재 상태를 반환
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <HomeHero />
      <Container maxWidth="xl">
        {/* 추천 음료 리스트 */}
        <div className="products">
          {loading ? (
            <div>Loading</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            products.map((product) => (
              <Product key={product.slug} product={product}></Product>
            ))
          )}
        </div>
      </Container>
    </React.Fragment>
  );
}

export default HomeScreen;

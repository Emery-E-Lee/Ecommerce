// import data from '../data';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <section>
      <h1>추천 음료</h1>
      {/* 추천 음료 리스트 */}
      <div className="products">
        {products.map((beverage) => (
          <div key={beverage.slug} className="product">
            <Link to={`/product/${beverage.slug}`}>
              <img src={beverage.image} alt={beverage.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${beverage.slug}`}>
                <p>{beverage.name}</p>
              </Link>
              <p>
                <strong>₩{beverage.price}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeScreen;

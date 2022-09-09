import data from '../data';
import { Link } from 'react-router-dom';

function HomeScreen() {
  return (
    <section>
      <h1>추천 음료</h1>
      {/* 추천 음료 리스트 */}
      <div className="products">
        {data.products.map((beverage) => (
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

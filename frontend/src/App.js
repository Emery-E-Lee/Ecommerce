import data from './data';

function App() {
  return (
    <div>
      {/* 헤더 */}
      <header>
        <a href="/">StarBucks Machine</a>
      </header>
      {/* 메인 페이지 */}
      <main>
        <h1>추천 음료</h1>
        {/* 추천 음료 리스트 */}
        <div className="products">
          {data.products.map((beverage) => (
            <div key={beverage.slug} className="product">
              <a href={`/product/${beverage.slug}`}>
                <img src={beverage.image} alt={beverage.name} />
              </a>
              <div className="product-info">
                <a href={`/product/${beverage.slug}`}>
                  <p>{beverage.name}</p>
                </a>
                <p>
                  <strong>${beverage.price}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

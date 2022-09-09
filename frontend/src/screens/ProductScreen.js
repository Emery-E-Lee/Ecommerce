import { useParams } from 'react-router-dom';

function ProductScreen() {
  //   useParams 이용, 파라미터 가져오기
  const params = useParams();
  const { slug } = params;

  return <div>{slug}</div>;
}

export default ProductScreen;

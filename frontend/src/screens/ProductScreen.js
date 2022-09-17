import axios from 'axios';
import React, { useEffect, useReducer, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Card, CardMedia, Button } from '@mui/material';
import Rating from '../components/Rating';

import theme from '../style/ThemeColors';
import { ThemeProvider } from '@mui/material/styles';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../util';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state; // 현재 상태를 반환
  }
};

function ProductScreen() {
  //   useParams 이용, 파라미터 가져오기
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('죄송합니다. 상품의 재고가 없습니다.');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox severity="error">{error}</MessageBox>
  ) : (
    <ThemeProvider theme={theme}>
      <Grid container my={4} bgcolor="white">
        <Grid item xs={12} sm={5} align="right">
          <Card sx={{ minWidth: 400, maxWidth: 450 }}>
            <CardMedia
              component="img"
              alt={product.name}
              image={product.image}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box
            sx={{
              p: 2,
              minWidth: 300,
            }}
          >
            <Box sx={{ fontSize: 34, fontWeight: 'medium' }}>
              {product.name}
            </Box>
            <Box
              sx={{
                fontWeight: 'bold',
              }}
            >
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </Box>

            <Box
              sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
                mt: '1.5rem',
                mb: '1rem',
              }}
            >
              가격: ₩ {product.price}
            </Box>
            <Box sx={{ color: 'text.secondary' }}>{product.description}</Box>
          </Box>
        </Grid>
        {/* 상품 이름, 설명 등 */}
        <Grid item xs={12} sm={2}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              borderStyle: 'solid',
              borderColor: 'gray',
              borderWidth: '1px',
              p: 2,
              minWidth: 250,
            }}
          >
            <Box
              sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
                mb: 1,
              }}
            >
              가격: ₩ {product.price}
            </Box>
            <Box
              sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
              }}
            >
              재고:
              {product.countInStock > 0 ? (
                <Box
                  sx={{
                    mx: 1,
                    px: 1,
                    display: 'inline',
                    bgcolor: 'green',
                    color: 'white',
                    borderRadius: 1.5,
                  }}
                >
                  주문 가능
                </Box>
              ) : (
                <Box
                  sx={{
                    mx: 1,
                    px: 1,
                    display: 'inline',
                    bgcolor: 'red',
                    color: 'white',
                    borderRadius: 1.5,
                  }}
                >
                  주문 불가
                </Box>
              )}
            </Box>
            <Button
              color="mainButton"
              variant="contained"
              size="medium"
              sx={{ mt: 2 }}
              onClick={addToCartHandler}
            >
              장바구니에 추가
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ProductScreen;

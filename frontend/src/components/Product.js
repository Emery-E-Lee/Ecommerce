import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import Rating from './Rating';
import theme from '../style/ThemeColors';
import { ThemeProvider } from '@mui/material/styles';

function Product(props) {
  const { product } = props;

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 300 }} className="product">
        <CardActionArea>
          <Link to={`/product/${product.slug}`}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
            />
          </Link>
          <Box mx={1}>
            <Link to={`/product/${product.slug}`}>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Typography variant="body1" color="text.secondary">
              ₩{product.price}
            </Typography>
          </Box>
        </CardActionArea>
        <CardActions>
          <Button color="mainButton" variant="contained" size="medium" ml={1}>
            장바구니에 추가
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default Product;

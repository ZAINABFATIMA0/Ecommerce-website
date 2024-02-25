import { Button, Col, Card,  Row} from 'react-bootstrap';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from '../redux/cartSlice';




function Card1({imageUrl, description, price, loggedIn,product}) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const HandleAddToCart = () => {
    if (!loggedIn) {
      alert('Please log in first to add items to cart.');
      return;
    }

    if (product.stock === 0) {
      alert('This item is out of stock.');
      return;
    }

    

    const existingItem = cart.find(item => item.description === description);
    if (existingItem) {
      alert('This item is already in your cart.');
    } else {
      const newItem = {
        name: product.Productname,
        photo: product.photo,
        color: product.color,
        size: product.size,
        description: product.description,
        stock:product.stock,
        quantity: 1, 
        initialQuantity: 1,
        price: product.price,
        id :product._id
      };
      dispatch(addItemToCart(newItem));
      alert('Item added to cart.');
      console.log(newItem)
    }
  };


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} alt="Product Image" style={{
      objectFit: 'contain', // Maintain aspect ratio
      width: '100%',
      height: '300px', // Adjust the height as needed
      maxHeight: '1280px', // Limit to 1280 height
      maxWidth: '1280px', // Limit to 1280 width
    }}/>
      <Card.Body>
        <Card.Text className="fw-bold text-black">{description}</Card.Text>
        <Row>
          <Col xs={12} className="text-muted">
            Price: <span className="text-primary">{price}</span>
          </Col>
        </Row>
        <div className="text-end">
        <Button
          variant={product.stock === 0 ? 'danger' : 'primary'}
          onClick={HandleAddToCart}
          disabled={product.stock === 0 || cart.some(item => item.description === product.description)}
        >
          {product.stock === 0
            ? 'Out of Stock'
            : cart.some(item => item.description === product.description)
            ? 'Already in Cart'
            : 'Add to Cart'}
        </Button>
          </div>
      </Card.Body>
    </Card>
  );
}

export default Card1
import { Container, Row, Col, ListGroup, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsExclamationTriangle } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import MainNavbar from '../components/navbar';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCart,clearCart} from '../redux/cartSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const cartItems = useSelector(state => state.cart);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const user_id = useSelector(state => state.auth.user_id);

  const dispatch = useDispatch();

  
  const increaseQuantity = (index) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        const updatedQuantity = item.quantity + 1;
        const newQuantity = Math.min(updatedQuantity, item.stock); 
        const initialPrice = item.price / item.quantity;
        const updatedPrice = initialPrice * newQuantity; 
        return { ...item, quantity: newQuantity, price: updatedPrice };
      }
      return item;
    });
    dispatch(setCart(updatedCartItems));
    saveCartToLocalStorage(updatedCartItems);
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index && item.quantity > 1) {
        const updatedQuantity = item.quantity - 1;
        const initialPrice = item.price / item.quantity; 
        const updatedPrice = initialPrice * updatedQuantity; 
        return { ...item, quantity: updatedQuantity, price: updatedPrice };
      }
      return item;
    });
    dispatch(setCart(updatedCartItems));
    saveCartToLocalStorage(updatedCartItems);
  };

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  

  const removeItem = () => {
    if (itemToDelete !== null) {
      const updatedCartItems = cartItems.filter((_, i) => i !== itemToDelete);
      
  
      dispatch(setCart(updatedCartItems));
  
    
      saveCartToLocalStorage(updatedCartItems);
  
    
      setItemToDelete(null);
      setShowDeleteModal(false);
    }
  };
  
  
  

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.16;
  const taxAmount = cartTotal * taxRate;
  const totalAmount = cartTotal + taxAmount;

  const navigate =useNavigate()
  const handleOrder = async () => {
    try {

      const userId = user_id
      
      const itemList = cartItems.map(item => ({
        name: item.name,
        color: item.color,
        description: item.description,
        initialQuantity: item.initialQuantity,
        photo: item.photo,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        stock: item.stock,
        id: item.id
      }));
      
      
      const res = await axios.post('http://localhost:3001/api/v1/auth/newOrder',{itemList,userId
      });

      if (res.data.success){
        try {
          await Promise.all(
            cartItems.map(async (item) => {
              const updatedStock = item.stock - item.quantity;
              console.log(item.id);
              console.log(updatedStock)
              console.log(cartItems)
              await axios.put(`http://localhost:3001/api/v1/product/updateStock/${item.id}`, { stock: updatedStock });
            })
          );
          dispatch(clearCart());
        localStorage.removeItem('cart');
        navigate("/Order");
        } catch (error) {
          alert('Error updating stock:', error);
          console.log(error)
        }
        
      }
      else{
        alert(res.data.message)
      }
      
      
    } 
    catch (error) {
      console.log(error);
    }
  };
  

  return (

    <div> 
	    <MainNavbar />
    
    <Container className="mt-3">
    
      <h1 style={{ color: 'blue' }}>
        <Link to="/" className="mr-3">
          <BsArrowLeft size={30}  />
        </Link>
        Your Shopping Bag
      </h1>
      <Row>
        <Col md={12}>
          <ListGroup>
            <ListGroup.Item variant="secondary">
              <Row>
                <Col md={1}>
                  <input type="checkbox" />
                </Col>
                <Col md={3}>Products</Col>
                <Col md={2}>Color</Col>
                <Col md={2}>Size</Col>
                <Col md={2}>Quantity</Col>
                <Col md={1}>Price</Col>
                <Col md={1}></Col>
              </Row>
            </ListGroup.Item>
            {cartItems.map((item, index) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={1}>
                    <input type="checkbox" />
                  </Col>
                  <Col md={3}>
                  <img src={item.photo} alt={item.Productname} style={{ width: '50px', height: '50px' }} />
                    {item.Productname}</Col>
                  <Col md={2}>{item.color}</Col>
                  <Col md={2}>{item.size}</Col>
                  <Col md={2}>
                    <Button variant="light" onClick={() => decreaseQuantity(index)}>-</Button>{' '}
                    {item.quantity}{' '}
                    <Button variant="light" onClick={() => increaseQuantity(index)}>+</Button>
                  </Col>
                  <Col md={1}> Rs{(item.price).toFixed(2)}</Col>
                  <Col md={1}>
                  <AiOutlineDelete
                    size={20}
                    color="red"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setItemToDelete(index);
                      setShowDeleteModal(true);
                    }}
                  />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 2, offset: 10 }} className="text-right">
        <h5 style={{ fontSize: 'medium', fontWeight: 'semibold' }}>Subtotal: Rs{cartTotal.toFixed(2)}</h5>
        <h5 style={{ fontSize: 'medium', fontWeight: 'semibold' }}>Tax (16%): Rs{taxAmount.toFixed(2)}</h5>
        <h5 style={{ fontSize: 'medium', fontWeight: 'semibold' }}>Total: Rs{totalAmount.toFixed(2)}</h5>
          <Button variant="primary" onClick={handleOrder}>Place Order</Button>
        </Col>
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'blue' }}>Remove Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <BsExclamationTriangle size={40} color="orange" />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            Are you sure you want to delete this item from the cart?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={removeItem}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
}

export default Cart;
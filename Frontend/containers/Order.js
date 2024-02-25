import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsArrowUpRight } from 'react-icons/bs'; 
import MainNavbar from '../components/navbar'
import { useSelector} from 'react-redux';
import axios from 'axios';
import moment from "moment";


function Order() {

  const [orders, setOrder] = useState([]);
  const user_id = useSelector(state => state.auth.user_id);

  const getOrders = async()=>{
     
    try {

      const response = await axios.get(`http://localhost:3001/api/v1/auth/order/${user_id}`)
      setOrder (response.data)

      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
      getOrders()

  })

  
 

  return (
    <div> 
	    <MainNavbar />
    <Container className="mt-3">
      <h1 style={{ color: 'blue' }}>
        <Link to="/" className="mr-3">
          <BsArrowLeft size={30}  />
        </Link>
        Orders
      </h1>
      <hr />
      <Row>
          <Col md={12}>
            <ListGroup>
              <ListGroup.Item variant="secondary">
                <Row>
                  <Col md={3}>Date</Col>
                  <Col md={3}>Order#</Col>
                  <Col md={3}>Products</Col>
                  <Col md={2}>Amount</Col>
                  <Col md={1}>Action</Col>
                </Row>
              </ListGroup.Item>
              {orders.map((order, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={3}>{moment(order.createdAt).format("DD MMMM YYYY")}</Col>
                    <Col md={3}>{order._id}</Col>
                    <Col md={3}>{order.products.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0)}</Col>
                    <Col md={2}>Rs{order.products.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0).toFixed(2)}</Col>
                    <Col md={1}>
                      <Link to={`/OrderDetails/${order._id}`}>
                        <BsArrowUpRight size={20} color="blue" />
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
    </Container>
    </div>
  );
};

export default Order;

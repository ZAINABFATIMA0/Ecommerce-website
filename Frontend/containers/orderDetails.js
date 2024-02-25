import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Table } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from "moment";



function OrderDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null); 
  const userRole = useSelector(state => state.auth.role);
  console.log(orderId);

 
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/auth/orderDetail/${orderId}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrderDetails();
  });

  console.log(orderDetails);

  if (orderDetails === null) {
    return <p>Loading...</p>; 
  }


  return (
    <Container className="mt-3">
    <h2>
      <Link to={userRole === 1 ? '/admin' : '/Order'} className="mr-3">
        <BsArrowLeft size={30}  />
      </Link>
      Order Details
    </h2>
    <hr />

    <Table className="custom-table" responsive>
      <thead>
        <tr>
          <th>Date</th>
          <th>Order#</th>
          <th>Products</th>
          <th>User</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
       
          <tr>
            <td>{moment(orderDetails.createdAt).format('DD MMMM YYYY')}</td>
            <td>{orderDetails._id}</td>
            <td>{orderDetails.products.reduce(
                (totalQuantity, product) => totalQuantity + product.quantity,
                0
              )}</td>
            <td>{orderDetails.buyer.name}</td>
            <td> Rs
              {orderDetails.products.reduce(
                (totalPrice, product) =>
                  totalPrice + product.price * product.quantity,
                0
              ).toFixed(2)}</td>
          </tr>
      </tbody>
    </Table>

    <hr />
    <h4>
      Product Information
    </h4>
    <Row>
        <Col md={12}>
          <ListGroup>
            <ListGroup.Item variant="secondary">
              <Row>
                <Col md={6}>Title</Col>
                <Col md={3}>Price</Col>
                <Col md={3}>Quantity</Col>
              </Row>
            </ListGroup.Item>
            {orderDetails.products.map((product, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={6}>{product.name}</Col>
                  <Col md={3}>{product.price}</Col>
                  <Col md={3}>{product.quantity}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
  </Container>
);
};

export default OrderDetails
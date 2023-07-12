import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap';


function card({imageUrl, description, price }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} alt="Product Image" />
      <Card.Body>
        <Card.Text className="fw-bold text-black">{description}</Card.Text>
        <Row>
          <Col xs={12} className="text-muted">
            Price: <span className="text-primary">{price}</span>
          </Col>
        </Row>
        <div className="text-end">
          <Button variant="primary">Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default card
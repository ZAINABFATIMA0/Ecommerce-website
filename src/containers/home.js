import React from 'react'
import Card from '../components/card'
import { Row, Col, Container} from 'react-bootstrap'
import Navbar from '../components/navbar'
import Searchbar from '../components/searchbar'
import Searchbar2 from '../components/searchbar2'
import Page from '../components/Page'

function home() {
	const cards = [
		{
		  imageUrl: 'https://img.freepik.com/premium-psd/bottle-product-mockup-psd-beauty-packaging_53876-130082.jpg',
		  description: 'Product 1',
		  price: '$9.99',
		} ]

  return (
	<div>
	<Navbar />
      <Container fluid className="mt-4 mb-2">
        <h3 style={{ color: 'blue', margin: 0 }}>Heading</h3>
		</Container>
        <Row>
          <Col sm={7} className="d-flex align-items-center">
            <div style={{ width: '100%' }}>
              <Searchbar />
            </div>
          </Col>
          <Col sm={5} className="d-flex align-items-center justify-content-end">
            <div style={{ width: '100%' }}>
              <Searchbar2 />
            </div>
          </Col>
        </Row>
    
	<Row>
      {Array(8).fill(...cards).map((card, index) => (
        <Col key={index} xs={6} md={3}>
            <Card
              imageUrl={card.imageUrl}
              description={card.description}
              price={card.price}
            />
        </Col>
      ))}
    </Row>
	<br />
	<div className="d-flex justify-content-end" style={{ marginRight: '30px' }}>
        <Page />
      </div>

	</div>	
  );
}

export default home
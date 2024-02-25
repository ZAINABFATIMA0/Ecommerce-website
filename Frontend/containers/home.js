import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/card';
import { Row, Col, Container, Form } from 'react-bootstrap';
import MainNavbar from '../components/navbar';
import Page from '../components/Page';
import { useSelector } from 'react-redux';


function Home() {
  const auth = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async (page = 1) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/v1/product/getallproducts?page=${page}`);
      setProducts(data.products);
      setCurrentPage(page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
 /////////////////////Search Bar///////////////////////

 
 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const searchQuery = e.target.querySelector('input[type="search"]').value;
  
  try {
    const { data } = await axios.get(`http://localhost:3001/api/v1/product/getoneproduct?query=${searchQuery}`);
    setProducts(data.products);
    setCurrentPage(1);
  } catch (error) {
    console.log(error);
  }
};

////////////////////////Sorting Function////////////////////

const handleSubmit1 = async (e) => {
  e.preventDefault();
  
  const sortBy = document.getElementById('sortBy').value; // Get the selected sort option
  
  try {
    const { data } = await axios.get(`http://localhost:3001/api/v1/product/getallproducts2?page=${currentPage}&sort=${sortBy}`);
    
    setProducts(data.products);
    setCurrentPage(1); 
    setTotalPages(data.totalPages); 
  } catch (error) {
    console.log(error);
  }
};



	

  return (

    
    
<div style={{ backgroundColor: "#CCCCFF"}}>
<MainNavbar />
<Container>
      <Row className="align-items-center">
        <Col md={6}>
          <h3>Heading</h3>
        </Col>
        <Col md={3}>
        <div>
          <form className="d-flex search-form mb-2 mt-2" role="search" onSubmit={handleSubmit}>
          <button className="btn"  type="submit" style={{ fontWeight: 'bold' }}>
              Search
            </button>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
      </div>
        </Col>
        <Col md={3}>
          <div>
        <Form className="d-flex search-form mb-2 mt-2">
            <label className="fw-bold me-2 mb-0" htmlFor="sortBy" style={{ fontWeight: 'bold' }}>
              SortBy:
            </label>
            <select
              id="sortBy"
              className="form-control me-2"
              defaultValue=""
              onClick={handleSubmit1}
            >
              <option value="">Select an option</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
  </Form>
  </div>
        </Col>
      </Row>
    </Container>
  
	<Row>
      {products.map((product) => (
        <Col key={products._id} xs={6} md={3} classname ={"mb4"}>
            <Card
              imageUrl={product.photo}
              description={product.Productname}
              price=  {"Rs. "+ product.price}
              product={product} 
              loggedIn={!!auth.user}
            />
        </Col>
      ))}
    </Row>
	<br />
	<div className="d-flex justify-content-end" style={{ marginRight: '30px' }}>
  <Page
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={getAllProducts} 
        />
    </div>
</div>
);
  
}

export default Home
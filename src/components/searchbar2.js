// import React from 'react'
// import { Col, Container, Form, Row } from "react-bootstrap";

// function searchbar2({handleSort}) {
//     return (
//       <Container className="mt-4 mb-2">
//         <Row>
//           <Col sm={4} className="d-flex align-items-center justify-content-center">
//             <Form className="d-flex">
//               <Form.Label className="fw-bold me-2 align-self-center mb-0">Sort By:</Form.Label>
//               <Form.Select onChange={handleSort} className="flex-shrink-0">
//                 <option value="highToLow">High to Low</option>
//                 <option value="lowToHigh">Low to High</option>
//               </Form.Select>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//       );
// }

//export default searchbar2

import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

function Searchbar2({ handleSort }) {
  return (
    <Container className="mt-4 mb-2">
      <Row>
        <Col sm={4} className="d-flex align-items-center justify-content-center">
          <Form className="d-flex">
          <Form.Label className="fw-bold me-2 align-self-center mb-0">SortBy:</Form.Label>
            <Form.Select onChange={handleSort} className="me-2 rounded-pill">
              <option value="highToLow">High to Low</option>
              <option value="lowToHigh">Low to High</option>
            </Form.Select>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Searchbar2;



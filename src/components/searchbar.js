// import React from 'react'
// import {Col, Container, Form, Placeholder, Row } from "react-bootstrap";

// function searchbar() {
//     return (
//     <Container className="mt-5">
//       <Row>
//         <Col sm={4} className="d-flex align-items-center justify-content-center">
//           <Form className="d-flex">
//             <Form.Label className="fw-bold me-2 align-self-center mb-0">Search</Form.Label>
//             <Form.Control
//               type="search"
//               Placeholder= "Search by name"
//               aria-label="Search"
//             />
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default searchbar


// import { Col, Container, Form, Placeholder, Row } from 'react-bootstrap';

// function Searchbar() {
//   return (
//     <Container className="mt-5">
//       <Row>
//         <Col sm={4} className="d-flex align-items-center justify-content-center">
//           <Form className="d-flex">
//             <Form.Label className="fw-bold me-2 align-self-center mb-0">Search</Form.Label>
//             <Form.Control
//               type="search"
//               placeholder="Search by name"
//               aria-label="Search"
//             />
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Searchbar;

import React from 'react';
import {Col, Container, Form, Row } from "react-bootstrap";

function searchbar() {
  return (
    <Container className="mt-5">
      <Row>
        <Col sm={4}>
          <Form className="d-flex">
            <Form.Label className="fw-bold me-2 align-self-center mb-0">Search:</Form.Label>
            <Form.Control
              type="search"
              placeholder="Search by name"
              className="me-2 rounded-pill"
              aria-label="Search"
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default searchbar;
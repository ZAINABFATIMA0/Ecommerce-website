import React from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-0 text-uppercase text-center ">Signup</h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="Full Name">
                        <Form.Label className="text-center">
                          Full Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Full Name" />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="Email Address"
                      >
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="Email" placeholder="Email Address" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="BasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Please enter Password" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="MobilePhone"
                      >
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" placeholder="Mobile Number" />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Signup
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <a href="{''}" className="text-primary fw-bold">
                        <Link to="/" className="text-primary fw-bold">
                            Login
                        </Link>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Signup
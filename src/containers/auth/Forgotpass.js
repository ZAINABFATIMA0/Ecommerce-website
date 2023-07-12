import React from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';



function Forgotpass() {

    const handleForgotPassword = () => {
        window.location.href = '/Newpassword'; };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-0 text-uppercase text-center ">Forgot Password</h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Enter Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Please Enter your email" />
                      </Form.Group>


                      <div className="d-grid">
                            <Button variant="primary" type="submit" onClick={handleForgotPassword}>
                            Forgot Password
                            </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        No, i remember my password{" "}
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

export default Forgotpass
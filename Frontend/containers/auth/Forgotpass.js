import axios from "axios";
import { Button, Card, Col, Container,Form, Row } from "react-bootstrap";
import React, { useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Forgotpass() {

  const[email,setemail] =useState("")
  const navigate =useNavigate();
  const [emailError, setEmailError] = useState('');

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    try {
      const res = await axios.post('http://localhost:3001/api/v1/auth/Forgotpassword',{email});
      if (res.data.success){
        toast.success(res.data.message);
        localStorage.setItem('forgot_password_email', email);
        setTimeout(() => {
          navigate('/Newpassword');
        }, 5000);

      }
      else{
        toast.error(res.data.message)
      }
        
      }
      
    catch (error) {
      console.log(error)
            toast.error ("Something went wrong")
      
    }
    
  
  };

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
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Enter Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Please Enter your email" onChange={(e) => setemail(e.target.value)}
                          onBlur={validateEmail}
                          isInvalid={emailError !== ''}
                          required/>
                      </Form.Group>


                      <div className="d-grid">
                            <Button variant="primary" type="submit" >
                            Forgot Password
                            </Button>
                            <ToastContainer />
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        No, i remember my password{" "}
                        <a href="{''}" className="text-primary fw-bold">
                        <Link to="/Login" className="text-primary fw-bold">
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
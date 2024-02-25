import axios from "axios";
import { Button, Card, Col,Container,Form , Row} from "react-bootstrap";
import { Link, useNavigate, useLocation} from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {setAuth} from'../../redux/auth.js'


function Login() {
        const[email,setemail] =useState("")
        const[password,setpassword] =useState("")
        const [emailError, setEmailError] = useState('');
        const navigate =useNavigate();
        const dispatch = useDispatch();
        const location = useLocation();
      
      
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
            const res = await axios.post('http://localhost:3001/api/v1/auth/signin',{email,password});
            if (res.data.success){
            alert(res.data.message);
            dispatch(
              setAuth({
                user: res.data.user,
                token: res.data.token,
              })
            );
            localStorage.setItem("auth", JSON.stringify(res.data));
            if (res.data.user.role === 1) {
              
                navigate('/admin'); 
             
            } else {
              
                navigate(location.state || '/');
            
            }
          } else {
            alert(res.data.message);
          }
        } catch (error) {
          console.log(error);
          alert("Something went wrong");
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
                  <h2 className="fw-bold mb-0 text-uppercase text-center">Login</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Enter Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Please Enter your email"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          onBlur={validateEmail}
                          isInvalid={emailError !== ''}
                          required
                        />
                        <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Please enter Password" value={password} onChange={(e)=>setpassword(e.target.value)} required/>
                      </Form.Group>

                      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember Me" />
                      </Form.Group> */}

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Forgot Password !{" "}
                        <a href="{''}" className="text-primary fw-bold">
                        <Link to="/Forgotpass" className="text-primary fw-bold">
                        Reset
                        </Link>
                          
                        </a>
                      </p>
                    </div>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="{''}" className="text-primary fw-bold">
                        <Link to="/signup" className="text-primary fw-bold">
                        Sign Up
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

export default Login
import axios from 'axios';
import { Button, Card, Col,Container,Form , Row} from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


const Signup = ()=> {
  const[name,setname] =useState("")
  const[email,setemail] =useState("")
  const[password,setpassword] =useState("")
  const[mobilenumber,setmobilenumber] =useState("")
  const[emailError, setEmailError] = useState('');
  const navigate =useNavigate();
      
  
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    };

  const handlesubmit =async (e)=>{
    e.preventDefault()
    validateEmail();
    try {
      const res = await axios.post('http://localhost:3001/api/v1/auth/signup',{name,email,password,mobilenumber});
      if (res.data.success){
        alert(res.data.message);
        navigate('/login')
      }
      else{
        alert(res.data.message)
      }
    } catch (error) {
      console.log(error)
      alert("Something went wrong")
      
    }
    
  }

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
                    <Form onSubmit={handlesubmit}>
                      <Form.Group className="mb-3" controlId="Full Name">
                        <Form.Label className="text-center">
                          Full Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Full Name" value={name} onChange={(e)=>setname(e.target.value)} required/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="Email Address"
                      >
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="Email" placeholder="Email Address" value={email} onChange={(e)=>setemail(e.target.value)} onBlur={validateEmail}
                          isInvalid={emailError !== ''} required/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="BasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Please enter Password" value={password} onChange={(e)=>setpassword(e.target.value)} required />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="MobilePhone"
                      >
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" placeholder="Mobile Number" value={mobilenumber} onChange={(e)=>setmobilenumber(e.target.value)} required/>
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

export default Signup
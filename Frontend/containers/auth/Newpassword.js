import axios from "axios";
import { Button, Card, Col,Container,Form , Row} from "react-bootstrap";
import React , { useState }  from 'react';
import { useNavigate } from 'react-router-dom';


function Newpassword() {

  const navigate =useNavigate();
  const[newpassword,setpassword] =useState("")
  const[confirmpassword,setconfirm] =useState("")
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const email = localStorage.getItem('forgot_password_email');

    try {
      const res = await axios.post('http://localhost:3001/api/v1/auth/Newpassword',{email,newpassword,confirmpassword})

      if (res.data.success){
        alert(res.data.message);
        navigate('/Login')

      }
      else{
        alert(res.data.message)
      }
      
    } catch (error) {
      console.log(error)
          alert ("Something went wrong")
      
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
                  <h2 className="fw-bold mb-0 text-uppercase text-center ">New Password</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}> 
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Enter new password
                        </Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setpassword(e.target.value)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setconfirm(e.target.value)} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                      
                        <Button variant="primary" type="submit">
                          Reset Password
                        </Button>
          
                      </div>
                    </Form>
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

export default Newpassword

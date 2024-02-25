import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { AiOutlineShoppingCart, AiOutlineBell } from 'react-icons/ai';
import { useSelector, useDispatch} from 'react-redux';
import {clearAuth} from '../redux/auth'
import { useCart,clearCart } from '../redux/cartSlice'



function MainNavbar() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const cartItems = useCart();
  const cartItemCount = cartItems.length;
 

  const handleLogout = () => {
    dispatch(clearAuth());
    dispatch(clearCart());
    localStorage.removeItem('cart');
  };
    return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#cart" as={Link} to="/cart">
              <AiOutlineShoppingCart />
              {cartItemCount > 0 && ( 
                <span className="badge bg-danger rounded-circle">
                  {cartItemCount}
                </span>
              )}
            </Nav.Link>
            <Nav.Link href="#notification">
              <AiOutlineBell />
            </Nav.Link>
            {auth.user ? (
        <>
            <NavDropdown
            id="basic-nav-dropdown"
            show={dropdownOpen}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <NavDropdown.Item as={Link} to="/Order">
              Orders
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout} as={Link} to="/">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        
          <span style={{ marginTop: '7px', marginLeft: '10px' }}>{auth.user.name}</span>
             
        </>
      ) : (
        <Nav.Link as={Link} to="/Login">
          Login
        </Nav.Link>
      )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default MainNavbar
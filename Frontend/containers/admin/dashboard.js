import React, { useState,useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Products from './product'; 
import Orders from './order'; 
import MainNavbar from '../../components/navbar'; 
import './Dashboard.css'; 
import { initAuthFromLocalStorage } from 'C:/Users/wastech/Documents/my-app/src/redux/auth.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [selectedTab, setSelectedTab] = useState('Products');
    const isAuthenticated = useSelector(state => state.auth.user !== null);
    const userRole = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    const navigate =useNavigate()

    useEffect(() => {
        
        dispatch(initAuthFromLocalStorage());
    }, [dispatch]);

    useEffect(() => {
        if (!isAuthenticated || userRole !== 1) {
            alert('Please login as admin');
            navigate('/login');
        }
    }, [isAuthenticated, userRole,navigate]);

    const handleTabClick = (tab) => {
      setSelectedTab(tab);
    };

    return (
        <div>
            <MainNavbar />
            <Container>
                <Row>
                    <Col md={3} className="sidebar">
                        <ListGroup>
                            <ListGroup.Item
                                action
                                active={selectedTab === 'Products'}
                                onClick={() => handleTabClick('Products')}
                            >
                                <span className="sidebar-icon">➤</span> Products
                            </ListGroup.Item>
                            <hr className="sidebar-divider" />
                            <ListGroup.Item
                                action
                                active={selectedTab === 'Orders'}
                                onClick={() => handleTabClick('Orders')}
                            >
                                <span className="sidebar-icon">➤</span> Orders
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={9}>
                        {selectedTab === 'Products' ? <Products /> : <Orders />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;

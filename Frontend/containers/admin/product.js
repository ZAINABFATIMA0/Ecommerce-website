import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Modal,Form,Button } from 'react-bootstrap';
import { BsArrowLeft,  BsTrash , BsPencil, BsExclamationTriangle} from 'react-icons/bs'; 
import Page from '../../components/Page';

function Product() {

     ///////////////////////New Product Fields/////////////////////

          const[photo,setphoto]=useState("")
          const[Productname,setProductname]=useState("")
          const[price,setprice]=useState("")
          const[color,setcolor]=useState("")
          const[size,setsize]=useState("")
          const[description,setdescription]=useState("")
          const[stock,setstock]=useState("")

      //////////////////////Show Products//////////////////////

      const[products,setProducts]=useState([])
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1)


      const getAllProducts = async(page = 1)=>{
     
        try {

          const {data}= await axios.get(`http://localhost:3001/api/v1/product/getallproducts?page=${page}`)
          setProducts(data.products);
          setCurrentPage(page);
          setTotalPages(data.totalPages);

          
        } catch (error) {
          console.log(error)
          
        }
      }

      useEffect(()=>{
          getAllProducts()

      },[])


///////////////////Delete Product Functionality

      const [showDeleteModal, setShowDeleteModal] = useState(false); 
      const [productToDeleteId, setProductToDeleteId] = useState(null);


      const handleDeleteProduct = (id) => {

        setProductToDeleteId(id);
        setShowDeleteModal(true);
      };

      const handleHideDeleteModal = () => {
        setShowDeleteModal(false); 
      };

      const deleteitem = async(productId) =>{


        try {

            const data= await axios.delete(`http://localhost:3001/api/v1/product/deleteproduct/${productId}`);
            console.log(data)
            setShowDeleteModal(false); 

            setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
            
          } catch (error) {
            console.log(error)
          }

      }


  
//////////New Product Functionality

const [showDrawer, setShowDrawer] = useState(false);

    const handleAddToCart = () => {
        setShowDrawer(true);
      };
    
      const handleCloseDrawer = () => {
        setShowDrawer(false);
      };
      
  
      const handleSaveProduct = async(e) => {
        e.preventDefault()
        
        try {

          const res = await axios.post('http://localhost:3001/api/v1/product/createproduct',{photo,Productname,price,color,size,description,stock});
          
              if (res.data.success){
                setShowDrawer(false);
                
                setProducts(prevProducts => [...prevProducts, res.data.product]);
              }

              else {
                console.log(res.data.message)
              }

        } catch (error) {
          console.log(error)
          
        }
        
      };

  ///////////////////////Update Product Functionality ///////////////////////////

      const [showUpdateModal, setShowUpdateModal] = useState(false); 
      const [productToUpdateId, setProductToUpdateId] = useState(null);

          const[updatephoto,setupdatephoto]=useState("")
          const[updateProductname,setupdateProductname]=useState("")
          const[updateprice,setupdateprice]=useState("")
          const[updatecolor,setupdatecolor]=useState("")
          const[updatesize,setupdatesize]=useState("")
          const[updatedescription,setupdatedescription]=useState("")
          const[updatestock,setupdatestock]=useState("")




      const handleUpdateProduct = (id) => {

        setProductToUpdateId(id);
        setShowUpdateModal(true);
      };

      const handleHideUpdateModal = () => {
        setShowUpdateModal(false); 
      };

      const updateitem = async(e,productId) =>{
        e.preventDefault()

        try {
          const updateData = {};

          if (updatephoto) updateData.photo = updatephoto;
          if (updateProductname) updateData.Productname = updateProductname;
          if (updateprice) updateData.price = updateprice;
          if (updatecolor) updateData.color = updatecolor;
          if (updatesize) updateData.size = updatesize;
          if (updatedescription) updateData.description = updatedescription;
          if (updatestock) updateData.stock = updatestock;

            const data= await axios.put(`http://localhost:3001/api/v1/product/updateproduct/${productId}`,updateData);
            console.log(data)
            setShowUpdateModal(false); 

            setProducts(prevProducts => prevProducts.map(product =>
              product._id === productId ? { ...product, ...updateData } : product
          ));

          } catch (error) {
            console.log(error)
          }

      }

      
  return (
      <div> 
        <Container className="mt-3">
        
          <h1 style={{ color: 'blue' }}>
          <Row>
            <Col md={10}>
            Products
            </Col>
            <Col>
            <Button variant="primary" className="ml-3" onClick={handleAddToCart}>
                Add New
              </Button>
            </Col>
            </Row>
          </h1>
        
          <hr />
          <Row>
            <Col md={12}>
              <ListGroup>
                <ListGroup.Item variant="secondary">
                  <Row>
                    <Col md={2}>Title</Col>
                    <Col md={2}>Size</Col>
                    <Col md={2}>Colour</Col>
                    <Col md={2}>Price</Col>
                    <Col md={2}>Stock</Col>
                    <Col md={2}>Action</Col>
                  </Row>

                   </ListGroup.Item>
                   
                  {products.map((product) => (
                
                  <ListGroup.Item key={products._id}>
                    <Row>
                      <Col md={2}>{product.Productname}</Col>
                      <Col md={2}>{product.size}</Col>
                      <Col md={2}>{product.color}</Col>
                      <Col md={2}>Rs{product.price.toFixed(2)}</Col>
                      <Col md={2}>{product.stock}</Col>
                      <Col md={1}>

                      <BsPencil
                          size={20}
                          color="blue"
                          onClick={() => handleUpdateProduct(product._id)}
                        />
                        </Col>
                        <Col md={1}>
                        <BsTrash
                          size={20}
                          color="red"
                          onClick={() => handleDeleteProduct(product._id)}
                        />
                        
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  ))}
                
              </ListGroup>
              
            </Col>
          </Row>
          <hr/>
          <div className="d-flex justify-content-end" style={{ marginRight: '30px' }}>
            <Page
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={getAllProducts} // Pass the function to handle page changes
                  />
              </div>
          </Container>

{/* New Product Model ///////////////////////////////////////////    */}

        <Modal show={showDrawer} onHide={handleCloseDrawer} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
          <Button variant="link" onClick={handleCloseDrawer} style={{ marginBottom: '7px'}} >
            <BsArrowLeft size={20} />
        </Button>
        Add Product
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSaveProduct}>
        <Modal.Body>
          
          <Form>
            <Form.Group controlId="imageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Enter Image URL" onChange={(e)=>setphoto(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setProductname(e.target.value)} required/>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter Price" onChange={(e)=>setprice(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" placeholder="Enter Color" onChange={(e)=>setcolor(e.target.value)} required/>
            </Form.Group>

            <Form.Group controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control type="number" placeholder="Enter Size" onChange={(e)=>setsize(e.target.value)} required/>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Description" onChange={(e)=>setdescription(e.target.value)} required/>
            </Form.Group>

            <Form.Group controlId="stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" placeholder="Enter Stock" onChange={(e)=>setstock(e.target.value)} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>

      {/* Warning Model /////////////////////////////////// */}
      
      <Modal show={showDeleteModal} onHide={handleHideDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'blue' }}>Remove Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <BsExclamationTriangle size={40} color="orange" />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            Are you sure you want to delete this item from the cart?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideDeleteModal}>
            No
          </Button>
          <Button variant="danger" onClick={() => deleteitem(productToDeleteId)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

{/* ////////////////Update Product Modal ///////////////////// */}

<Modal show={showUpdateModal} onHide={handleHideUpdateModal} backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>
      <Button variant="link" onClick={handleHideUpdateModal} style={{ marginBottom: '7px'}} >
        <BsArrowLeft size={20} />
    </Button>
    Update Product
      </Modal.Title>
    </Modal.Header>
    <Form onSubmit={(e) => updateitem(e, productToUpdateId)}>
    <Modal.Body>
      
        <Form.Group controlId="imageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" placeholder="Enter Image URL" onChange={(e) => setupdatephoto(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setupdateProductname(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="Enter Price" onChange={(e) => setupdateprice(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="color">
          <Form.Label>Color</Form.Label>
          <Form.Control type="text" placeholder="Enter Color" onChange={(e) => setupdatecolor(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="size">
          <Form.Label>Size</Form.Label>
          <Form.Control type="number" placeholder="Enter Size" onChange={(e) => setupdatesize(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter Description" onChange={(e) => setupdatedescription(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" placeholder="Enter Stock"  onChange={(e) => setupdatestock(e.target.value)}/>
        </Form.Group>
      
    </Modal.Body>
    <Modal.Footer>
    
      <Button variant="primary" type= "submit">
        Update
      </Button>
    </Modal.Footer>
    </Form>
  </Modal>


      </div>
    );
  }
  

export default Product
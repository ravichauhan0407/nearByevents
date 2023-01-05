import {React,useState} from 'react'
import {Nav,Navbar,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { isAuthenticated, signout } from '../auth/index'


import {
  useNavigate
} from "react-router-dom";


import Modals from './Modals';

const Header = () => {

  const navigate = useNavigate();

    const handleLogout=()=>
    {
        
          signout().then((data)=>
          {
               navigate('/')
          })
    }


    const [show, setShow] = useState(false);
  
    const handleShow = () => setShow(true);
  
    const handleClose = () => setShow(false);


   

  return (
    <Navbar  sticky="top"  collapseOnSelect expand="lg">
    <Container>
    <LinkContainer to='/'>
    <Navbar.Brand>NearBYevents</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="justify-content-end flex-grow-1 pe-3">
    {isAuthenticated()&&(<LinkContainer to='/addEvent'>
      <Nav.Link >Add Event</Nav.Link>
     </LinkContainer>)
     }
     {
       !isAuthenticated()&&<Nav.Link onClick={handleShow}>Add Event</Nav.Link>
     }

     {show&&(<Modals title='Suggestion' content='To add events, you must first sign in'  show={show}  handleClose={handleClose}/>)}
    
      {!isAuthenticated()&&(<><LinkContainer to='/signin'>
      <Nav.Link>Login</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/signup'>
      <Nav.Link>Signup</Nav.Link>
      </LinkContainer></>)
       }  
       {isAuthenticated()&&(<><Nav.Link onClick={handleLogout}>Signout</Nav.Link></>)}
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}



export default Header



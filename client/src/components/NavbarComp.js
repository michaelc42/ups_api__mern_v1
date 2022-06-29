import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROLES } from '../constants/ROLES'
import AvatarForNav from './AvatarForNav';

import useAuth from '../hooks/useAuth';

const NavbarComp = ({allowedRoles}) => {
  const { auth } = useAuth()

  return (
    <>
         <Navbar bg="light" expand="lg">
            <Container>
          <Navbar.Brand as={Link} to='/home'>MERN Stack Test App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="flex-grow-1">
                    {/* <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link> */}
                    {/* {auth.roles && auth.roles.includes(ROLES['Admin']) ? <Nav.Link as={Link} to="/admin">Admin</Nav.Link> : ''} */}
                    <AvatarForNav />
                  </Nav>
                </Navbar.Collapse>
            </Container>
      </Navbar>
      
      
    </>
  )
}

export default NavbarComp
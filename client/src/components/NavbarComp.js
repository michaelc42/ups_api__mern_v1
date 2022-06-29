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
              <AvatarForNav />
            </Container>
      </Navbar>
      
      
    </>
  )
}

export default NavbarComp
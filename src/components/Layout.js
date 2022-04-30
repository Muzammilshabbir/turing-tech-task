import React, { useEffect } from 'react'
import { useNavigate, Outlet,Link } from 'react-router-dom'
import { Navbar, Container, Nav,NavDropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteCalls } from '../store/callSlice'

export default function Layout() {

    const dispatch = useDispatch()
    const token = localStorage.getItem('_token')

    const navigate = useNavigate()

    useEffect(() => {

        if (!token || token === 'undefined') {
            navigate('/', { replace: true })
        }

    }, [navigate, token])

    const handleLogout = () => {
        localStorage.clear();
        dispatch(deleteCalls([]))

        navigate("/")
    }
    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand>Welcome</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link> <Link to="/dashboard" className="linkTag"> Dashboard </Link></Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link onClick={handleLogout} className="linkTag"> <Link to="/dashboard" className="linkTag"> Logout </Link></Nav.Link>
                    </Nav>

                </Container>
            </Navbar>
            

            <Outlet />
        </div>
    )
}

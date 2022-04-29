import React, { useEffect } from 'react'
import { useNavigate, Outlet,Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import Loader from './Loader'

export default function Layout() {

    const token = localStorage.getItem('_token')

    const navigate = useNavigate()

    useEffect(() => {

        if (!token || token === 'undefined') {
            navigate('/', { replace: true })
        }

    }, [navigate, token])

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Welcome</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link> <Link to="/dashboard"> Dashboard </Link></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Loader/>

            <Outlet />
        </div>
    )
}

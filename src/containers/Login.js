import { useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { Axios } from '../services/Axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({ username: '', password: '' })

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            const {data} = await Axios.post('auth/login', userData)

            data && localStorage.setItem('_token', data.access_token)            
            navigate('/dashboard')

        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <Container style={{ width: '600px' }}>
            <Card>
                <Card.Header>Sign In</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>


        </Container>
    )
}

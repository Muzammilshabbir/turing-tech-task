import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

export default function Auth() {

    const token = localStorage.getItem('_token')

    const navigate = useNavigate();

    React.useEffect(() => {
        if (token && token !== 'undefined') {
            navigate('/dashboard', { replace: true })
        }  
    }, [navigate, token])

    return (
        <div>
            <Outlet />
        </div>
    )
}

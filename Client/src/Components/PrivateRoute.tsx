import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

interface iProps {
    children: JSX.Element
}

const PrivateRoute = ({ children }: iProps) => {
    const { currentUser } = useAuth()

    return currentUser ? children : <Navigate to={'/login'} />
}

export default PrivateRoute
import { GoogleAuthProvider, User, UserCredential, signInWithPopup } from 'firebase/auth'
import React, { useContext, useEffect, useState } from 'react'
import auth from '../Firebase'

interface iAuthContext {
    currentUser: User | null
    loading: boolean
    signWithGoogle: () => Promise<UserCredential>
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const AuthContext = React.createContext<iAuthContext | null>(null)

export const useAuth = () => useContext(AuthContext) as iAuthContext

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(auth.currentUser)
    const [loading, setLoading] = useState(true)

    const signWithGoogle = () => {
        const provider = new GoogleAuthProvider()

        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ 
            currentUser,
            loading,
            signWithGoogle,
			setLoading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
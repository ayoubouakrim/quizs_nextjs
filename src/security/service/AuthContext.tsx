'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { User } from "../model/User"
import React from 'react'
import { authService } from './authService'


interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const login = async (email: string, password: string) => {
        const response = await authService.login(email, password)

        const user : User = {
            id: response.id.toString(),
            username: response.username,
            email: response.email,
            roles: response.roles
        }
        
        const token = response.accessToken
        const username = response.username
        localStorage.setItem('token', token)
        localStorage.setItem('username', username)
        localStorage.setItem('user', JSON.stringify(user))
        document.cookie = `token=${token}; path=/;`
        setUser(user)
    }

    const register = async (username: string, email: string, password: string) => {
        const response = await authService.register(username, email, password)
        
        
    }

    const logout = () => {
        localStorage.removeItem('token')
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; HttpOnly'
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
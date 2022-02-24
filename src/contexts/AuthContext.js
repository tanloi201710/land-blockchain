import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
    user: null,
    setUser: () => { }
})

export const AuthContextWrapper = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    return (
        <AuthContext.Provider value={{
            user, setUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


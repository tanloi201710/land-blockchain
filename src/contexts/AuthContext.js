import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
    user: null,
    setUser: () => { },
    lands: null,
    setLands: () => { },
    notifyList: null,
    setNotifyList: () => { }
})

export const AuthContextWrapper = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [lands, setLands] = useState([])
    const [notifyList, setNotifyList] = useState([])
    return (
        <AuthContext.Provider value={{
            user, setUser, lands, setLands, notifyList, setNotifyList
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


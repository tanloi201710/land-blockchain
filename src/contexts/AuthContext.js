import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
    user: null,
    setUser: () => { },
    lands: null,
    setLands: () => { },
    notifyList: null,
    setNotifyList: () => { },
    posts: null,
    setPosts: () => { },
})

export const AuthContextWrapper = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [lands, setLands] = useState([])
    const [notifyList, setNotifyList] = useState([])
    const [posts, setPosts] = useState([])
    return (
        <AuthContext.Provider value={{
            user, setUser, lands, setLands, notifyList, setNotifyList, posts, setPosts
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


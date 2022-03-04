import { Box, Grid } from '@mui/material'
import React, { useContext, useState } from 'react'
import ChatBox from '../components/ChatBox'
import Container from '../components/Container'
import MarketFilter from '../components/MarketFilter'
import NavBar from '../components/NavBar'
import Post from '../components/Post'
import { AuthContext } from '../contexts/AuthContext'
import CreatePost from './CreatePost'

const Market = () => {
    const { user } = useContext(AuthContext)

    const [isCreatePost, setIsCreatePost] = useState(false)
    const [chatBox, setChatBox] = useState(false)

    const handleCloseCreateBox = () => {
        setIsCreatePost(false)
    }

    const handleOpenCreateBox = () => {
        setIsCreatePost(true)
    }

    const handleCloseChatBox = () => {
        setChatBox(false)
    }

    const handleOpenChatBox = () => {
        setChatBox(true)
    }

    return (
        <Container>
            <NavBar />
            <Box sx={{ display: 'flex', position: 'relative' }}>
                <MarketFilter handleOpen={handleOpenCreateBox} />
                <Grid container spacing={4} sx={{ paddingY: 5, marginLeft: 3 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post user={user} handleOpenChatBox={handleOpenChatBox} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post handleOpenChatBox={handleOpenChatBox} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post handleOpenChatBox={handleOpenChatBox} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post handleOpenChatBox={handleOpenChatBox} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post handleOpenChatBox={handleOpenChatBox} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post handleOpenChatBox={handleOpenChatBox} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post handleOpenChatBox={handleOpenChatBox} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post handleOpenChatBox={handleOpenChatBox} />
                    </Grid>
                </Grid>
            </Box>

            {isCreatePost && <CreatePost handleClose={handleCloseCreateBox} />}
            {chatBox && <ChatBox handleCloseChatBox={handleCloseChatBox} />}
        </Container>
    )
}

export default Market
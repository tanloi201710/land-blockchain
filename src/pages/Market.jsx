import { Box, Grid } from '@mui/material'
import React, { useContext, useState } from 'react'

import BasicAlerts from '../components/Alert'
import ChatBox from '../components/ChatBox'
import ConfirmBox from '../components/ConfirmBox'
import Container from '../components/Container'
import MarketFilter from '../components/MarketFilter'
import NavBar from '../components/NavBar'
import NoData from '../components/NoData'
import Post from '../components/Post'
import { AuthContext } from '../contexts/AuthContext'
import CreatePost from './CreatePost'
import { getHomePageData, getPostsData } from '../contexts/actions'
import PostDetail from '../components/PostDetail'

const Market = () => {
    const { user, posts, setPosts, setLands, setNotifyList } = useContext(AuthContext)

    const [isCreatePost, setIsCreatePost] = useState(false)
    const [chatBox, setChatBox] = useState(false)
    const [isPostDetail, setIsPostDetail] = useState({
        isOpen: false,
        user: {},
        post: {},
        land: {},
        handleContact: () => { setChatBox(true); setIsPostDetail({ ...isPostDetail, isOpen: false }) }
    })
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

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

    const handleCloseConfirm = async () => {
        setMessage('')
        // refetch data
        await getPostsData(setPosts)
        await getHomePageData(user?.role, setLands, setNotifyList)
    }

    const handleOpenPostDetails = (user, post, land) => {
        setIsPostDetail({ ...isPostDetail, isOpen: true, user, post, land })
    }

    return (
        <Container>
            <NavBar />
            {message !== '' && <ConfirmBox message={message} handleConfirm={handleCloseConfirm} />}
            {error !== ''
                && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BasicAlerts serverity="error" message={error} onClose={() => setError('')} />
                </Box>
            }
            <Box sx={{ display: 'flex', position: 'relative' }}>
                <MarketFilter handleOpen={handleOpenCreateBox} />
                <Grid container spacing={4} sx={{ paddingY: 5, marginLeft: 3 }}>
                    {
                        posts.length > 0
                            ? posts.map((post, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Post
                                        handleOpenChatBox={handleOpenChatBox}
                                        post={post}
                                        handleOpenPostDetails={handleOpenPostDetails}
                                        setError={setError}
                                        setMessage={setMessage}
                                    />
                                </Grid>
                            ))
                            : <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <NoData />
                            </Grid>
                    }
                </Grid>
            </Box>

            {isCreatePost && <CreatePost handleClose={handleCloseCreateBox} setMessage={setMessage} setError={setError} />}
            {chatBox && <ChatBox handleCloseChatBox={handleCloseChatBox} />}
            {isPostDetail.isOpen && <PostDetail handleClose={() => setIsPostDetail({ ...isPostDetail, isOpen: false })} {...isPostDetail} />}
        </Container>
    )
}

export default Market
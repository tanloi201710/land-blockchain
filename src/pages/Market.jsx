import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'
import Container from '../components/Container'
import MarketFilter from '../components/MarketFilter'
import NavBar from '../components/NavBar'
import Post from '../components/Post'
import { AuthContext } from '../contexts/AuthContext'

const Market = () => {
    const { user } = useContext(AuthContext)
    return (
        <Container>
            <NavBar />
            <Box sx={{ display: 'flex' }}>
                <MarketFilter />
                <Grid container spacing={4} sx={{ paddingY: 5, marginLeft: 3 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post user={user} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Post />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Market
import React, { useContext, useState } from 'react'
import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'

import CustomizedTables from '../components/CustomizedTables'
import { Box, IconButton, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import SideBar from '../components/SideBar'
import Container from '../components/Container'

const Home = () => {
    const { lands, user } = useContext(AuthContext)

    const [showSideBar, setShowSideBar] = useState(true)
    const [effectOut, setEffectOut] = useState(false)

    console.log(lands)

    const handleCloseSideBar = () => {
        setEffectOut(true)
        setShowSideBar(false)
    }

    const handleOpenSideBar = () => {
        // setEffectOut(false)
        setShowSideBar(true)
    }


    return (
        <Container>
            <NavBar />
            <Box
                sx={{
                    paddingX: 8,
                    paddingY: 5,
                    display: 'flex',
                    gap: 5,
                }}
            >

                <Box sx={{ width: '100%' }} >
                    {user?.role === 'user' ?
                        <>
                            <Typography variant="h6" sx={{ paddingBottom: 2 }}>ĐẤT CỦA BẠN</Typography>
                            <CustomizedTables rows={lands} user={user} />
                        </>
                        : user?.role === 'manager' &&
                        <>
                            <Typography variant="h6" sx={{ paddingBottom: 2 }}>ĐẤT ĐANG QUẢN LÝ</Typography>
                            <CustomizedTables rows={lands} user={user} />
                        </>
                    }
                </Box>
                {showSideBar ?
                    <SideBar effectOut={effectOut} handleCloseSideBar={handleCloseSideBar} showSideBar={showSideBar} />
                    : <div>
                        <IconButton color="primary" onClick={handleOpenSideBar} >
                            <ArrowBack />
                        </IconButton>
                    </div>
                }
            </Box>
        </Container>
    )
}

export default Home

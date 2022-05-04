import React, { useContext, useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'
import CustomizedTables from '../components/CustomizedTables'
import SideBar from '../components/SideBar'
import Container from '../components/Container'
import Footer from '../components/Footer'
import NoData from '../components/NoData'

const Home = () => {
    const { lands, user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [showSideBar, setShowSideBar] = useState(true)
    const [effectOut, setEffectOut] = useState(false)

    useEffect(() => {
        if (user.role === 'admin') {
            navigate('/admin')
        }
    }, [user.role, navigate])

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
                    minHeight: 'calc(100vh - 64px - 68px)'
                }}
            >

                <Box sx={{ width: '100%' }} >
                    {user?.role === 'user' ?
                        <>
                            <Typography variant="h6" sx={{ paddingBottom: 2 }}>ĐẤT CỦA BẠN</Typography>
                            {lands?.length > 0
                                ? <CustomizedTables rows={lands} user={user} />
                                : <NoData />
                            }
                        </>
                        : user?.role === 'manager' &&
                        <>
                            <Typography variant="h6" sx={{ paddingBottom: 2 }}>ĐẤT ĐANG QUẢN LÝ</Typography>
                            {lands?.length > 0
                                ? <CustomizedTables rows={lands} user={user} />
                                : <NoData />
                            }
                        </>
                    }
                </Box>
                {showSideBar ?
                    <SideBar effectOut={effectOut} handleCloseSideBar={handleCloseSideBar} showSideBar={showSideBar} />
                    : <div>
                        <IconButton color="primary" onClick={handleOpenSideBar} >
                            <Menu />
                        </IconButton>
                    </div>
                }
            </Box>
            <Footer />
        </Container>
    )
}

export default Home

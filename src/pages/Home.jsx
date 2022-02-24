import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'

import { homePageManager, homePageUser } from '../api'
import CustomizedTables from '../components/CustomizedTables'
import { Box, IconButton, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import SideBar from '../components/SideBar'
import Container from '../components/Container'

const Home = () => {
    const { user } = useContext(AuthContext)

    const [showSideBar, setShowSideBar] = useState(true)
    const [effectOut, setEffectOut] = useState(false)


    useEffect(() => {
        const getData = async () => {
            if (user.role === 'manager') {
                const result = await homePageManager()
                if (result.data.error) {
                    return
                }
                console.log(result.data)
            } else if (user.role === 'user') {
                const result = await homePageUser()
                if (result.data.error) {
                    return
                }
                console.log(result.data)
            }

            return
        }
        // getData()

    }, [user])

    const handleCloseSideBar = () => {
        setEffectOut(true)
        setShowSideBar(false)
    }

    const handleOpenSideBar = () => {
        // setEffectOut(false)
        setShowSideBar(true)
    }

    function createData(code, time, info, transfer, status) {
        return { code, time, info, transfer, status };
    }

    const rows = [
        createData('01', "2022-01-8", 24, 4.0, 'Đã duyệt'),
        createData('02', "2022-01-6", 37, 4.3, 'Chưa duyệt'),
        createData('03', "2022-01-6", 16.0, 24, 'Đang chuyển'),
        createData('05', "2022-01-4", 3.7, 67, 'Đã duyệt'),
        createData('09', "2022-01-3", 16.0, 49, 'Chưa duyệt'),
        createData('011', "2022-01-8", 24, 4.0, 'Đã duyệt'),
        createData('012', "2022-01-6", 37, 4.3, 'Chưa duyệt'),
        createData('013', "2022-01-6", 16.0, 24, 'Đang chuyển'),
        createData('015', "2022-01-4", 3.7, 67, 'Đã duyệt'),
        createData('019', "2022-01-3", 16.0, 49, 'Chưa duyệt'),
    ];

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
                    <Typography variant="h6" sx={{ paddingBottom: 2 }}>ĐẤT CỦA BẠN</Typography>
                    <CustomizedTables rows={rows} />
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

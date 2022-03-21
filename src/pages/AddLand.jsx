import { Box, Typography } from '@mui/material'
import React from 'react'
import NavBar from '../components/NavBar'
import OptionsLandCard from '../components/OptionsLandCard'

const AddLand = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <Box sx={{
            height: '100vh',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.1)), url(${PF}images/addLandBackGround.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflowX: 'hidden',

        }}>
            <NavBar />
            <Box container sx={{ width: '100vw', display: 'flex', justifyContent: 'center', paddingY: 5 }}>
                <Typography variant='button' sx={{ fontSize: 22 }}>Đăng ký đất mới</Typography>
            </Box>
            <Box container sx={{ display: 'flex', justifyContent: 'center', height: 400, alignItems: 'center', gap: 4 }}>
                <OptionsLandCard owner='one' largeTitle={'Chính tôi sỡ hữu'} smallTitle={'Đăng ký đất mới do chính bạn sỡ hữu'} route='addLand' />
                <OptionsLandCard owner='group' largeTitle={'Nhóm người sỡ hữu'} smallTitle={'Đăng ký đất mới cho nhóm người cùng sỡ hữu'} route='addLand' />
            </Box>
        </Box>
    )
}

export default AddLand
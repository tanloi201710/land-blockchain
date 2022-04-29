import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box
            sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}
        >
            <Typography variant="caption" color="text.secondary">Land Management - TanLoi © 2022</Typography>
        </Box>
    )
}

export default Footer
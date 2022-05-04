import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center', marginY: 3 }}
        >
            <Typography variant="caption" color="text.secondary">Land Management - TanLoi © 2022</Typography>
        </Box>
    )
}

export default Footer
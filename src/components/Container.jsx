import React from 'react'
import { Box } from '@mui/material'

const Container = ({ children, sx }) => {
    return (
        <Box sx={{
            height: '100vh',
            backgroundColor: '#f6f7f9',
            overflowX: 'hidden',
            ...sx

        }}>
            {children}
        </Box>
    )
}

export default Container
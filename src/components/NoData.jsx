import { Box, Typography } from '@mui/material'
import React from 'react'

const NoData = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <Box sx={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box
                sx={{ width: 220 }}
            >
                <img
                    src={`${PF}images/no-data.png`}
                    alt=''
                    style={{ width: '100%', height: '100%' }}
                />
            </Box>
            <Box>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>Chưa có dữ liệu</Typography>
            </Box>
        </Box>
    )
}

export default NoData
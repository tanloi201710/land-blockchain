import { Box, Typography } from '@mui/material'
import React from 'react'

const DisplayOwner = ({ owner }) => {
    return (
        <Box
            sx={{ marginLeft: 5 }}
        >
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{owner.fullname}</Typography>     {/* Ho ten */}

            <Box
                sx={{ marginLeft: 5, display: 'flex', alignItems: 'center', gap: 2 }}
            >
                <Typography variant='subtitle1'>Năm sinh:</Typography>               {/* Nam sinh */}
                <Typography variant='subtitle1'>{owner?.birthDay || 2000}</Typography>
            </Box>

            <Box
                sx={{ marginLeft: 5, display: 'flex', alignItems: 'center', gap: 2 }}
            >
                <Typography variant='subtitle1'>Số CMND/CCCD:</Typography>           {/* CMND/CCCD */}
                <Typography variant='subtitle1'>{owner.idCard}</Typography>
            </Box>

            <Box
                sx={{ marginLeft: 5, display: 'flex', alignItems: 'center', gap: 2 }}
            >
                <Typography variant='subtitle1'>Số điện thoại:</Typography>                {/* Dia chi chu so huu */}
                <Typography variant='subtitle1'>{owner.phoneNumber?.replace('+84', '0') || ''}</Typography>
            </Box>

        </Box>
    )
}

export default DisplayOwner
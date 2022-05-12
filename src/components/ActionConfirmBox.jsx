import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'

import BoxContainer from './BoxContainer'

const ActionConfirmBox = ({ message, handleClose, handleConfirm }) => {
    return (
        <BoxContainer>
            <Box
                sx={{
                    width: 450,
                    height: 200,
                    padding: 3,
                    borderRadius: 1,
                    backgroundColor: 'white'
                }}
            >
                <Box
                    sx={{
                        height: 15,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Box>
                <Box sx={{ height: 135, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="button" gutterBottom >Xác nhận</Typography>

                    <Typography variant="body1" gutterBottom>{message}</Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <Button variant="outlined" onClick={handleClose} >Hủy</Button>
                        <Button variant="contained" onClick={handleConfirm}>Xác nhận</Button>
                    </Box>
                </Box>
            </Box>
        </BoxContainer>
    )
}

export default ActionConfirmBox
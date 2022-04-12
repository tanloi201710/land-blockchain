import React from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'

const ConfirmBox = ({ message, handleConfirm }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10
            }}
        >
            <Box
                sx={{
                    width: 500,
                    padding: 3,
                    borderRadius: 1,
                    backgroundColor: 'white'
                }}
            >
                <Typography variant='button' color='text.secondary'>Thông báo</Typography>
                <Divider />
                <Typography variant='subtitle1' sx={{ marginTop: 2, fontSize: 18 }}>{message}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
                    <Button variant='contained' color='info' onClick={handleConfirm} >OK</Button>

                </Box>
            </Box>
        </Box>
    )
}

export default ConfirmBox
import React from 'react'
import { Box, Button, Typography } from '@mui/material'

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
                <Typography variant='subtitle1'>{message}</Typography>
                <Button variant='contained' sx={{ marginTop: 2 }} color='info' fullWidth onClick={handleConfirm} >OK</Button>
            </Box>
        </Box>
    )
}

export default ConfirmBox
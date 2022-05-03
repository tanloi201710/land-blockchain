import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React from 'react'

const RePasswordBox = ({ oldPassword, setOldPassword, handleSubmit }) => {
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
                <Typography variant='button' color='text.secondary' sx={{ fontWeight: 'bold', fontSize: 17 }}>Xác nhận mật khẩu</Typography>
                <Divider />
                <TextField
                    label='Mật khẩu cũ'
                    type='password'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <Box sx={{ height: 90, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Button variant='contained' color='info' onClick={handleSubmit} >OK</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default RePasswordBox
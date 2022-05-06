import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import BoxContainer from './BoxContainer'

const RePasswordBox = ({ oldPassword, setOldPassword, handleSubmit }) => {
    return (
        <BoxContainer>
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
                    sx={{ mt: 3 }}
                    fullWidth
                    label='Mật khẩu cũ'
                    type='password'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <Box sx={{ height: 90, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Button variant='contained' color='info' onClick={handleSubmit} >OK</Button>
                </Box>
            </Box>
        </BoxContainer>
    )
}

export default RePasswordBox
import React from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'
import BoxContainer from './BoxContainer'

const ConfirmBox = ({ message, handleConfirm }) => {
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
                <Typography variant='button' color='text.secondary' sx={{ fontWeight: 'bold', fontSize: 17 }}>Thông báo</Typography>
                <Divider />
                <Typography variant='subtitle1' sx={{ marginTop: 2, fontSize: 16 }}>{message}</Typography>
                <Box sx={{ height: 90, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Button variant='contained' color='info' onClick={handleConfirm} >OK</Button>

                </Box>
            </Box>
        </BoxContainer>
    )
}

export default ConfirmBox
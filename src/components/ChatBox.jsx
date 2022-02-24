import { Close } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'

const ChatBox = ({ endUser, handleCloseChatBox }) => {
    return (
        <Paper
            elevation={5}
            sx={{
                position: 'absolute',
                right: 20,
                bottom: 0,
                width: 350,
                height: 450,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60, padding: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar alt='' src=''>L</Avatar>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant='button' >Hồ Tấn Lợi</Typography>
                        <Typography variant='subtitle2' color={'text.secondary'} >0123456789</Typography>
                    </Box>
                </Box>
                <Box>
                    <IconButton onClick={handleCloseChatBox}>
                        <Close />
                    </IconButton>
                </Box>
            </Box>
            <Divider />
        </Paper>
    )
}

export default ChatBox
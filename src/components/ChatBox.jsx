import { Close } from '@mui/icons-material'
import { Avatar, Box, Divider, IconButton, Paper, Typography, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'
import React, { useRef } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const ChatBox = ({ endUser, handleCloseChatBox }) => {
    const { user } = React.useContext(AuthContext)
    const dummy = useRef()
    const [newMessage, setNewMessage] = React.useState('')
    const messages = [
        {
            content: 'Tôi muốn liên hệ để mua đất',
            time: '1:12 PM',
            userId: 'anguyen@gmail.com'
        },
        {
            content: 'Cảm ơn bạn đã quan tâm',
            time: '1:13 PM',
            userId: 'bnguyen@gmail.com'
        },
        {
            content: 'Bạn có thắc mắc gì về giá cả không',
            time: '1:13 PM',
            userId: 'bnguyen@gmail.com'
        },
        {
            content: 'Không, tôi muốn hẹn ngày để xem đất',
            time: '1:15 PM',
            userId: 'anguyen@gmail.com'
        },
        {
            content: 'Bạn có thắc mắc gì về giá cả không',
            time: '1:13 PM',
            userId: 'bnguyen@gmail.com'
        },
        {
            content: 'Không, tôi muốn hẹn ngày để xem đất',
            time: '1:15 PM',
            userId: 'anguyen@gmail.com'
        },
    ]

    // dummy.current.scrollIntoView({ behavior: 'smooth' })
    console.log(dummy)

    const inputStyle = {
        border: 'none',
        outline: 'none',
        width: '100%',
        lineHeight: 1.5
    }

    const handleSendMessage = () => {
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Paper
            elevation={5}
            sx={{
                position: 'absolute',
                right: 20,
                bottom: 2,
                width: 350,
                height: 460,
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
            {/* messages */}
            <Box
                sx={{
                    height: 330,
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 2,
                }}
            >
                {messages.map((message, index) => (
                    <Message user={user} message={message} key={index} />
                ))}
                <span ref={dummy}></span>
            </Box>
            {/* input */}
            <Box
                sx={{
                    height: 50,
                    borderTop: '1.5px solid #ccc',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2
                }}
                component="form"
                onSubmit={handleSendMessage}
            >
                <input placeholder='Nhập tin nhắn...' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} style={inputStyle} />
                <IconButton>
                    <Send />
                </IconButton>
            </Box>
        </Paper>
    )
}

const Message = ({ message, user }) => {

    const { content, userId, time } = message

    const commonMessageClass = {
        paddingX: 3,
        marginBottom: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
    }
    const myMessage = {
        flexDirection: 'row-reverse',
    }
    const otherMessage = {

    }

    const messageText = {
        maxWidth: 190,
        backgroundColor: userId === user.userId ? '#0b93f6' : '#e5e5ea',
        padding: 1,
        borderRadius: 2,
        color: userId === user.userId ? 'white' : 'black'
    }

    const messageTime = {}

    const messageClass = userId === user.userId ? myMessage : otherMessage

    return (<>
        <Box
            sx={[commonMessageClass, messageClass]}
        >
            <Typography variant="body2" sx={messageText}>{content}</Typography>
            <Typography variant="caption" sx={messageTime} color="text.secondary">{time}</Typography>
        </Box>
    </>)
}

export default ChatBox
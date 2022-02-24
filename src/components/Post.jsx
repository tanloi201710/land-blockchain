import { Chat, Info } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography } from '@mui/material'
import { brown } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Post = ({ user, handleOpenChatBox }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: brown[500] }} aria-label="recipe">
                        {user?.fullname.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={user?.fullname || "No Name"}
                subheader="September 14, 2016"
            />
            <CardMedia
                component='img'
                height={140}
                image={`${PF}images/userGroup.png`}
                alt=''
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate('/detail/1234')}
            />
            <CardContent>
                <Typography variant='body2' color={'text.secondary'}>Địa chỉ: {'Long Xuyên, An Giang'}</Typography>
                <Typography variant='body2' color={'text.secondary'}>Diện tích: {'300 m2'}</Typography>
                <Typography variant='body2' color={'text.secondary'} component='span'>Giá khởi điểm: </Typography>
                <Typography variant='button' component='span'>1,2 tỷ</Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Xem chi tiết">
                    <IconButton onClick={() => navigate('/detail/1234')}>
                        <Info color='info' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Liên hệ ngay">
                    <IconButton onClick={handleOpenChatBox}>
                        <Chat color='primary' />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default Post
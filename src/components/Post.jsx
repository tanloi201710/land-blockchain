import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const Post = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
            />
            <CardContent>
                <Typography variant='body2' color={'text.secondary'}>Địa chỉ: { }</Typography>
                <Typography variant='body2' color={'text.secondary'}>Diện tích: { }</Typography>
                <Typography variant='body2' color={'text.secondary'}>Giá khởi điểm: { }</Typography>
            </CardContent>
            <CardActions>
                <Button fullWidth variant='contained' >liên hệ ngay</Button>
            </CardActions>
        </Card>
    )
}

export default Post
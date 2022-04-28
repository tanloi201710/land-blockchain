import { Chat, Info } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography } from '@mui/material'
import { brown } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getLand } from '../api'
import { AuthContext } from '../contexts/AuthContext'
import { getUser } from '../firebase/search'
import { formatTimestamp } from '../firebase/time'

const Post = ({ user, handleOpenChatBox, post, handleOpenPostDetails }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { lands } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = React.useState({})
    const [currentLand, setCurrentLand] = React.useState(lands.find(land => land.key === post.land) || {})

    React.useEffect(() => {
        (async () => {
            const result = await getUser(post.userId)
            setCurrentUser(result[0])
        })()
    }, [post, setCurrentUser])

    React.useEffect(() => {
        if (!Boolean(currentLand)) {
            (async () => {
                const result = await getLand(post.land)
                if (!result.data.error) {
                    console.log(result.data.land)
                    setCurrentLand(result.data.land)
                }
            })()
        }
    }, [currentLand, setCurrentLand, post.land])


    console.log(post, currentUser)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: brown[500] }} aria-label="recipe">
                        {currentUser?.fullname?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={currentUser?.fullname || "No Name"}
                subheader={formatTimestamp(post.timestamp)}
            />
            <CardMedia
                component='img'
                height={140}
                image={post.img !== '' ? post.img : `${PF}images/no-image.png`}
                alt=''
                sx={{ cursor: 'pointer' }}
            />
            <CardContent>
                <Typography variant='body2' color={'text.secondary'}>Địa chỉ: {currentLand?.value?.Address || ''}</Typography>

                <Typography variant='body2' color={'text.secondary'}>Diện tích: {currentLand?.value?.DienTich || ''} m&#178;</Typography>

                <Typography variant='body2' color={'text.secondary'} component='span'>Giá khởi điểm: </Typography>
                <Typography variant='body1' component='span' color='error' sx={{ fontWeight: 'bold', fontSize: 19 }}>
                    {post.price}
                </Typography>
                <Typography variant='body1' component='span'> VNĐ/m&#178;</Typography>

                <Typography variant='body2' color={'text.secondary'}>Mô tả: </Typography>
                <Typography variant='body1' noWrap={true} >{post.desc}</Typography>
            </CardContent>
            <CardActions>
                <Tooltip title="Xem chi tiết">
                    <IconButton onClick={() => handleOpenPostDetails(currentUser, post, currentLand)}>
                        <Info color='info' />
                    </IconButton>
                </Tooltip>
                {post.userId !== user.userId
                    &&
                    <Tooltip title="Liên hệ ngay">
                        <IconButton onClick={handleOpenChatBox}>
                            <Chat color='primary' />
                        </IconButton>
                    </Tooltip>
                }
            </CardActions>

        </Card>
    )
}

export default Post
import { Chat, Delete, Info, MoreVert } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { brown } from '@mui/material/colors'
import React from 'react'
import { deletePost, getLand } from '../api'
import { AuthContext } from '../contexts/AuthContext'
import { getUser } from '../firebase/search'
import { deleteImage } from '../firebase/images'
import { formatTimestamp } from '../firebase/time'
import { currency } from '../format'

const Post = ({ handleOpenChatBox, post, handleOpenPostDetails, setError, setMessage }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { lands, user } = React.useContext(AuthContext)

    const [currentUser, setCurrentUser] = React.useState({})
    const [currentLand, setCurrentLand] = React.useState(lands.find(land => land.key === post.land) || {})
    const [anchorPostActionEl, setAnchorPostActionEl] = React.useState(null)
    const [deleting, setDeleting] = React.useState(false)

    const openPostActionMenu = Boolean(anchorPostActionEl)


    React.useEffect(() => {
        (async () => {
            const result = await getUser(post.userId)
            setCurrentUser(result[0])
        })()
    }, [post, setCurrentUser])

    React.useEffect(() => {
        if (!Boolean(currentLand?.key)) {
            (async () => {
                const result = await getLand(post.land)
                if (!result.data.error) {
                    console.log(result.data.land)
                    setCurrentLand(result.data.land)
                }
            })()
        }
    }, [currentLand?.key, setCurrentLand, post.land])


    console.log(post, currentUser)
    console.log(currentLand)

    const handleOpenPostActionMenu = (event) => {
        setAnchorPostActionEl(event.currentTarget)
    }

    const handleClosePostActionMenu = () => {
        setAnchorPostActionEl(null)
    }

    const handleDeletePost = async () => {
        setDeleting(true)
        const result = await deletePost(currentLand.key)
        await deleteImage(post.img)
        setDeleting(false)
        handleClosePostActionMenu()
        if (!result.data.error) {
            setMessage(result.data.message)
        } else {
            setError(result.data.message)
        }
    }

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
                action={
                    user.userId === post.userId &&
                    <>
                        <IconButton
                            aria-label="settings"
                            id="button-show-menu"
                            aria-haspopup="true"
                            aria-expanded={openPostActionMenu ? 'true' : undefined}
                            aria-controls={openPostActionMenu ? 'menu-actions' : undefined}
                            onClick={handleOpenPostActionMenu}
                        >
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="menu-actions"
                            MenuListProps={{
                                'aria-labelledby': 'button-show-menu',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            anchorEl={anchorPostActionEl}
                            open={openPostActionMenu}
                            onClose={handleClosePostActionMenu}
                        >
                            <MenuItem onClick={handleDeletePost}>
                                {deleting
                                    ? <CircularProgress size={20} color='inherit' />
                                    : <>
                                        <ListItemIcon>
                                            <Delete />
                                        </ListItemIcon>
                                        <ListItemText>Xóa bài viết</ListItemText>
                                    </>
                                }
                            </MenuItem>
                        </Menu>
                    </>
                }
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
                    {currency(post.price)}
                </Typography>
                <Typography variant='body1' component='span'> /m&#178;</Typography>

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
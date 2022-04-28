import React from 'react'
import { Box, Typography, IconButton, Grid, Button, Divider } from '@mui/material'
import { Close } from '@mui/icons-material'

const PostDetail = ({ handleClose, user, post, land }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const row = (label, value, sx, color = 'text.primary') => (
        <>
            <Typography
                variant="body1"
                component="span"
                color="text.secondary"
            >
                {label}:
            </Typography>
            <Typography
                variant="body1"
                component="span"
                sx={[{ fontWeight: 500 }, sx]}
                color={color}
            >
                &nbsp;{value}
            </Typography>
        </>
    )

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
                zIndex: 99999
            }}
        >
            <Box
                sx={{
                    width: 750,
                    padding: 3,
                    borderRadius: 1,
                    backgroundColor: 'white',
                    marginTop: 5
                }}
            >
                <Box
                    sx={{
                        height: 15,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Box>
                <Typography variant="button" >Đăng tin bán đất</Typography>
                <Box
                    sx={{
                        maxHeight: 550,
                        overflowY: 'auto',
                    }}
                >
                    {/* image */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={post.img !== '' ? post.img : `${PF}images/no-image.png`}
                            alt={land.key}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </Box>
                    {/* user info */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Thông tin người bán</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {row('Người đăng bán', user.fullname, { fontWeight: 'bold' })}
                            </Grid>
                            <Grid item xs={6}>
                                {row('Số điện thoại', user.phoneNumber, {})}
                            </Grid>
                        </Grid>
                    </Box>
                    {/* land info */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Thông tin thửa đất</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {row('Mã đất', land.key, {})}
                            </Grid>
                            <Divider />
                            <Grid item xs={6}>
                                {row('Diện tích', land.value.DienTich, {})}
                            </Grid>
                            <Divider />
                            <Grid item xs={6}>
                                {row('Địa chỉ', land.value.Address, {})}
                            </Grid>
                            <Grid item xs={6}>
                                {row('Nguồn gốc', land.value.NguonGocSuDung, {})}
                            </Grid>
                        </Grid>
                    </Box>
                    {/* post info */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>Thông tin đăng bán</Typography>
                        <Box>
                            <Typography
                                variant="body1"
                                component="span"
                                color="text.secondary"
                            >
                                Giá khởi điểm:
                            </Typography>
                            <Typography
                                variant="body1"
                                component="span"
                                sx={{ fontSize: 19, fontWeight: "bold" }}
                                color={'error'}
                            >
                                &nbsp;{post.price}
                            </Typography>
                            <Typography
                                variant="body1"
                                component="span"
                            >
                                &nbsp;VNĐ/m&#178;
                            </Typography>

                        </Box>

                        <Box>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                            >
                                Mô tả:
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontSize: 17, textIndent: 20 }}
                            >
                                {post.desc}
                            </Typography>
                        </Box>
                    </Box>
                    {/* buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button variant="contained" color="info">Liện hệ ngay</Button>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default PostDetail
import React from 'react'
import { Box, Typography, IconButton, Grid, Button, Divider } from '@mui/material'
import { Close } from '@mui/icons-material'
import { currency } from '../format'
import { Link } from 'react-router-dom'

const PostDetail = ({ handleClose, user, post, land, handleContact }) => {
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
                <Typography variant="button" >????ng tin b??n ?????t</Typography>
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
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Th??ng tin ng?????i b??n</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {row('Ng?????i ????ng b??n', user.fullname, { fontWeight: 'bold' })}
                            </Grid>
                            <Grid item xs={6}>
                                {row('S??? ??i???n tho???i', user.phoneNumber.replace('+84', '0'), {})}
                            </Grid>
                        </Grid>
                    </Box>
                    {/* land info */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Th??ng tin th???a ?????t</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                {row(
                                    'M?? ?????t',
                                    <Link to={`/detail/${land.key}`} style={{ color: '#0288d1', fontWeight: 500 }}>{land.key}</Link>,
                                    {}
                                )
                                }
                            </Grid>
                            <Divider />
                            <Grid item xs={6}>
                                {row('Di???n t??ch', land.value.DienTich, {})}
                            </Grid>
                            <Divider />
                            <Grid item xs={6}>
                                {row('?????a ch???', land.value.Address, {})}
                            </Grid>
                            <Grid item xs={6}>
                                {row('Ngu???n g???c', land.value.NguonGocSuDung, {})}
                            </Grid>
                        </Grid>
                    </Box>
                    {/* post info */}
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>Th??ng tin ????ng b??n</Typography>
                        <Box>
                            <Typography
                                variant="body1"
                                component="span"
                                color="text.secondary"
                            >
                                Gi?? kh???i ??i???m:
                            </Typography>
                            <Typography
                                variant="body1"
                                component="span"
                                sx={{ fontSize: 19, fontWeight: "bold" }}
                                color={'error'}
                            >
                                &nbsp;{currency(post.price)}
                            </Typography>
                            <Typography
                                variant="body1"
                                component="span"
                            >
                                &nbsp;/m&#178;
                            </Typography>

                        </Box>

                        <Box>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                            >
                                M?? t???:
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
                        <Button variant="contained" color="info" onClick={handleContact}>Li???n h??? ngay</Button>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

export default PostDetail
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// import landImg from '../images/gcnqsdđ.jpg'
import NavBar from '../components/NavBar'
import { ArrowBack } from '@mui/icons-material'
import { AuthContext } from '../contexts/AuthContext'

const LandDetail = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const params = useParams()
    const navigate = useNavigate()

    const { lands } = useContext(AuthContext)
    const currentLand = lands.find(land => land.key === params.id)
    console.log(currentLand)

    return (
        <Box
            sx={{
                backgroundColor: '#f6f7f9',
            }}
        >
            <NavBar />
            <Box
                sx={{
                    paddingX: 8,
                    paddingY: 5
                }}
            >
                <IconButton onClick={() => navigate(-1)} sx={{ marginBottom: 1 }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant='h5' gutterBottom sx={{ textTransform: 'uppercase' }}>Thông tin thửa đất, tài sản gắn liền với đất</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant='h6' gutterBottom >Chủ sở hữu</Typography>
                        {/* Map for each owner */}


                        <Box
                            sx={{ marginLeft: 5 }}
                        >
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>Hồ Tấn Lợi</Typography>     {/* Ho ten */}

                            <Box
                                sx={{ marginLeft: 5, display: 'flex', alignItems: 'center', gap: 2 }}
                            >
                                <Typography variant='subtitle1'>Năm sinh:</Typography>               {/* Nam sinh */}
                                <Typography variant='subtitle1'>{2000}</Typography>
                            </Box>

                            <Box
                                sx={{ marginLeft: 5, display: 'flex', alignItems: 'center', gap: 2 }}
                            >
                                <Typography variant='subtitle1'>Số CMND/CCCD:</Typography>           {/* CMND/CCCD */}
                                <Typography variant='subtitle1'>{352522788}</Typography>
                            </Box>

                            <Box
                                sx={{ marginLeft: 5, display: 'flex', alignItems: 'center', gap: 2 }}
                            >
                                <Typography variant='subtitle1'>Địa chỉ:</Typography>                {/* Dia chi chu so huu */}
                                <Typography variant='subtitle1'>{'Xuan Khanh, Ninh Kieu, Can Tho'}</Typography>
                            </Box>

                        </Box>


                        <Typography variant='h6' gutterBottom >Thửa đất</Typography>
                        <Box
                            sx={{ paddingX: 5 }}
                        >
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Thửa đất số</Typography>    {/* Thua dat so */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{currentLand?.value.ThuaDatSo}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Tờ bản đồ số</Typography>   {/* To ban do so */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{currentLand?.value.ToBanDoSo}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Địa chỉ</Typography>   {/* Dia chi */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{currentLand?.value.Address}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Diện tich</Typography>   {/* Dien tich */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{`${currentLand?.value.DienTich} m2`}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Hình thức sử dụng</Typography>   {/* Hinh thuc su dung */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{currentLand?.value.HinhThucSuDung}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Mục đích sử dụng</Typography>   {/* Muc dich su dung */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{currentLand?.value.MucDichSuDung}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Thời hạn sử dụng</Typography>   {/* Thoi han su dung */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{currentLand?.value.ThoiHanSuDung}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Nguồn gốc sử dụng</Typography>   {/* Nguon goc */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{currentLand?.value.NguonGocSuDung}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Thời gian đăng ký</Typography>   {/* Thoi gian dang ky */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{currentLand?.value.ThoiGianDangKy}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Lịch sử chuyển nhượng</Typography>  {/* Lich su chuyen nhuong */}
                                </Grid>
                                <Grid item xs={8}> a b c d</Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Tọa độ các đỉnh</Typography>         {/* Toa do cac dinh */}
                                </Grid>
                                <Grid item xs={8}></Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Độ dài các cạnh</Typography>        {/* Do dai cac canh */}
                                </Grid>
                                <Grid item xs={8}></Grid>
                            </Grid>

                        </Box>
                        <Typography variant='h6' gutterBottom>Nhà ở</Typography>
                        <Box sx={{ paddingX: 5 }}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Loại nhà ở</Typography>   {/* Loai nha o */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{'Nhà ở riêng lẻ'}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Diện tích xây dựng</Typography>   {/* Dien tich xay dung */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{'1000 m2'}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Hình thức sở hữu</Typography>   {/* Hinh thuc so huu */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{'Sỡ hữu riêng'}</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Typography variant='h6' gutterBottom>Công trình xây dựng khác</Typography>
                        <Box sx={{ paddingX: 5 }}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Loại công trình</Typography>   {/* Loai nha o */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{'-'}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Diện tích xây dựng</Typography>   {/* Dien tich xay dung */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{'-'}</Typography>
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Hình thức sở hữu</Typography>   {/* Hinh thuc so huu */}
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant='subtitle1'>{'-'}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box>

                            <img
                                src={currentLand?.value.ImageUrl.split(",")[0] || `${PF}images/no-image.png`}
                                style={{ width: '100%', height: '100%' }}
                                alt='land media'
                                loading='lazy'
                            />
                        </Box>

                    </Grid>
                </Grid>
            </Box>
        </Box >
    )
}

export default LandDetail
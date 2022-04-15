import { Box, Divider, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// import landImg from '../images/gcnqsdđ.jpg'
import NavBar from '../components/NavBar'
import { ArrowBack } from '@mui/icons-material'
import { AuthContext } from '../contexts/AuthContext'
import { getUser } from '../firebase/search'
import DisplayOwner from '../components/DisplayOwner'
import StyledTableCell from '../components/StyledTableCell'
import StyledTableRow from '../components/StyledTableRow'

const LandDetail = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const params = useParams()
    const navigate = useNavigate()

    const { lands, user } = useContext(AuthContext)
    const currentLand = lands.find(land => land.key === params.id)
    const currentUsers = currentLand?.value.UserId

    const initialOwners = () => {
        if (typeof currentLand?.value.UserId === 'object') {
            return currentLand?.value.UserId.includes(user.userId) ? [user] : []
        }

        return currentLand?.value.UserId === user.userId ? [user] : []
    }

    const [owners, setOwners] = useState(initialOwners)


    useEffect(() => {
        if (typeof currentUsers === 'object') {
            for (let i = 0; i < currentUsers.length; i++) {
                if (currentUsers[i] !== user.userId) {
                    (async () => {
                        const resultUser = await getUser(currentUsers[i])
                        if (resultUser.length > 0) {
                            setOwners(prev => [...prev, resultUser[0]])
                        }
                    })()
                }
            }

        } else {
            (async () => {
                console.log('Gọi chỗ này')
                const resultUser = await getUser(currentUsers)
                if (resultUser.length > 0) {
                    setOwners([resultUser[0]])
                }
            })()
        }
    }, [currentUsers, user.userId])
    console.log(currentLand, owners, currentUsers)

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

                        {owners.length > 0 &&
                            owners.map((owner, index) => (
                                <DisplayOwner owner={owner} key={index} />
                            ))
                        }

                        <Typography variant='h6' gutterBottom >Thửa đất</Typography>
                        <Box
                            sx={{ paddingX: 5, display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 1 }}
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
                                <Grid item xs={8}>
                                    {currentLand?.value.Transactions.length > 0 ?
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Thời gian</TableCell>
                                                    <TableCell>Nội dung</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {currentLand.value.Transactions.map((transaction, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell component="th" scope="row">
                                                            <Typography variant='subtitle1' sx={{ fontWeight: '500' }} component='span'>
                                                                {Object.keys(transaction).toString()}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell >
                                                            <Typography variant='subtitle1' component='span'>
                                                                {transaction[Object.keys(transaction)]}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        : <Typography variant='subtitle1'>{'-/-'}</Typography>
                                    }
                                </Grid>
                            </Grid>

                            <Divider />

                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant='subtitle1'>Thông số đỉnh - cạnh</Typography>         {/* Toa do cac dinh */}
                                </Grid>
                                <Grid item xs={8}>
                                    {currentLand?.value.ToaDoCacDinh && Object.values(currentLand?.value.ToaDoCacDinh).map((dinh, index) => (
                                        <Box key={index}>
                                            <Typography variant="subtitle1" component='span' >{`Đỉnh ${index + 1}: [`}</Typography>
                                            <Typography sx={{ fontWeight: 'bold' }} component='span'>{`${dinh.X}`}</Typography>
                                            <Typography sx={{ fontWeight: 'bold' }} component='span'>{`,  ${dinh.Y}`}</Typography>
                                            ],
                                            &nbsp;
                                            <Typography variant='subtitle1' component='span'>Cạnh {index < Object.values(currentLand?.value.ToaDoCacDinh).length - 1 ? `${index + 1} - ${index + 2}` : `${index + 1} - 1`} :</Typography>
                                            &nbsp;
                                            <Typography sx={{ fontWeight: 'bold' }} component='span'>{Object.values(currentLand?.value.ChieuDaiCacCanh)[index]}</Typography>

                                        </Box>
                                    ))}
                                </Grid>
                            </Grid>



                        </Box>
                        <Typography variant='h6' gutterBottom>Nhà ở</Typography>
                        {currentLand?.value.NhaO.length > 0 ?
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 1000 }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>STT</StyledTableCell>
                                            <StyledTableCell>Loại nhà ở</StyledTableCell>
                                            <StyledTableCell>Diện tích xây dựng</StyledTableCell>
                                            <StyledTableCell>Diện tích sàn</StyledTableCell>
                                            <StyledTableCell>Hình thức sỡ hữu</StyledTableCell>
                                            <StyledTableCell>Cấp(hạng) nhà ở</StyledTableCell>
                                            <StyledTableCell>Thời hạn sỡ hữu</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentLand?.value.NhaO.map((value, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component='th' scope='row'>
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{value.loaiNhaO}</StyledTableCell>
                                                <StyledTableCell align="right">{value.dienTichXayDung}</StyledTableCell>
                                                <StyledTableCell align="right">{value.dienTichSan}</StyledTableCell>
                                                <StyledTableCell align="right">{value.hinhThucSoHuu}</StyledTableCell>
                                                <StyledTableCell align="right">{value.capNhaO}</StyledTableCell>
                                                <StyledTableCell align="right">{value.thoiHanSoHuu}</StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>


                            : "-/-"
                        }

                        <Typography variant='h6' gutterBottom>Công trình xây dựng khác</Typography>
                        {currentLand?.value.CongTrinhKhac.length > 0 ?
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 1000 }}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>STT</StyledTableCell>
                                            <StyledTableCell>Loại công trình</StyledTableCell>
                                            <StyledTableCell>Diện tích xây dựng(m2)</StyledTableCell>
                                            <StyledTableCell>Diện tích sàn(m2)</StyledTableCell>
                                            <StyledTableCell>Hình thức sỡ hữu</StyledTableCell>
                                            <StyledTableCell>Cấp công trình</StyledTableCell>
                                            <StyledTableCell>Thời hạn sỡ hữu</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentLand?.value.CongTrinhKhac.map((value, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component='th' scope='row'>
                                                    {index + 1}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{value.loaiCongTrinh}</StyledTableCell>
                                                <StyledTableCell align="right">{value.dienTichXayDung}</StyledTableCell>
                                                <StyledTableCell align="right">{value.dienTichSan}</StyledTableCell>
                                                <StyledTableCell align="right">{value.hinhThucSoHuu}</StyledTableCell>
                                                <StyledTableCell align="right">{value.capCongTrinh}</StyledTableCell>
                                                <StyledTableCell align="right">{value.thoiHanSoHuu}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            : "-/-"
                        }
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
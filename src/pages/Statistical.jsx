import { ChangeCircle, Flip, NewReleases } from '@mui/icons-material'
import { Box, Button, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import NavBar from '../components/NavBar'
import StyledTableCell from '../components/StyledTableCell'
import StyledTableRow from '../components/StyledTableRow'
import { AuthContext } from '../contexts/AuthContext'
import { trangThai } from '../data'
import { getAllUser } from '../firebase/search'

const Statistical = () => {

    const [selectedTab, setselectedTab] = React.useState(0)
    const [users, setUsers] = React.useState([])

    const { lands } = React.useContext(AuthContext)

    React.useEffect(() => {
        (async () => {
            const result = await getAllUser()
            setUsers(result)
        })()
    }, [])

    const handleSelectTab = (event, index) => {
        setselectedTab(index)
    }

    const getTabContent = () => {
        switch (selectedTab) {
            case 0:
                return (
                    <>
                        <Box>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <TextField
                                        select
                                        label="Trạng thái"
                                    >
                                        {trangThai.map((value, index) => (
                                            <MenuItem key={index}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>

                                </Grid>
                            </Grid>
                        </Box>
                        <StatisticalTable type="land" rows={lands} />
                    </>
                )

            case 1:
                return <StatisticalTable type="user" rows={users} />

            // case 2:
            //     return <CustomizedSplitRequestTables rows={allSplitRequest} setMessage={setMessage} setError={setError} handleOpenDataProcesed={handleOpenDataProcesed} />

            default:
                return null
        }
    }

    return (
        <Container>
            <NavBar />
            <Box
                sx={{
                    paddingX: 8,
                    paddingY: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 3,
                    minHeight: 'calc(100vh - 64px - 68px)'
                }}
            >
                <Paper
                    sx={{ flex: 1 }}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={selectedTab === 0}
                                onClick={(event) => handleSelectTab(event, 0)}
                            >
                                <ListItemIcon>
                                    <NewReleases color='error' />
                                </ListItemIcon>
                                <ListItemText primary={'Đất'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={selectedTab === 1}
                                onClick={(event) => handleSelectTab(event, 1)}
                            >
                                <ListItemIcon>
                                    <ChangeCircle color='info' />
                                </ListItemIcon>
                                <ListItemText primary={'Người dùng'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={selectedTab === 2}
                                onClick={(event) => handleSelectTab(event, 2)}
                            >
                                <ListItemIcon>
                                    <Flip color='success' />
                                </ListItemIcon>
                                <ListItemText primary={'Giao dịch'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Paper>
                <Box
                    sx={{ flex: 4 }}
                >
                    {getTabContent()}
                </Box>
            </Box>
        </Container>
    )
}

const StatisticalTable = ({ type, rows }) => {

    const rowsPerPage = 5

    const [page, setPage] = React.useState(0)

    const navigate = useNavigate()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const getTableHeadContent = () => {
        switch (type) {
            case 'land':
                return (
                    <TableRow>
                        <StyledTableCell>Mã đất</StyledTableCell>
                        <StyledTableCell align="right">Thời gian đăng ký</StyledTableCell>
                        <StyledTableCell align="right">Chủ sở hữu</StyledTableCell>
                        <StyledTableCell align="right">Thông tin chi tiết</StyledTableCell>
                        <StyledTableCell align="right">Trạng thái</StyledTableCell>
                    </TableRow>
                )

            case 'user':
                return (
                    <TableRow>
                        <StyledTableCell>STT</StyledTableCell>
                        <StyledTableCell align="right">Thời gian đăng ký</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Họ tên</StyledTableCell>
                        <StyledTableCell align="right">Số điện thoại</StyledTableCell>
                        <StyledTableCell align="right">Địa chỉ</StyledTableCell>
                    </TableRow>
                )

            case 'transaction':
                return (
                    <TableRow>
                        <StyledTableCell>Mã đất</StyledTableCell>
                        <StyledTableCell align="right">Thời gian đăng ký</StyledTableCell>
                        <StyledTableCell align="right">Chủ sở hữu</StyledTableCell>
                        <StyledTableCell align="right">Thông tin chi tiết</StyledTableCell>
                        <StyledTableCell align="right">Trạng thái</StyledTableCell>
                    </TableRow>
                )

            default:
                return null
        }
    }

    const getTableBodyContent = () => {
        switch (type) {
            case 'land':
                return (
                    <>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <StyledTableRow key={row.key}>
                                <StyledTableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                    {row.key}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.value.ThoiGianDangKy}</StyledTableCell>
                                <StyledTableCell align="right">{typeof row.value.Owner === 'object'
                                    ? row.value.Owner.join(', ')
                                    : row.value.Owner}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant='outlined' color='info' onClick={() => navigate(`/detail/${row.key}`)}>Xem</Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">{`${row.value.Status}`}</StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </>
                )

            case 'user':
                return (
                    <>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.Date}</StyledTableCell>
                                <StyledTableCell align="right">{row.userId}</StyledTableCell>
                                <StyledTableCell align="right">{row.fullname}</StyledTableCell>
                                <StyledTableCell align="right">{row.phoneNumber}</StyledTableCell>
                                <StyledTableCell align="right">{row.address !== '' ? row.address : 'Chưa cập nhật'}</StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </>
                )
            default:
                break;
        }
    }

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        {getTableHeadContent()}
                    </TableHead>
                    <TableBody>
                        {getTableBodyContent()}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[rowsPerPage]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                getItemAriaLabel={(type) => `Trang ${type === 'next' ? 'kế tiếp' : 'trước'}`}
                labelRowsPerPage="Số dòng"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count !== -1 ? count : `nhiều hơn ${to}`}`}
            />
        </Paper>
    )
}

export default Statistical
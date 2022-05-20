import { AccountCircle, ChangeCircle, ViewCompact } from '@mui/icons-material'
import { Box, Button, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import NavBar from '../components/NavBar'
import StyledTableCell from '../components/StyledTableCell'
import StyledTableRow from '../components/StyledTableRow'
import { AuthContext } from '../contexts/AuthContext'
import { days, month, trangThai, year } from '../data'
import { getAllUser } from '../firebase/search'

const Statistical = () => {

    const initFilterOptions = {
        keySearch: '',
        statusSearch: 'Tất cả',
        daySearch: '',
        monthSearch: '',
        yearSearch: ''
    }

    const inputTimeStyle = {
        minWidth: 90
    }

    const { lands } = React.useContext(AuthContext)

    const [selectedTab, setselectedTab] = React.useState(0)
    const [users, setUsers] = React.useState([])
    const [filterOptions, setFilterOptions] = React.useState(initFilterOptions)
    const [displayLands, setDisplayLands] = React.useState([...lands])
    const [displayUsers, setDisplayUsers] = React.useState([...users])


    React.useEffect(() => {
        (async () => {
            const result = await getAllUser()
            setUsers(result)
        })()
    }, [])

    React.useEffect(() => {
        if (filterOptions.keySearch !== "") {
            switch (selectedTab) {
                case 0:
                    setDisplayLands(lands.filter(land => land.key.toLowerCase().includes(filterOptions.keySearch)))
                    break

                case 1:
                    setDisplayUsers(users.filter(user => user.userId.toLowerCase().includes(filterOptions.keySearch)))
                    break

                default:
                    break
            }

        }
    })

    const handleSelectTab = (event, index) => {
        setselectedTab(index)
    }

    const handleFilter = () => { }

    const getTabContent = () => {
        switch (selectedTab) {
            case 0:
                return (
                    <>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', marginBottom: 2 }}>
                            <Typography variant="button">Tổng: </Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{lands.length}</Typography>
                        </Box>
                        <StatisticalTable type="land" rows={displayLands} />
                    </>
                )

            case 1:
                return (
                    <>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', marginBottom: 2 }}>
                            <Typography variant="button">Tổng: </Typography>
                            <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>{users.length}</Typography>
                        </Box>
                        <StatisticalTable type="user" rows={displayUsers} />
                    </>
                )

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
                                    <ViewCompact color='success' />
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
                                    <AccountCircle color='info' />
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
                                    <ChangeCircle color='warning' />
                                </ListItemIcon>
                                <ListItemText primary={'Giao dịch'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Paper>
                <Box
                    sx={{ flex: 4 }}
                >
                    <Box sx={{ display: 'flex', gap: 2, marginBottom: 1, alignItems: 'center' }}>
                        <TextField
                            label={`Tìm theo ${selectedTab === 0 ? 'mã đất' : selectedTab === 1 ? 'email' : 'mã giao dịch'}`}
                            variant="filled"
                            value={filterOptions.keySearch}
                            onChange={(e) => setFilterOptions({ ...filterOptions, keySearch: e.target.value })}
                        />
                        {selectedTab === 0 &&
                            <TextField
                                label="Trạng thái đất"
                                select
                                sx={{ minWidth: 250 }}
                                value={filterOptions.statusSearch}
                                onChange={(e) => setFilterOptions({ ...filterOptions, statusSearch: e.target.value })}
                            >
                                {trangThai.map((tt, index) => (
                                    <MenuItem key={index} value={tt}>
                                        {tt}
                                    </MenuItem>
                                ))}

                            </TextField>
                        }
                        <Box sx={{ transform: 'translateY(-14px)' }}>
                            <Typography gutterBottom>Thời gian đăng ký/yêu cầu</Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    label="Ngày"
                                    sx={inputTimeStyle}
                                    select
                                    value={filterOptions.daySearch}
                                    onChange={(e) => setFilterOptions({ ...filterOptions, daySearch: e.target.value })}
                                >
                                    {days.map((day, i) => (
                                        <MenuItem value={day} key={i}>
                                            {day}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Tháng"
                                    sx={inputTimeStyle}
                                    select
                                    value={filterOptions.monthSearch}
                                    onChange={(e) => setFilterOptions({ ...filterOptions, monthSearch: e.target.value })}
                                >
                                    {month.map((mon, i) => (
                                        <MenuItem value={mon} key={i}>
                                            {mon}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Năm"
                                    sx={inputTimeStyle}
                                    select
                                    value={filterOptions.yearSearch}
                                    onChange={(e) => setFilterOptions({ ...filterOptions, yearSearch: e.target.value })}
                                >
                                    {year.map((y, i) => (
                                        <MenuItem value={y} key={i}>
                                            {y}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>

                        </Box>

                        <Button onClick={handleFilter} variant="contained" color="success" sx={{ height: 40 }}>
                            Lọc
                        </Button>
                    </Box>

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
import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, IconButton, MenuItem, TextField, Typography, Tooltip } from '@mui/material'
import { Menu, RestartAlt } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'
import CustomizedTables from '../components/CustomizedTables'
import SideBar from '../components/SideBar'
import Container from '../components/Container'
import Footer from '../components/Footer'
import NoData from '../components/NoData'
import { days, month, trangThai, year } from '../data'

const Home = () => {

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
    const { lands, user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [displayLands, setDisplayLands] = useState([...lands])
    const [showSideBar, setShowSideBar] = useState(true)
    const [effectOut, setEffectOut] = useState(false)
    const [filterOptions, setFilterOptions] = useState(initFilterOptions)

    useEffect(() => {
        if (user.role === 'admin') {
            navigate('/admin')
        }
    }, [user.role, navigate])

    useEffect(() => {
        if (filterOptions.keySearch !== "") {
            setDisplayLands(lands.filter(land => land.key.toLowerCase().includes(filterOptions.keySearch)))
        } else {
            setDisplayLands([...lands])
        }
    }, [lands, filterOptions.keySearch, setDisplayLands])

    console.log(displayLands)

    const handleCloseSideBar = () => {
        setEffectOut(true)
        setShowSideBar(false)
    }

    const handleOpenSideBar = () => {
        // setEffectOut(false)
        setShowSideBar(true)
    }

    const dateFilter = (array) => {
        const day = filterOptions.daySearch
        const month = filterOptions.monthSearch
        const year = filterOptions.yearSearch

        if (day === "" && month === "" && year === "") {
            return array
        }

        if (day !== "" && month === "" && year === "") {
            return array.filter(item => item.value.ThoiGianDangKy.split('-')[1].split('/')[0] === day)
        }

        if (day === "" && month !== "" && year === "") {
            return array.filter(item => item.value.ThoiGianDangKy.split('-')[1].split('/')[1] === month)
        }

        if (day === "" && month === "" && year !== "") {
            return array.filter(item => item.value.ThoiGianDangKy.split('-')[1].split('/')[0] === year)
        }

        if (day !== "" && month !== "" && year === "") {
            return array.filter(item =>
                item.value.ThoiGianDangKy.split('-')[1].split('/')[0] === day
                && item.value.ThoiGianDangKy.split('-')[1].split('/')[1] === month
            )
        }

        if (day !== "" && month === "" && year !== "") {
            return array.filter(item =>
                item.value.ThoiGianDangKy.split('-')[1].split('/')[0] === day
                && item.value.ThoiGianDangKy.split('-')[1].split('/')[2] === year
            )
        }

        if (day === "" && month !== "" && year !== "") {
            return array.filter(item =>
                item.value.ThoiGianDangKy.split('-')[1].split('/')[1] === month
                && item.value.ThoiGianDangKy.split('-')[1].split('/')[2] === year
            )
        }

        if (day !== "" && month !== "" && year !== "") {
            const stringDate = `${day}/${month}/${year}`
            return array.filter(item => item.value.ThoiGianDangKy.split('-')[1] === stringDate)
        }
    }

    const handleFilter = () => {
        if (filterOptions.keySearch === "") {
            if (filterOptions.statusSearch !== "Tất cả") {
                const filterdStatus = lands.filter(land => land.value.Status === filterOptions.statusSearch)
                setDisplayLands(dateFilter(filterdStatus))

            } else {
                setDisplayLands(dateFilter(lands))
            }

        } else {
            setDisplayLands(lands.filter(land => land.key.toLowerCase().includes(filterOptions.keySearch)))
        }
    }

    const handleReset = () => {
        setFilterOptions(initFilterOptions)
        setDisplayLands([...lands])
    }


    return (
        <Container>
            <NavBar />
            <Box
                sx={{
                    paddingX: 8,
                    paddingY: 5,
                    display: 'flex',
                    gap: 5,
                    minHeight: 'calc(100vh - 64px - 68px)'
                }}
            >

                <Box sx={{ width: '100%' }} >
                    {user?.role === 'user' ?
                        <>
                            <Typography variant="h6" sx={{ paddingBottom: 2 }}>ĐẤT CỦA BẠN</Typography>
                            {lands?.length > 0
                                ? <CustomizedTables rows={lands} user={user} />
                                : <NoData />
                            }
                        </>
                        : user?.role === 'manager' &&
                        <>
                            <Typography variant="h6" sx={{ paddingBottom: 2 }}>ĐẤT ĐANG QUẢN LÝ</Typography>
                            <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, alignItems: 'center' }}>
                                <TextField
                                    label="Tìm theo mã đất"
                                    variant="filled"
                                    value={filterOptions.keySearch}
                                    onChange={(e) => setFilterOptions({ ...filterOptions, keySearch: e.target.value })}
                                />
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
                                <Box sx={{ transform: 'translateY(-14px)' }}>
                                    <Typography gutterBottom>Thời gian đăng ký</Typography>
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
                                    Tìm
                                </Button>

                                <Tooltip title="Mặc định">
                                    <IconButton onClick={handleReset}>
                                        <RestartAlt />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            {lands?.length > 0
                                ? <CustomizedTables rows={displayLands} user={user} />
                                : <NoData />
                            }
                        </>
                    }
                </Box>
                {showSideBar ?
                    <SideBar effectOut={effectOut} handleCloseSideBar={handleCloseSideBar} showSideBar={showSideBar} />
                    : <div>
                        <IconButton color="primary" onClick={handleOpenSideBar} >
                            <Menu />
                        </IconButton>
                    </div>
                }
            </Box>
            <Footer />
        </Container>
    )
}

export default Home

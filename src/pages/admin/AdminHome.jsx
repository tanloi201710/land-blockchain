import { Autorenew, CreateNewFolder, DoneAll, Folder, Group, GroupAdd } from '@mui/icons-material'
import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import AdminNavBar from '../../components/admin/AdminNavBar'
import AdminSideBar from '../../components/admin/AdminSideBar'
import StatisticCard from '../../components/StatisticCard'
import { AuthContext } from '../../contexts/AuthContext'

const AdminHome = () => {

    const userListCard = [
        {
            icon: <Group color="inherit" fontSize="large" />,
            label: 'Tổng',
            number: 12
        },
        {
            icon: <GroupAdd color="inherit" fontSize="large" />,
            label: 'Mới',
            number: 2
        }
    ]

    const landListCard = [
        {
            icon: <Folder color="inherit" fontSize="large" />,
            label: 'Tổng',
            number: 10
        },
        {
            icon: <Autorenew color="inherit" fontSize="large" />,
            label: 'Chờ duyệt',
            number: 3
        },
        {
            icon: <DoneAll color="inherit" fontSize="large" />,
            label: 'Đã duyệt',
            number: 4
        },
    ]

    const requestListCard = [
        {
            icon: <CreateNewFolder color="inherit" fontSize="large" />,
            label: 'Đăng ký mới',
            number: 10
        },
        {
            icon: <Autorenew color="inherit" fontSize="large" />,
            label: 'Chuyển đất',
            number: 3
        },
        {
            icon: <DoneAll color="inherit" fontSize="large" />,
            label: 'Tách thửa',
            number: 4
        },
        {
            icon: <DoneAll color="inherit" fontSize="large" />,
            label: 'Chỉnh sửa',
            number: 4
        },
    ]

    const { user } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        if (!Boolean(user) || user?.role !== 'admin') {
            navigate('/')
        }
    }, [user, navigate])

    const getColor = (index) => {
        let value = index % 4
        switch (value) {
            case 0:

                return '#0288d1'

            case 1:
                return '#ff9800'

            case 2:

                return '#4caf50'

            case 3:
                return '#f44336'

            default:
                break;
        }
    }

    const toogleSideBar = () => {
        setOpen(prev => !prev)
    }
    const sideBarWidth = open ? 68 : 240
    return (
        <Box>
            <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#f6f7f9' }}>
                <AdminSideBar open={open} />

                <Box sx={{ minWidth: `calc(100vw - ${sideBarWidth}px)` }}>
                    <AdminNavBar
                        currentLabel="Trang chủ"
                        auth sideBarWidth={sideBarWidth}
                        toogleSideBar={toogleSideBar}
                        open={open}
                    />
                    <Box sx={{ padding: 4 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right', fontWeight: 500 }}>Hôm nay</Typography>

                        <Typography variant="h6" gutterBottom>Người dùng</Typography>
                        <Grid container spacing={2} sx={{ mb: 5 }}>
                            {landListCard.map((item, index) => (
                                <Grid item xs={3} key={index}>
                                    <StatisticCard {...item} color={getColor(index)} />
                                </Grid>
                            ))}
                        </Grid>
                        <Divider />

                        <Typography variant="h6" gutterBottom>Đất</Typography>
                        <Grid container spacing={2} sx={{ mb: 5 }}>
                            {userListCard.map((item, index) => (
                                <Grid item xs={3} key={index}>
                                    <StatisticCard {...item} color={getColor(index)} />
                                </Grid>
                            ))}
                        </Grid>
                        <Divider />

                        <Typography variant="h6" gutterBottom>Giao dịch</Typography>
                        <Grid container spacing={2} sx={{ mb: 5 }}>
                            {requestListCard.map((item, index) => (
                                <Grid item xs={3} key={index}>
                                    <StatisticCard {...item} color={getColor(index)} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AdminHome
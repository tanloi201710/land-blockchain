import { Assignment, Autorenew, CreateNewFolder, Dashboard, DoneAll, Edit, Equalizer, Flip, Folder, Group, GroupAdd, Person } from '@mui/icons-material'
import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import AdminNavBar from '../../components/admin/AdminNavBar'
import AdminSideBar from '../../components/admin/AdminSideBar'
import StatisticCard from '../../components/StatisticCard'
import ManageStaffs from './ManageStaffs'
import { AuthContext } from '../../contexts/AuthContext'
import ActionConfirmBox from '../../components/ActionConfirmBox'
import BasicAlerts from '../../components/Alert'
import { getAllSplit, getAllTransfer } from '../../api'
import { getAllUser } from '../../firebase/search'

const AdminHome = () => {




    const tabList = [
        {
            icon: Dashboard,
            desc: 'Trang chủ'
        },
        {
            icon: Person,
            desc: 'Nhân viên'
        },
        {
            icon: Equalizer,
            desc: 'Thống kê'
        },
        {
            icon: Assignment,
            desc: 'Hoạt động'
        },
    ]

    const { user, lands } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState(0)
    const [error, setError] = React.useState('')
    const [transfers, setTransfers] = React.useState([])
    const [splitRequest, setSplitRequest] = React.useState([])
    const [users, setUsers] = React.useState([])
    const [actionConfirm, setActionConfirm] = React.useState({
        isOpen: false,
        message: '',
        handleConfirm: () => { },
    })




    const handleChangeTab = (tab) => {
        setActiveTab(tab)
    }

    React.useEffect(() => {
        if (!Boolean(user) || user?.role !== 'admin') {
            navigate('/')
        }
    }, [user, navigate])

    React.useEffect(() => {
        (async () => {
            const result1 = await getAllTransfer()
            const result2 = await getAllSplit()
            const result3 = await getAllUser()

            if (!result1.error && !result2.error) {
                setTransfers(result1.data.allTransfer)
                setSplitRequest(result2.data.splitRequest)
                setUsers(result3)
            }
        })()
    }, [setTransfers, setSplitRequest])


    const userListCard = [
        {
            icon: <Group color="inherit" fontSize="large" />,
            label: 'Tổng',
            number: users?.length
        },
        {
            icon: <GroupAdd color="inherit" fontSize="large" />,
            label: 'Mới',
            number: users.filter(user => user.Date.split('/')[0] === (new Date()).getDate()).length
        }
    ]

    const landListCard = [
        {
            icon: <Folder color="inherit" fontSize="large" />,
            label: 'Tổng',
            number: lands.length
        },
        {
            icon: <Autorenew color="inherit" fontSize="large" />,
            label: 'Chờ duyệt',
            number: lands.filter(land => land.value.Status === 'Chưa duyệt').length
        },
        {
            icon: <DoneAll color="inherit" fontSize="large" />,
            label: 'Đã duyệt',
            number: lands.filter(land => land.value.Status === 'Đã duyệt').length
        },
    ]

    const requestListCard = [
        {
            icon: <CreateNewFolder color="inherit" fontSize="large" />,
            label: 'Đăng ký mới',
            number: splitRequest.length
        },
        {
            icon: <Autorenew color="inherit" fontSize="large" />,
            label: 'Chuyển đất',
            number: transfers.length
        },
        {
            icon: <Flip color="inherit" fontSize="large" />,
            label: 'Tách thửa',
            number: splitRequest.length
        }
    ]


    const getColor = (init, index) => {
        let value = (index + init) % 4
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

    const handleCloseActionConfirm = () => {
        setActionConfirm({ ...actionConfirm, isOpen: false })
    }

    // const handleOpenActionConfirm = () => {
    //     setActionConfirm({ ...actionConfirm, isOpen: true })
    // }

    const sideBarWidth = open ? 68 : 240

    const home = (
        <>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }} gutterBottom>Hôm nay</Typography>

            <Typography variant="h6" gutterBottom>Đất</Typography>
            <Grid container spacing={2} sx={{ mb: 5 }}>
                {landListCard.map((item, index) => (
                    <Grid item xs={3} key={index}>
                        <StatisticCard {...item} color={getColor(0, index)} />
                    </Grid>
                ))}
            </Grid>
            <Divider />

            <Typography variant="h6" gutterBottom>Người dùng</Typography>
            <Grid container spacing={2} sx={{ mb: 5 }}>
                {userListCard.map((item, index) => (
                    <Grid item xs={3} key={index}>
                        <StatisticCard {...item} color={getColor(1, index)} />
                    </Grid>
                ))}
            </Grid>
            <Divider />

            <Typography variant="h6" gutterBottom>Giao dịch</Typography>
            <Grid container spacing={2} sx={{ mb: 5 }}>
                {requestListCard.map((item, index) => (
                    <Grid item xs={3} key={index}>
                        <StatisticCard {...item} color={getColor(2, index)} />
                    </Grid>
                ))}
            </Grid>
        </>
    )

    const getTabContent = () => {
        switch (activeTab) {
            case 0:
                return home

            case 1:
                return <ManageStaffs setActionConfirm={setActionConfirm} handleCloseActionConfirm={handleCloseActionConfirm} />

            case 2:
                return home

            case 3:
                return home

            default:
                return null
        }
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#f6f7f9' }}>
                {error !== '' && <BasicAlerts serverity="error" message={error} onClose={() => setError('')} />}
                <AdminSideBar open={open} tabList={tabList} activeTab={activeTab} handleChangeTab={handleChangeTab} />

                <Box sx={{ minWidth: `calc(100vw - ${sideBarWidth}px)` }}>
                    <AdminNavBar
                        currentLabel="Trang chủ"
                        auth sideBarWidth={sideBarWidth}
                        toogleSideBar={toogleSideBar}
                        open={open}
                    />
                    <Box sx={{ padding: 4 }}>
                        {getTabContent()}
                    </Box>
                </Box>

                {actionConfirm.isOpen
                    && <ActionConfirmBox
                        {...actionConfirm}
                        handleClose={handleCloseActionConfirm}
                    />
                }
            </Box>
        </Box>
    )
}

export default AdminHome
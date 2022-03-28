import { ChangeCircle, Flip, NewReleases } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'
import React from 'react'
import ConfirmBox from '../components/ConfirmBox'
import Container from '../components/Container'
import CustomizedNewAssetTables from '../components/CustomizedNewAssetTables'
import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'
import { getHomePageData } from '../contexts/actions'
import BasicAlerts from '../components/Alert'

const Waiting = () => {
    const { lands, user, setLands, setNotifyList } = React.useContext(AuthContext)

    const rows = lands.filter(land => land.value.Status === 'Chưa duyệt')
    const [selectedTab, setselectedTab] = React.useState(0)
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState('')

    const handleSelectTab = (event, index) => {
        setselectedTab(index)
    }

    const handleClose = async () => {
        await getHomePageData(user?.role, setLands, setNotifyList)
        setMessage('')
    }
    return (
        <Container>
            <NavBar />
            {message !== '' && <ConfirmBox message={message} handleConfirm={handleClose} />}
            {error !== '' && <BasicAlerts serverity={'error'} message={error} onClose={() => setError('')} />}
            <Box
                sx={{ paddingX: 8, paddingY: 5, display: 'flex', justifyContent: 'center', height: 'calc(100% - 64px)', gap: 3 }}
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
                                <ListItemText primary={'Đăng ký mới'} />
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
                                <ListItemText primary={'Chuyển đất'} />
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
                                <ListItemText primary={'Tách thửa'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Paper>
                <Box
                    sx={{ flex: 4 }}
                >
                    <CustomizedNewAssetTables rows={rows} setMessage={setMessage} setError={setError} />
                </Box>
            </Box>
        </Container>
    )
}

export default Waiting
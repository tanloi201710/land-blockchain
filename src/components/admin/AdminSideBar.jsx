import React from 'react'
import { AdminPanelSettings, Assignment, Dashboard, Equalizer, Person } from '@mui/icons-material'
import { Badge, Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material'

import { useTheme } from '@mui/material/styles'


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

const drawerWidthOpen = 240
const paddingIconButton = 10
const marginIconButton = 14
const iconFontSize = 20
const drawerWidthClose = (paddingIconButton + marginIconButton) * 2 + iconFontSize



const AdminSideBar = ({ open }) => {

    const drawerContent = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    height: '42px',
                    width: 'auto',
                    backgroundColor: 'transparent',
                    margin: '14px 14px',
                    padding: '12px 0px',
                    borderBottom: '1px solid lightgray',
                    color: 'lightgray'
                }}
            >
                <Typography
                    variant="h1"
                    noWrap={true}
                    sx={{
                        display: { xs: 'none', sm: 'initial' },
                        fontSize: '17px',
                        fontWeight: 600,
                        width: '154px',
                        color: 'lightgray',
                        marginLeft: open ? '0px' : '8px',
                        paddingBottom: '3px',
                    }}
                >
                    QUẢN LÝ ĐẤT ĐAI
                </Typography>
                <Box
                    sx={{
                        minWidth: 'initial',
                        padding: '0 10px',
                    }}
                >
                    <AdminPanelSettings color="inherit" sx={{ minWidth: 'initial' }} />
                </Box>
            </Box>
            <List dense={true}>
                {tabList.map((key, index) => (
                    <React.Fragment key={index}>
                        <Tooltip
                            title={open ? key.desc : ''}
                            placement={'right'}
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        backgroundColor: 'gray',
                                        color: 'white',
                                        marginLeft: '22px !important',
                                        boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
                                    },
                                },
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    margin: '6px 14px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: '#26284687',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: '46px' }}>
                                    <Badge
                                        badgeContent={0}
                                        color="secondary"
                                        variant="dot"
                                    >
                                        <key.icon sx={{ fontSize: '20px', color: 'lightgray' }} />
                                    </Badge>
                                </ListItemIcon>

                                <ListItemText
                                    primary={key.desc}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                    }}
                                    sx={{
                                        display: 'inline',
                                        margin: '0px',
                                        overflowX: 'hidden',
                                        color: 'lightgray',
                                        whiteSpace: 'nowrap',
                                        minWidth: '126px',
                                    }}
                                />

                            </ListItemButton>
                        </Tooltip>

                    </React.Fragment>
                ))}
                <Divider variant="middle" light={true} />
            </List>
        </>
    )

    const theme = useTheme()

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: open
                    ? { xs: '0px', sm: drawerWidthClose }
                    : { xs: drawerWidthClose, sm: drawerWidthOpen },
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: open
                        ? theme.transitions.duration.leavingScreen
                        : theme.transitions.duration.enteringScreen,
                }),
                '& .MuiDrawer-paper': {
                    justifyContent: 'flex-start',
                    gap: 2,
                    overflowX: 'hidden',
                    width: open
                        ? { xs: '0px', sm: drawerWidthClose }
                        : { xs: drawerWidthClose, sm: drawerWidthOpen },
                    borderRight: '0px',
                    boxShadow: theme.shadows[8],
                    backgroundColor: open ? '#424242' : '#424242',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: open
                            ? theme.transitions.duration.leavingScreen
                            : theme.transitions.duration.enteringScreen,
                    }),
                },
            }}
        >
            {drawerContent}
        </Drawer>
    )
}

export default AdminSideBar
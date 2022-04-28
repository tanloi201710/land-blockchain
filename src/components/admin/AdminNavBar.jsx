import React from 'react'
import { useTheme } from '@mui/material/styles'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'

const AdminNavBar = ({ curentLabel, auth, sideBarWidth, toogleSideBar, open }) => {

    const theme = useTheme()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    console.log(sideBarWidth)

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <AppBar
            position="static"
            sx={{
                width: `calc(100vw - ${sideBarWidth}px)`,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: open
                        ? theme.transitions.duration.leavingScreen
                        : theme.transitions.duration.enteringScreen,
                })
            }}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={toogleSideBar}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {curentLabel}
                </Typography>
                {auth && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default AdminNavBar
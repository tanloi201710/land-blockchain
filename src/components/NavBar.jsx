import { AccountCircle, ArrowDropDown, Chat, MonetizationOn, MoreVert, Notifications, Logout } from '@mui/icons-material';
import { AppBar, Box, Badge, IconButton, Toolbar, Typography, InputBase, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles'
import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MessagesList from './MessagesList';
import NotifyList from './NotifyList';
import { AuthContext } from '../contexts/AuthContext';
import { readNotifications } from '../api';
import { getHomePageData } from '../contexts/actions';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const StyledMenuRegisters = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const items = [
    {
        name: 'Nguyen Van A',
        img: 'https://media.istockphoto.com/photos/young-woman-portrait-in-the-city-picture-id1009749608?k=20&m=1009749608&s=612x612&w=0&h=3bnVp0Y1625uKkSwnp7Uh2_y_prWbgRBH6a_6jRew3g=',
        message: 'Alo, are you ok?'
    },
    {
        name: 'Nguyen Van B',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdij8SFd0reXpy78vn7mGTqkon3JHqVPKiuyEg_dRkINtXN3uoRKej74RLaWw1Ri4wbaE&usqp=CAU',
        message: 'bye!'
    },
    {
        name: 'Nguyen Van C',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAzFb4Bf1FvCFnuawFxzDNZXETB7WjLZzM3wNAbHoa-aW6-72FMFOvMQmJdpQxsNcbn0&usqp=CAU',
        message: 'Nice!'
    },
    {
        name: 'Nguyen Van D',
        img: 'https://www.scienceofpeople.com/wp-content/uploads/2020/06/1072688_PeoplePleaser_1250px_051921.png',
        message: 'Yes!'
    },
    // {
    //     name: 'Nguyen Van C',
    //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAzFb4Bf1FvCFnuawFxzDNZXETB7WjLZzM3wNAbHoa-aW6-72FMFOvMQmJdpQxsNcbn0&usqp=CAU',
    //     message: 'Nice!'
    // },
    // {
    //     name: 'Nguyen Van D',
    //     img: 'https://www.scienceofpeople.com/wp-content/uploads/2020/06/1072688_PeoplePleaser_1250px_051921.png',
    //     message: 'Yes!'
    // },

]


const NavBar = () => {

    const { user, notifyList, setNotifyList, setLands } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const [anchorRegistersEl, setAnchorRegistersEl] = React.useState(null)
    const [anchorMessagesEl, setAnchorMessagesEl] = React.useState(null)
    const [anchorNotificationsEl, setAnchorNotificationsEl] = React.useState(null)
    const [anchorProfileEl, setAnchorProfileEl] = React.useState(null)

    const open = Boolean(anchorRegistersEl)
    const openMessages = Boolean(anchorMessagesEl)
    const openNotifications = Boolean(anchorNotificationsEl)
    const openProfile = Boolean(anchorProfileEl)

    const handleOpenRegistersMenu = (event) => {
        setAnchorRegistersEl(event.currentTarget)
    };
    const handleCloseRegistersMenu = () => {
        setAnchorRegistersEl(null)
    };

    const handleOpenMessagesMenu = (event) => {
        setAnchorMessagesEl(event.currentTarget)
    }

    const handleCloseMessagesMenu = () => {
        setAnchorMessagesEl(null)
    }

    const handleOpenNotificationsMenu = async (event) => {
        setAnchorNotificationsEl(event.currentTarget)
        // Read the notifications
        if (notifyList.filter(notify => notify.Seen === false).length > 0) {
            const result = await readNotifications()

            if (!result.data.error) {
                await getHomePageData(user?.role, setLands, setNotifyList)
            }
        }
    }

    const handleCloseNotificationsMenu = () => {
        setAnchorNotificationsEl(null)
    }

    const handleOpenProfileMenu = (event) => {
        setAnchorProfileEl(event.currentTarget)
    }

    const handleCloseProfileMenu = () => {
        setAnchorProfileEl(null)
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <AppBar position="sticky">
            <Toolbar sx={{ height: 45 }}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Typography variant="h6" className="activeHover" sx={{ fontWeight: 'bold', color: '#fff' }} >LAND MANAGEMENT</Typography>
                </Link>
                {/* {user.role !== 'user' ?
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    
                } */}
                <Box sx={{ width: 30 }}>

                </Box>
                <Box sx={{ display: 'flex', gap: 2.5 }}>
                    <Link
                        to={'/'}
                        className="link-a"
                    >
                        <Typography variant="button" className={location.pathname === '/' ? 'active activeHover' : 'activeHover'} sx={{ color: 'white' }}>
                            Trang chủ
                        </Typography>
                    </Link>
                    {user.role === 'user' ?
                        <>
                            <Box
                                id="customized-button"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                aria-controls={open ? 'customized-menu' : undefined}
                                sx={{ display: 'flex', alignItems: 'center', color: 'white', cursor: 'pointer' }}
                                onClick={handleOpenRegistersMenu}
                            >
                                <Typography variant="button" className="activeHover" sx={{ color: 'inherit' }}>Thủ tục</Typography>
                                <ArrowDropDown color='inherit' />
                            </Box>
                            <StyledMenuRegisters
                                id="customized-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'customized-button',
                                }}
                                anchorEl={anchorRegistersEl}
                                open={open}
                                onClose={handleCloseRegistersMenu}
                            >
                                <MenuItem onClick={() => navigate('/addLand')} disableRipple>
                                    Đăng ký đất mới
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/transferLand')} disableRipple>
                                    Chuyển quyền sử dụng đất
                                </MenuItem>
                                <MenuItem onClick={handleCloseRegistersMenu} disableRipple>
                                    Chỉnh sửa thông tin đất
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/splitLand')} disableRipple>
                                    Tách thửa đất
                                </MenuItem>

                            </StyledMenuRegisters>
                            <Link
                                to={'/transfering'}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="button" className={location.pathname === '/transfering' ? 'active activeHover' : 'activeHover'} sx={{ color: 'white' }}>Đất chuyển</Typography>
                            </Link>
                            <Link
                                to={'/received'}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="button" className={location.pathname === '/received' ? 'active activeHover' : 'activeHover'} sx={{ color: 'white' }}>Đất nhận</Typography>
                            </Link>
                            <Link
                                to={'/splitRequest'}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="button" className={location.pathname === '/splitRequest' ? 'active activeHover' : 'activeHover'} sx={{ color: 'white' }}>Tách thửa</Typography>
                            </Link>
                            <Link
                                to={'/market'}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="button" className={location.pathname === '/market' ? 'active activeHover' : 'activeHover'} sx={{ color: 'white' }}>Mua bán đất</Typography>
                            </Link>
                        </> :
                        <>
                            <Link
                                to={'/waiting'}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="button" className={location.pathname === '/waiting' ? 'active activeHover' : 'activeHover'} sx={{ color: 'white' }}>Chờ duyệt</Typography>
                            </Link>
                            <Link
                                to={'/recharge'}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="button" className={location.pathname === '/recharge' ? 'active activeHover' : 'activeHover'} sx={{ color: 'white' }}>Nạp tiền</Typography>
                            </Link>
                            <Link
                                to={'/statistical'}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="button" className={location.pathname === '/statistical' ? 'active activeHover' : 'activeHover'} sx={{ color: 'white' }}>Thống kê</Typography>
                            </Link>
                        </>
                    }


                </Box>

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                    <Tooltip title='Tin nhắn'>
                        <IconButton
                            size="large"
                            aria-label="show new messages"
                            color="inherit"
                            id="button-show-messages"
                            aria-haspopup="true"
                            aria-expanded={openMessages ? 'true' : undefined}
                            aria-controls={openMessages ? 'menu-messages' : undefined}
                            onClick={handleOpenMessagesMenu}
                        >
                            <Badge badgeContent={items.length} color="error">
                                <Chat fontSize='inherit' />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-messages"
                        MenuListProps={{
                            'aria-labelledby': 'button-show-messages',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        anchorEl={anchorMessagesEl}
                        open={openMessages}
                        onClose={handleCloseMessagesMenu}
                    >
                        <MessagesList items={items} />
                    </Menu>
                    <Tooltip title='Thông báo'>
                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            id="button-show-notifications"
                            aria-haspopup="true"
                            aria-expanded={openNotifications ? 'true' : undefined}
                            aria-controls={openNotifications ? 'menu-notifications' : undefined}
                            onClick={handleOpenNotificationsMenu}
                        >
                            <Badge badgeContent={notifyList.filter(notify => notify.Seen === false).length} color="error">
                                <Notifications fontSize='inherit' />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-notifications"
                        MenuListProps={{
                            'aria-labelledby': 'button-show-notifications',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        anchorEl={anchorNotificationsEl}
                        open={openNotifications}
                        onClose={handleCloseNotificationsMenu}
                    >
                        <NotifyList items={notifyList} />
                    </Menu>
                    {user.role === 'user' &&
                        <Tooltip title='Ví'>
                            <IconButton

                                size="large"
                                aria-label='user wallet'
                                color='inherit'
                                onClick={() => navigate('/wallet')}
                            >
                                <MonetizationOn fontSize='inherit' />
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip title={user.fullname}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            color="inherit"
                            id="button-show-profile"
                            aria-haspopup="true"
                            aria-expanded={openProfile ? 'true' : undefined}
                            aria-controls={openProfile ? 'menu-profile' : undefined}
                            onClick={handleOpenProfileMenu}
                        >
                            <AccountCircle fontSize='inherit' />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="menu-profile"
                        MenuListProps={{
                            'aria-labelledby': 'button-show-profile',
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        anchorEl={anchorProfileEl}
                        open={openProfile}
                        onClose={handleCloseProfileMenu}
                    >
                        <MenuItem onClick={() => navigate('/account')} disableRipple>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText>Hồ sơ</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleLogout} disableRipple>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText>Đăng xuất</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="show more"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <MoreVert />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
};

export default NavBar;

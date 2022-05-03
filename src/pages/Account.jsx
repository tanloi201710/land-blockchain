import React from 'react'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { checkPassword, updateInfo } from '../api'
import Container from '../components/Container'
import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'
import RePasswordBox from '../components/RePasswordBox'
import ConfirmBox from '../components/ConfirmBox'
import BasicAlerts from '../components/Alert'

const Account = () => {

    // styles
    const accountHeader = {
        display: 'flex',
        justifyContent: 'center',
        height: 100,
        alignItems: 'center',
        gap: 3,
        mt: 2,
    }

    const avatarWrapper = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1
    }

    const avatar = {
        width: 72,
        height: 72
    }

    const name = {
        fontWeight: 'bold'
    }

    const accountContent = {
        padding: 2
    }

    const leftContent = {
        textAlign: 'right',
        color: 'text.secondary'
    }

    const rightContent = {
        fontWeight: 'bold'
    }

    const { user, setUser } = React.useContext(AuthContext)
    const navigate = useNavigate()

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { Date, Time, accessToken, role, timestamp, ...other } = user

    const initialData = {
        ...other,
        password: ''
    }

    const [mode, setMode] = React.useState('seen')
    const [dataEdit, setDataEdit] = React.useState(initialData)
    const [openRepassword, setOpenRepassword] = React.useState(false)
    const [oldPassword, setOldPassword] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState('')
    const [isSignout, setIsSignout] = React.useState(false)

    const handleChangeMode = (mode) => {
        setMode(mode)
    }

    const handleChangeData = (event) => {
        setDataEdit({ ...dataEdit, [event.target.name]: event.target.value })
    }

    const decodeBirthday = (birthDay) => {
        const birthArray = birthDay.split('/')
        const sortedBirthDay = [birthArray[2], birthArray[1], birthArray[0]]
        return sortedBirthDay.join('-')
    }

    console.log(decodeBirthday(user.birthDay))

    const handleSave = (event) => {
        event.preventDefault()
        setOpenRepassword(true)
    }

    const handleSubmit = async () => {
        const result = await checkPassword({ password: oldPassword })
        if (!result.data.error) {
            const result1 = await updateInfo(dataEdit)
            if (!result1.data.error) {
                setMessage(result1.data.message)
                if (Boolean(result1.data?.user)) {
                    setUser(result1.data.user)
                } else {
                    setIsSignout(true)
                }
            } else {
                setError(result1.data.message)
            }
        } else {
            setError(result.data.message)
        }
    }

    const handleCloseConfirm = () => {
        setMessage('')
        if (isSignout) {
            localStorage.removeItem('user')
            navigate('/login')
        } else {
            setMode('seen')
        }
    }

    const getContent = () => {
        switch (mode) {
            case 'seen':
                return <SeenMode rightContent={rightContent} leftContent={leftContent} user={user} />

            case 'edit':
                return <EditMode
                    dataEdit={dataEdit}
                    handleChangeData={handleChangeData}
                    handleSave={handleSave}
                    decodeBirthday={decodeBirthday}
                />

            default:
                break
        }
    }
    return (
        <Container>
            <NavBar />
            {message !== '' && <ConfirmBox message={message} handleConfirm={handleCloseConfirm} />}
            {error !== ''
                && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BasicAlerts serverity="error" message={error} onClose={() => setError('')} />
                </Box>
            }
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Box sx={{ width: 1000, padding: 2 }} component={Paper}>
                    <Typography variant="h6" sx={{ textAlign: 'center' }} >Tài khoản</Typography>
                    <Box sx={accountHeader}>
                        <Box sx={avatarWrapper}>
                            <Avatar alt={user.fullname} src={`${PF}images/avatar.jpeg`} sx={avatar} />
                            <Typography variant="body1" sx={name} >{user.fullname}</Typography>
                        </Box>
                        <Button variant="contained" onClick={() => handleChangeMode('seen')}>Xem</Button>
                        <Button variant="contained" onClick={() => handleChangeMode('edit')}>Chỉnh sửa</Button>
                    </Box>
                    <Box sx={accountContent}>
                        {getContent()}
                    </Box>
                </Box>

            </Box>
            {openRepassword && <RePasswordBox oldPassword={oldPassword} setOldPassword={setOldPassword} handleSubmit={handleSubmit} />}
        </Container>
    )
}

const SeenMode = ({ rightContent, leftContent, user }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={6} sx={leftContent}>
                <Typography variant="subtitle1">Email</Typography>
                <Typography variant="subtitle1">Số điện thoại</Typography>
                <Typography variant="subtitle1">Địa chỉ</Typography>
                <Typography variant="subtitle1">Số CMND/CCCD</Typography>
                <Typography variant="subtitle1">Năm sinh</Typography>
            </Grid>
            <Grid item xs={6} sx={rightContent}>
                <Typography variant="subtitle1">{user.userId}</Typography>
                <Typography variant="subtitle1">{user.phoneNumber}</Typography>
                <Typography variant="subtitle1">{user?.Address || 'Chưa cập nhật'}</Typography>
                <Typography variant="subtitle1">{user.idCard}</Typography>
                <Typography variant="subtitle1">{user.birthDay}</Typography>
            </Grid>
        </Grid>
    )
}

const EditMode = ({ dataEdit, handleChangeData, handleSave, decodeBirthday }) => {
    return (
        <Grid container spacing={3} >
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='Email'
                    name='userId'
                    value={dataEdit.userId}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='Số điện thoại'
                    name='phoneNumber'
                    value={dataEdit.phoneNumber}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='Địa chỉ'
                    name='Address'
                    value={dataEdit?.Address}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    disabled
                    label='Số CMND/CCCD'
                    name='idCard'
                    value={dataEdit.idCard}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='Năm sinh'
                    type='date'
                    name='birthDay'
                    InputLabelProps={{ shrink: true }}
                    value={decodeBirthday(dataEdit.birthDay)}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label='Mật khẩu'
                    type='password'
                    name='password'
                    value={dataEdit.password}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' onClick={handleSave} >Lưu</Button>
            </Grid>
        </Grid>
    )
}

export default Account
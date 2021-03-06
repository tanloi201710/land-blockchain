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
        height: 72,
        border: '1px solid rgba(0,0,0,0.2)'
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
        if (birthDay.includes('/')) {
            const birthArray = birthDay.split('/')
            const sortedBirthDay = [birthArray[2], birthArray[1], birthArray[0]]
            return sortedBirthDay.join('-')
        }
        return birthDay
    }

    const encodeBirthDay = (birthDay) => {
        if (birthDay.includes('-')) {
            const birthArray = birthDay.split('-')
            const sortedBirthDay = [birthArray[2], birthArray[1], birthArray[0]]
            return sortedBirthDay.join('/')
        }
        return birthDay
    }


    const handleSave = (event) => {
        event.preventDefault()
        setOpenRepassword(true)
    }

    const handleSubmit = async () => {
        dataEdit.birthDay = encodeBirthDay(dataEdit.birthDay)
        const result = await checkPassword({ password: oldPassword })
        if (!result.data.error) {
            const result1 = await updateInfo(dataEdit)
            if (!result1.data.error) {
                setOpenRepassword(false)
                setOldPassword('')
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
                    <Typography variant="h6" sx={{ textAlign: 'center' }} >T??i kho???n</Typography>
                    <Box sx={accountHeader}>
                        <Box sx={avatarWrapper}>
                            <Avatar alt={user.fullname} src={`${PF}images/userOne.png`} sx={avatar} />
                            <Typography variant="body1" sx={name} >{user.fullname}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            onClick={() => handleChangeMode('seen')}
                            color="info"
                            disabled={mode === 'seen'}
                        >
                            Xem
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleChangeMode('edit')}
                            color="warning"
                            disabled={mode === 'edit'}
                        >
                            Ch???nh s???a
                        </Button>
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
                <Typography variant="subtitle1">S??? ??i???n tho???i</Typography>
                <Typography variant="subtitle1">?????a ch???</Typography>
                <Typography variant="subtitle1">S??? CMND/CCCD</Typography>
                <Typography variant="subtitle1">N??m sinh</Typography>
            </Grid>
            <Grid item xs={6} sx={rightContent}>
                <Typography variant="subtitle1" sx={rightContent}>{user.userId}</Typography>
                <Typography variant="subtitle1" sx={rightContent}>{user.phoneNumber.replace('+84', '0')}</Typography>
                <Typography variant="subtitle1" sx={rightContent}>{user?.address || 'Ch??a c???p nh???t'}</Typography>
                <Typography variant="subtitle1" sx={rightContent}>{user?.idCard || 'Ch??a c???p nh???t'}</Typography>
                <Typography variant="subtitle1" sx={rightContent}>{user?.birthDay || 'Ch??a c???p nh???t'}</Typography>
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
                    disabled
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='S??? ??i???n tho???i'
                    name='phoneNumber'
                    value={dataEdit.phoneNumber.replace('+84', '0')}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='?????a ch???'
                    name='address'
                    value={dataEdit?.address}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='S??? CMND/CCCD'
                    name='idCard'
                    value={dataEdit.idCard}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label='N??m sinh'
                    type='date'
                    name='birthDay'
                    InputLabelProps={{ shrink: true }}
                    value={decodeBirthday(dataEdit?.birthDay || '0/0/0')}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label='M???t kh???u'
                    type='password'
                    name='password'
                    value={dataEdit.password}
                    onChange={(event) => handleChangeData(event)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' onClick={handleSave} >L??u</Button>
            </Grid>
        </Grid>
    )
}

export default Account
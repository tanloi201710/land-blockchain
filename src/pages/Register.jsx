import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Box, Typography, Button, Grid, CircularProgress, TextField } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'

import background from '../images/login-register-background.jpg'
import Input from '../components/Input'
import BasicAlerts from '../components/Alert'
import { register } from '../api'

const Register = () => {
    const emailValidator = /^[a-z0-9]((\.|\+)?[a-z0-9]){2,}@g(oogle)?mail\.com$/;
    const passwordValidator = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const phoneValidator = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

    const initialData = {
        fullname: '',
        email: '',
        password: '',
        rePassword: '',
        idCard: '',
        phoneNumber: '',
        birthDay: '',
        fullNameValidate: '',
        emailValidate: '',
        passwordValidate: '',
        rePasswordValidate: '',
        idCardValidate: '',
        phoneNumberValidate: '',
        birthDayValidate: '',
    }

    const initialError = {
        isShown: false,
        message: ''
    }

    const [data, setData] = React.useState(initialData)
    const [showPassword, setShowPassword] = React.useState(false)
    const [warning, setWarning] = React.useState(false)
    const [error, setError] = React.useState(initialError)
    const [info, setInfo] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const navigate = useNavigate()

    const handleShowPassword = () => { setShowPassword(prev => !prev) }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const checkName = validateFullName()
        const checkEmail = validateEmail()
        const checkPassword = validatePassword()
        const checkRePassword = validateRePassword()
        const checkIdCard = validateIdCard()
        const checkPhoneNumber = validatePhoneNumber()
        const checkBirthDay = validateBirthDay()

        if (checkName && checkEmail && checkPassword && checkRePassword && checkIdCard && checkPhoneNumber && checkBirthDay) {
            // register
            const formData = {
                email: data.email,
                fullName: data.fullname,
                password: data.password,
                phoneNumber: data.phoneNumber,
                idCard: data.idCard,
                birthDay: data.birthDay
            }
            setLoading(true)

            const result = await register(formData)
            if (result.data.error) {
                setLoading(false)
                setError({
                    isShown: true,
                    message: result.data.message
                })
            } else {
                setLoading(false)
                setInfo(result.data.message)
                setTimeout(() => { navigate('/login') }, 2000)
            }

        } else {
            // retry to validate
            console.log('something went wrong');
            setWarning(true)
        }
        // setData(initialData)
    }

    const validateFullName = () => {
        let helperText = ''
        const fullName = data.fullname
        if (fullName === '') helperText = 'H??? v?? t??n kh??ng ???????c ????? tr???ng'

        setData({ ...data, fullNameValidate: helperText })

        return helperText === ''
    }

    const validateEmail = () => {
        let helperText = ''
        const email = data.email
        if (email === '') helperText = 'Email kh??ng ???????c ????? tr???ng'
        else if (!emailValidator.test(email)) helperText = 'Email ph???i c?? d???ng: example@gmail.com'

        setData({ ...data, emailValidate: helperText })

        return helperText === ''
    };

    const validatePhoneNumber = () => {
        let helperText = ''
        const phoneNumber = data.phoneNumber
        if (phoneNumber === '') helperText = 'S??? ??i???n tho???i kh??ng ???????c ????? tr???ng'
        else if (!phoneValidator.test(phoneNumber)) helperText = 'S??? ??i???n tho???i kh??ng ????ng'

        setData({ ...data, phoneNumberValidate: helperText })

        return helperText === ''
    }

    const validatePassword = () => {
        let helperText = ''
        const password = data.password
        if (password === '') helperText = 'M???t kh???u kh??ng ???????c ????? tr???ng'
        else if (!passwordValidator.test(password)) helperText = 'M???t kh???u ph???i c?? t??? 6 - 16 k?? t??? v?? kh??ng ch???a { d???u c??ch }'

        setData({ ...data, passwordValidate: helperText })

        return helperText === ''
    }

    const validateRePassword = () => {
        let helperText = ''
        const rePassword = data.rePassword
        const password = data.password
        if (rePassword === '') helperText = 'Nh???p l???i m???t kh???u kh??ng ???????c ????? tr???ng'
        else if (rePassword !== password) helperText = 'Nh???p l???i m???t kh???u kh??ng ????ng'

        setData({ ...data, rePasswordValidate: helperText })

        return helperText === ''
    }

    const validateIdCard = () => {
        let helperText = ''
        const idCard = data.idCard
        if (idCard === '') helperText = 'CMND/CCCD Kh??ng ???????c ????? tr???ng'

        setData({ ...data, idCardValidate: helperText })

        return helperText === ''
    }

    const validateBirthDay = () => {
        let helperText = ''
        const birthDay = data.birthDay
        if (birthDay === '') helperText = 'Ng??y sinh kh??ng ???????c ????? tr???ng'

        setData({ ...data, birthDayValidate: helperText })

        return helperText === ''
    }

    const handleClose = () => {
        setWarning(false)
        setError(initialError)
        setInfo('')
    }

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {warning ? <BasicAlerts serverity="warning" message={'Vui l??ng ki???m tra l???i th??ng tin!'} onClose={handleClose} /> : null}
            {error.isShown ? <BasicAlerts serverity="error" message={error.message} onClose={handleClose} /> : null}
            {info !== '' ? <BasicAlerts serverity="success" message={info} onClose={handleClose} /> : null}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: 500,
                    padding: 3,
                    backgroundColor: "background.paper",
                    borderRadius: 3
                }}

            >
                <Avatar sx={{ m: 1, bgcolor: 'error.light' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    ????ng k??
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Input
                            label="H??? v?? t??n"
                            name="fullname"
                            type="text"
                            autoFocus={true}
                            handleChange={handleChange}
                            error={data.fullNameValidate !== ''}
                            helperText={data.fullNameValidate}
                            onBlur={validateFullName}
                        />
                        <Input
                            label="?????a ch??? Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            handleChange={handleChange}
                            error={data.emailValidate !== ''}
                            helperText={data.emailValidate}
                            onBlur={validateEmail}
                        />
                        <Input
                            label="M???t kh???u"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword}
                            half
                            error={data.passwordValidate !== ''}
                            helperText={data.passwordValidate}
                            onBlur={validatePassword}
                        />
                        <Input
                            label="Nh???p l???i m???t kh???u"
                            name="rePassword"
                            type="password"
                            handleChange={handleChange}
                            half
                            error={data.rePasswordValidate !== ''}
                            helperText={data.rePasswordValidate}
                            onBlur={validateRePassword}
                        />
                        <Input
                            label="CMND/CCCD"
                            name="idCard"
                            type="text"
                            handleChange={handleChange}
                            error={data.idCardValidate !== ''}
                            helperText={data.idCardValidate}
                            onBlur={validateIdCard}
                        />
                        <Input
                            label="S??? ??i???n tho???i"
                            name="phoneNumber"
                            type="tel"
                            half
                            handleChange={handleChange}
                            error={data.phoneNumberValidate !== ''}
                            helperText={data.phoneNumberValidate}
                            onBlur={validatePhoneNumber}
                        />
                        <Grid item sx={12} sm={6}>
                            <TextField
                                label="Ng??y sinh"
                                name="birthDay"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true, required: true }}
                                onChange={handleChange}
                                error={data.birthDayValidate !== ''}
                                helperText={data.birthDayValidate}
                                onBlur={validateBirthDay}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? <CircularProgress color="inherit" size={25} /> : '????ng k??'}
                            </Button>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item >
                                <Link
                                    to={'/login'}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography variant="body2" component="p" sx={{ color: 'info.light' }}>???? c?? t??i kho???n? ????ng nh???p</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Register

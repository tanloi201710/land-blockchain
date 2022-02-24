import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Box, Typography, Button, Grid, CircularProgress } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'

import background from '../images/login-register-background.jpg'
import Input from '../components/Input'
import { login } from '../api'
import { AuthContext } from '../contexts/AuthContext'
import BasicAlerts from '../components/Alert'


const Login = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const initialData = {
        email: '',
        password: ''
    }
    const initialError = {
        isShow: false,
        message: ''
    }

    const [data, setData] = useState(initialData)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(initialError)


    const handleShowPassword = () => { setShowPassword(prev => !prev) }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await login(data)
            setLoading(false)
            console.log(result.data)

            if (result.data.error) {
                setError({
                    isShow: true,
                    message: result.data.message
                })
            } else {
                setUser(result.data.user)
                localStorage.setItem('user', JSON.stringify(result.data.user))
                navigate('/')
            }
        } catch (error) {
            // alert(error)
            console.log(error.message)
        }

    }

    const handleCloseError = () => {
        setError({
            isShow: false,
            message: ''
        })
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

            {error.isShow ? <BasicAlerts serverity="error" message={error.message} onClose={handleCloseError} /> : null}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: 500,
                    padding: 5,
                    backgroundColor: "background.paper",
                    borderRadius: 3
                }}

            >
                <Avatar sx={{ m: 1, bgcolor: 'error.light' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Input
                            label="Địa chỉ Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            handleChange={handleChange}
                            autoFocus={true}
                        />
                        <Input
                            label="Mật khẩu"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            handleChange={handleChange}
                            handleShowPassword={handleShowPassword}
                            autoComplete="current-password"
                        />
                        <Grid item xs={12} sm={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? <CircularProgress color="inherit" size={25} /> : "Đăng nhập"}
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Link
                                to={'/register'}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="body2" component="p" sx={{ color: 'info.light' }}>Quên mật khẩu</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                to={'/register'}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography variant="body2" component="p" sx={{ color: 'info.light' }}>Chưa có tài khoản? Đăng ký</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Login

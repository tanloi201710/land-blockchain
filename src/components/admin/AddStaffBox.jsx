import { Close } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'
import { provinces } from '../../data'
import BoxContainer from '../BoxContainer'
import Input from '../Input'

const AddStaffBox = ({ handleClose, handleChange, formData, handleSubmit }) => {

    const passwordValidator = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const [validate, setValidate] = React.useState({
        fullNameValidate: '',
        emailValidate: '',
        passwordValidate: '',
        cityValidate: '',
        phoneNumberValidate: '',
    })
    const [showPassword, setShowPassword] = React.useState(false)

    const handleShowPassword = () => { setShowPassword(prev => !prev) }

    const validateFullName = () => {
        let helperText = ''
        const fullName = formData.fullname
        if (fullName === '') helperText = 'Họ và tên không được để trống'

        setValidate({ ...validate, fullNameValidate: helperText })

        return helperText === ''
    }

    const validateCity = () => {
        let helperText = ''
        const city = formData.city
        if (city === '') helperText = 'Khu vực không được để trống'

        setValidate({ ...validate, cityValidate: helperText })

        return helperText === ''
    }

    const validateEmail = () => {
        let helperText = ''
        const email = formData.email
        if (email === '') helperText = 'Email không được để trống'

        setValidate({ ...validate, emailValidate: helperText })

        return helperText === ''
    }

    const validatePassword = () => {
        let helperText = ''
        const password = formData.password
        if (password === '') helperText = 'Mật khẩu không được để trống'
        else if (!passwordValidator.test(password)) helperText = 'Mật khẩu phải có từ 6 - 16 ký tự và không chứa { dấu cách }'

        setValidate({ ...validate, passwordValidate: helperText })

        return helperText === ''
    }

    const validatePhoneNumber = () => {
        let helperText = ''
        const phoneNumber = formData.phoneNumber
        if (phoneNumber === '') helperText = 'Mật khẩu không được để trống'

        setValidate({ ...validate, phoneNumberValidate: helperText })

        return helperText === ''
    }

    const disabledAction = () => {
        return Object.values(formData).some(field => field === '')
    }


    return (
        <BoxContainer>
            <Box
                sx={{
                    width: 600,
                    height: 430,
                    padding: 3,
                    borderRadius: 1,
                    backgroundColor: 'white'
                }}
            >
                <Box
                    sx={{
                        height: 15,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Box>
                <Typography variant="button" >Thêm nhân viên</Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Input
                        name="fullname"
                        label="Họ tên nhân viên"
                        autoFocus
                        type="text"
                        handleChange={handleChange}
                        value={formData.fullname}
                        error={validate.fullNameValidate !== ''}
                        helperText={validate.fullNameValidate}
                        onBlur={validateFullName}
                    />

                    <Input
                        name="userId"
                        label="Email"
                        type="email"
                        half
                        handleChange={handleChange}
                        value={formData.userId}
                        error={validate.emailValidate !== ''}
                        helperText={validate.emailValidate}
                        onBlur={validateEmail}
                    />

                    <Input
                        name="phoneNumber"
                        label="Số điện thoại"
                        type="tel"
                        half
                        handleChange={handleChange}
                        value={formData.phoneNumber}
                        error={validate.phoneNumberValidate !== ''}
                        helperText={validate.phoneNumberValidate}
                        onBlur={validatePhoneNumber}
                    />

                    <Input
                        name="password"
                        label="Mật khẩu"
                        type={showPassword ? "text" : "password"}
                        half
                        handleChange={handleChange}
                        handleShowPassword={handleShowPassword}
                        value={formData.password}
                        error={validate.passwordValidate !== ''}
                        helperText={validate.passwordValidate}
                        onBlur={validatePassword}
                    />

                    <Grid item xs={6}>
                        <TextField
                            select
                            name="city"
                            label="Khu vực"
                            fullWidth
                            value={formData.city}
                            onChange={handleChange}
                            error={validate.cityValidate !== ''}
                            helperText={validate.cityValidate}
                            onBlur={validateCity}
                        >
                            {
                                provinces.map((provinces, index) => (
                                    <MenuItem key={index} value={provinces} >
                                        {provinces}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button variant='contained' onClick={handleSubmit} disabled={disabledAction()}>
                            Thêm
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </BoxContainer>
    )
}

export default AddStaffBox
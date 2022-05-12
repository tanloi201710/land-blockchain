import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { rechargeManager } from '../api'
import BasicAlerts from '../components/Alert'
import ConfirmBox from '../components/ConfirmBox'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

const Recharge = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const container = {
        height: '100vh',
        overflowX: 'hidden',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.1)), url(${PF}images/addLandBackGround.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const wrapper = {
        paddingX: 8,
        paddingY: 5,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 64px - 68px)'
    }

    const cardWrapper = {
        width: 500,
        height: 350,
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }

    const cardHeader = {
        fontWeight: 500,
        display: 'flex',
        justifyContent: 'space-between'
    }

    const cardHeaderText = {
        fontWeight: 'bold',
        fontSize: 19
    }

    const buttonWrapper = {
        display: 'flex',
        justifyContent: 'center'
    }

    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState('')
    const [formData, setFormData] = React.useState({
        recipient: '',
        amount: 0
    })

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async () => {
        const result = await rechargeManager(formData)
        if (!result.data.error) {
            setMessage(result.data.message)
        } else {
            setError(result.data.message)
        }
    }

    const handleCloseConfirm = () => {
        setMessage('')
    }

    const disabledAction = () => {
        return formData.recipient === '' || formData.amount <= 0
    }

    return (
        <Box sx={container}>
            <NavBar />
            {message !== '' && <ConfirmBox message={message} handleConfirm={handleCloseConfirm} />}
            {error !== '' && <BasicAlerts serverity="error" message={error} onClose={() => setError('')} />}
            <Box
                sx={wrapper}
            >
                <Typography variant="h6" gutterBottom >NẠP TIỀN CHO NGƯỜI DÙNG</Typography>
                <Box>
                    <Paper
                        elevation={3}
                        sx={cardWrapper}
                    >
                        <Box sx={cardHeader}>
                            <Typography variant="body1" sx={cardHeaderText}>Land Token</Typography>
                            <Typography variant="button">1LTK = 1.000.000.000 VNĐ</Typography>
                        </Box>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Địa chỉ ví người dùng"
                                    type="text"
                                    name="recipient"
                                    fullWidth
                                    value={formData.recipient}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Số tiền(LTK)"
                                    type="number"
                                    name="amount"
                                    fullWidth
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sx={buttonWrapper}>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={disabledAction()}
                                >
                                    Nạp
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>

            </Box>
            <Footer />
        </Box>
    )
}

export default Recharge
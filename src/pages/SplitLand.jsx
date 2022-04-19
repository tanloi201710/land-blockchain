import { Box, Button, CircularProgress, Grid, MenuItem, Paper, TextField } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { splitLand } from '../api'
import BasicAlerts from '../components/Alert'
import ConfirmBox from '../components/ConfirmBox'
import Container from '../components/Container'
import NavBar from '../components/NavBar'
import { getHomePageData } from '../contexts/actions'
import { AuthContext } from '../contexts/AuthContext'

const SplitLand = () => {

    const { user, lands, setLands, setNotifyList } = React.useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const availableLands = lands.filter(land => land.value.Status === 'Đã duyệt')

    const defaultValueLand = {}

    const [numOfLands, setNumOfLands] = React.useState(2)
    const [areaOfLands, setAreaOfLands] = React.useState({})
    const [currentLand, setCurrentLand] = React.useState(location?.state || {})
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState('')

    const [processing, setProcessing] = React.useState(false)

    console.log(currentLand)
    console.log(Object.values(areaOfLands))
    console.log(currentLand?.value?.DienTich - 20)

    const autoCheck = () => {
        return Object.values(areaOfLands).length > 0
            && Object.values(areaOfLands).length === numOfLands
            && Object.values(currentLand).length > 0
    }

    const handleSubmit = async () => {
        const formData = {
            key: currentLand.key,
            userRequest: currentLand.value.UserId,
            areaArray: Object.values(areaOfLands)
        }

        setProcessing(true)

        const result = await splitLand(formData)

        setProcessing(false)
        if (result.data.error) {
            console.log(result.data.message)
            setError(result.data.message)
            return
        }

        console.log(result.data.message)
        setMessage(result.data.message)

    }

    const handleCloseConfirm = async () => {
        await getHomePageData(user?.role, setLands, setNotifyList)
        navigate('/')
    }

    return (
        <Container>
            <NavBar />
            {message !== '' && <ConfirmBox message={message} handleConfirm={handleCloseConfirm} />}
            {error !== '' && <BasicAlerts serverity="error" message={error} onClose={() => setError('')} />}
            <Box sx={{ width: '100vw', minHeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper sx={{ width: 600, p: 5 }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                required
                                name='landKey'
                                label='Chọn mãnh đất'
                                value={availableLands.find(land => land.key === currentLand?.key) || ''}
                                onChange={(e) => {
                                    const land = e.target.value
                                    setCurrentLand(land)
                                }}
                            >
                                {availableLands.length > 0 ? availableLands.map((land, index) => (
                                    <MenuItem key={index} value={land}>
                                        {land.key}
                                    </MenuItem>
                                )) : <MenuItem value={defaultValueLand} disabled={true}>
                                    Không có đất phù hợp để chuyển
                                </MenuItem>
                                }
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                color='info'
                                label='Thửa đất số'
                                disabled
                                fullWidth
                                value={currentLand?.value?.ThuaDatSo || ""}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Diện tích'
                                disabled
                                fullWidth
                                value={currentLand?.value?.DienTich || ""}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Địa chỉ'
                                disabled
                                fullWidth
                                value={currentLand?.value?.Address || ""}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label='Thời gian đăng ký'
                                disabled
                                fullWidth
                                value={currentLand?.value?.ThoiGianDangKy || ""}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label='Số thửa muốn tách'
                                name='tongSo'
                                type='number'
                                InputProps={{ inputProps: { min: 2, max: 2 } }}
                                value={numOfLands}
                                onChange={(e) => setNumOfLands(e.target.value)}
                            />
                        </Grid>
                        {
                            [...Array(parseInt(numOfLands || '0', 10))].map((value, index) => (
                                <Grid item xs={6} key={index} >
                                    <TextField
                                        required
                                        fullWidth
                                        name={`a${index + 1}`}
                                        type='number'
                                        label={`Diện tích thửa ${index + 1}`}
                                        disabled={index + 1 === numOfLands}
                                        value={areaOfLands[index] || 0}
                                        onChange={(event) => setAreaOfLands({
                                            ...areaOfLands, [index]: event.target.value,
                                            [numOfLands - 1]: Math.round(currentLand?.value?.DienTich - event.target.value).toString()
                                        })}
                                    />
                                </Grid>
                            ))
                        }

                        <Grid item xs={12}>
                            <Button variant='contained' onClick={handleSubmit} disabled={!autoCheck() || processing}>
                                {processing ? <CircularProgress size={25} color='inherit' /> : 'Gửi yêu cầu'}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    )
}

export default SplitLand
import { Box, Grid, MenuItem, TextField } from '@mui/material'
import React from 'react'
import Container from '../components/Container'
import Input from '../components/Input'
import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'

const SplitLand = () => {
    const { lands } = React.useContext(AuthContext)

    const availableLands = lands.filter(land => land.value.Status === 'Đã duyệt')

    const defaultValueLand = {}

    const [numOfLands, setNumOfLands] = React.useState(0)
    const [areaOfLands, setAreaOfLands] = React.useState([])
    const [currentLand, setCurrentLand] = React.useState({})


    const handleChange = (event, index) => {
        let items = areaOfLands
        items[index] = event.target.value
        setAreaOfLands(items)
    }

    return (
        <Container>
            <NavBar />
            <Box sx={{ width: 600, display: 'flex', justifyContent: 'center' }}>
                <Grid container spacing={2}>
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

                    <Input
                        label='Số thửa muốn tách'
                        name='tongSo'
                        type='number'
                        value={numOfLands}
                        handleChange={(e) => setNumOfLands(e.target.value)}
                    />

                    {
                        [...Array(parseInt(numOfLands || '0', 10))].map((value, index) => (
                            <Grid item xs={6} key={index} >
                                <TextField
                                    required
                                    name={`a${index + 1}`}
                                    label={`Diện tích thửa ${index + 1}`}
                                    value={areaOfLands[index] || ''}
                                    onChange={(event) => handleChange(event, index)}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Container>
    )
}

export default SplitLand
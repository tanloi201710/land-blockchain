import { Close } from '@mui/icons-material'
import { Box, Grid, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'

const AddConstructionBox = ({ handleClose }) => {
    const initialConstruction = {
        loaiCongTrinh: '',
        hangMuc: '',
        dienTichXayDung: '',
        dienTichSan: '',
        hinhThucSoHuu: '',
        capCongTrinh: '',
        thoiHanSoHuu: '',
    }

    const [construction, setConstruction] = useState(initialConstruction)

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10
            }}
        >
            <Box
                sx={{
                    width: 500,
                    height: 450,
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
                <Typography variant="button" >Thêm công trình gắn liền với đất</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2, position: 'relative' }}>
                    <Grid item xs={12} >
                        <TextField
                            required
                            name='loaiCongTrinh'
                            label='Loại(tên) công trình'
                            value={construction.loaiCongTrinh}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            name='hangMuc'
                            label='Hạng mục công trình'
                            value={construction.hangMuc}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            name='dienTichXayDung'
                            label='Diện tích xây dựng'
                            value={construction.dienTichXayDung}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            name='dienTichSan'
                            label='Diện tích sàn'
                            value={construction.dienTichSan}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            name='hinhThucSoHuu'
                            label='Hình thức sỡ hữu'
                            value={construction.hinhThucSoHuu}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            name='capCongTrinh'
                            label='Cấp công trình'
                            value={construction.capCongTrinh}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            name='thoiHanSoHuu'
                            label='Thời hạn sỡ hữu'
                            value={construction.thoiHanSoHuu}
                            onChange={handleChange}
                        />

                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AddConstructionBox
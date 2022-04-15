import { Close } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { cap, hinhThucNhan, nhaO } from '../data'

const AddHouseBox = ({ handleClose, handleSubmit }) => {
    const initialHouse = {
        loaiNhaO: '',
        dienTichXayDung: '',
        dienTichSan: '',
        hinhThucSoHuu: '',
        capNhaO: '',
        thoiHanSoHuu: '',
    }

    const [house, setHouse] = useState(initialHouse)

    const handleChange = (event) => {
        setHouse({ ...house, [event.target.name]: event.target.value })
    }

    const checkEmpty = (object) => {
        return Object.values(object).some(value => value === '')
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
                    width: 600,
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
                <Typography variant="button" >Thêm nhà ở gắn liền với đất</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2, position: 'relative' }}>
                    <Grid item xs={12} >
                        <TextField
                            required
                            select
                            fullWidth
                            name='loaiNhaO'
                            label='Loại nhà ở'
                            value={house.loaiNhaO}
                            onChange={handleChange}
                        >
                            {nhaO.map((value, index) => (
                                <MenuItem key={index} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            name='dienTichXayDung'
                            label='Diện tích xây dựng (m&#178;)'
                            value={house.dienTichXayDung}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            name='dienTichSan'
                            label='Diện tích sàn (m&#178;)'
                            value={house.dienTichSan}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            select
                            fullWidth
                            name='hinhThucSoHuu'
                            label='Hình thức sỡ hữu'
                            value={house.hinhThucSoHuu}
                            onChange={handleChange}
                        >
                            {hinhThucNhan.map((value, index) => (
                                <MenuItem key={index} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            select
                            fullWidth
                            name='capNhaO'
                            label='Cấp nhà ở'
                            value={house.capNhaO}
                            onChange={handleChange}
                        >
                            {cap.map((value, index) => (
                                <MenuItem key={index} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            type='date'
                            name='thoiHanSoHuu'
                            label='Thời hạn sỡ hữu'
                            InputLabelProps={{ shrink: true, required: true }}
                            defaultValue={house.thoiHanSoHuu}
                            onChange={handleChange}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='contained' onClick={() => handleSubmit(house)} disabled={checkEmpty(house)}>
                            Thêm
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AddHouseBox
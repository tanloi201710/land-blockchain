import { Close } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { cap, congTrinh, hinhThucNhan } from '../data'
import BoxContainer from './BoxContainer'

const AddConstructionBox = ({ handleClose, handleSubmit }) => {
    const initialConstruction = {
        loaiCongTrinh: '',
        dienTichXayDung: '',
        dienTichSan: '',
        hinhThucSoHuu: '',
        capCongTrinh: '',
        thoiHanSoHuu: '',
    }

    const [construction, setConstruction] = useState(initialConstruction)

    const handleChange = (event) => {
        setConstruction({ ...construction, [event.target.name]: event.target.value })
    }

    const checkEmpty = (object) => {
        return Object.values(object).some(value => value === '')
    }

    // console.log(checkEmpty(construction))

    return (
        <BoxContainer>
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
                <Typography variant="button" >Thêm công trình gắn liền với đất</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2, position: 'relative' }}>
                    <Grid item xs={12} >
                        <TextField
                            required
                            select
                            fullWidth
                            name='loaiCongTrinh'
                            label='Loại công trình'
                            value={construction.loaiCongTrinh}
                            onChange={handleChange}
                        >
                            {congTrinh.map((value, index) => (
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
                            value={construction.dienTichXayDung}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            fullWidth
                            name='dienTichSan'
                            label='Diện tích sàn (m&#178;)'
                            value={construction.dienTichSan}
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
                            value={construction.hinhThucSoHuu}
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
                            name='capCongTrinh'
                            label='Cấp công trình'
                            value={construction.capCongTrinh}
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
                            defaultValue={construction.thoiHanSoHuu}
                            onChange={handleChange}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='contained' onClick={() => handleSubmit(construction)} disabled={checkEmpty(construction)}>
                            Thêm
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </BoxContainer>
    )
}

export default AddConstructionBox
import { AddBusiness } from '@mui/icons-material'
import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import provinces from '../data'
import CustomizedButton from './CustomizedButton'

const initialData = {
    createdAt: '',
    position: '',
    landArea: '',
}


const MarketFilter = (
    { handleOpen }
) => {
    const [data, setData] = useState(initialData)

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <Box
            sx={{
                paddingX: 2,
                paddingY: 4,
                height: 'calc(100vh - 64px)',
                width: 400,
            }}
        >
            <Typography variant='button' >Tìm kiếm</Typography>
            <Grid container spacing={2} sx={{ marginY: 1 }}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        select
                        name='createdAt'
                        label='Ngày đăng'
                        value={data.createdAt}
                        variant='outlined'
                        fullWidth
                        onChange={handleChange}
                    >
                        <MenuItem value=''>Tất cả</MenuItem>
                        <MenuItem value='1'>1 Tháng gần nhất</MenuItem>
                        <MenuItem value='2'>2 Tháng gần nhất</MenuItem>
                        <MenuItem value='3'>3 Tháng gần nhất</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        select
                        name='position'
                        label='Vị trí'
                        value={data.position}
                        variant='outlined'
                        fullWidth
                        onChange={handleChange}
                    >
                        <MenuItem value=''>Tất cả</MenuItem>
                        {
                            provinces.map((provinces, index) => (
                                <MenuItem key={index} value={provinces} >
                                    {provinces}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>

                <Grid item sx={12} sm={12}>
                    <TextField
                        select
                        name='landArea'
                        label='Diện tích'
                        value={data.landArea}
                        variant='outlined'
                        fullWidth
                        onChange={handleChange}
                    >
                        <MenuItem value=''>Tất cả</MenuItem>
                        <MenuItem value='30'>{'< 30 m2'}</MenuItem>
                        <MenuItem value='50'>{'< 50 m2'}</MenuItem>
                        <MenuItem value='100'>{'< 100 m2'}</MenuItem>
                        <MenuItem value='500'>{'< 500 m2'}</MenuItem>
                        <MenuItem value='1000'>{'< 1000 m2'}</MenuItem>
                        <MenuItem value='10000'>{'> 1000 m2'}</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            <Box
                sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}
            >

                <CustomizedButton variant='contained' >Tìm</CustomizedButton>
            </Box>
            <Divider sx={{ marginY: 5 }} />

            <Button
                variant='contained'
                fullWidth
                color='info'
                startIcon={<AddBusiness />}
                onClick={handleOpen}
            >
                Tạo bài viết
            </Button>
        </Box>
    )
}

export default MarketFilter
import { Close } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'

const CreatePost = ({ handleClose }) => {
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
                alignItems: 'center'
            }}
        // onClick={handleClose}
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
                <Typography variant="button" >Đăng tin bán đất</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            required
                            label="Chọn mãnh đất"
                        >
                            <MenuItem value={'dat1'}>
                                {'dat1'}
                            </MenuItem>
                            <MenuItem value={'dat2'}>
                                {'dat2'}
                            </MenuItem>
                            <MenuItem value={'dat3'}>
                                {'dat3'}
                            </MenuItem>
                            <MenuItem value={'dat4'}>
                                {'dat4'}
                            </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            label="Địa chỉ"
                            defaultValue={'123, 33/2, Ninh Kieu, Can Tho'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled
                            fullWidth
                            label="Diện tích"
                            defaultValue={'200 m2'}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type={'text'}
                            label='Giá khởi điểm'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained'>đăng tin</Button>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    )
}

export default CreatePost
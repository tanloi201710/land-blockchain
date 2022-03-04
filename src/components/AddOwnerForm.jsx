import { Close } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const AddOwnerForm = ({ handleClose, handleSubmit }) => {
    const initialOwner = {
        fullname: '',
        birthDate: '',
        idCard: '',
        address: ''
    }

    const [owner, setOwner] = useState(initialOwner)

    const handleChange = (event) => {
        setOwner({ ...owner, [event.target.name]: event.target.value })
    }

    const handleAddOwner = () => {
        handleSubmit(owner)
        handleClose()
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
                <Typography variant="button" >Thêm chủ sở hữu</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            name='fullname'
                            label="Họ tên"
                            value={owner.fullname}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            name='idCard'
                            label="CMND/CCCD"
                            value={owner.idCard}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            name='birthDate'
                            label='Năm sinh'
                            value={owner.birthDate}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            name='address'
                            label='Địa chỉ'
                            value={owner.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' onClick={handleAddOwner}>Thêm</Button>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    )
}

export default AddOwnerForm
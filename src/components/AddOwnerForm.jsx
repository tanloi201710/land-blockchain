import { Close } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, IconButton, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { getAllUser } from '../firebase/search'

const AddOwnerForm = ({ handleClose, handleSubmit, fetching, setFetching }) => {
    const initialOwner = {
        userId: '',
        fullname: '',
        birthDate: '',
        idCard: '',
        phoneNumber: ''
    }

    const { user } = useContext(AuthContext)

    const [owner, setOwner] = useState(initialOwner)
    const [users, setUsers] = useState([])


    const handleChange = async (event) => {
        setOwner({ ...owner, [event.target.name]: event.target.value })
        if (event.target.value.length > 1) {
            setFetching(true)
            const dataUsers = await getAllUser()

            setUsers(dataUsers.filter(u => u.userId.toLowerCase().includes(event.target.value) && u.userId !== user.userId))
            console.log(dataUsers)
            setFetching(false)
        } else {
            setUsers([])
        }
    }

    const handleAddOwner = () => {
        handleSubmit(owner)
        handleClose()
    }

    const handleChooseUser = (user) => {
        setUsers([])
        setOwner({
            ...owner,
            userId: user.userId,
            fullname: user.fullname,
            birthDate: user?.birthDate || '',
            idCard: user.idCard,
            phoneNumber: user?.phoneNumber.replace('+84', '0') || ''
        })
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
                <Grid container spacing={2} sx={{ marginTop: 2, position: 'relative' }}>

                    <Grid item xs={12} component="form" autoComplete="off">
                        <TextField
                            fullWidth
                            required
                            name='userId'
                            label="Email/userId"
                            value={owner.userId}
                            onChange={handleChange}
                        />
                        {(fetching || users.length > 0) &&
                            <List
                                component='nav'
                                sx={{ position: 'absolute', top: 80, left: 10, width: '100%', maxHeight: 150, overflowY: 'auto', backgroundColor: 'white', boxShadow: "0px 0px 10px #9E9E9E", zIndex: 999 }}
                            >
                                {
                                    users.map((user, index) => (
                                        <ListItemButton key={index} onClick={() => handleChooseUser(user)}>
                                            <ListItemText primary={user.userId} />
                                        </ListItemButton>
                                    ))
                                }
                                {
                                    fetching && <CircularProgress />
                                }

                            </List>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            disabled
                            name='fullname'
                            label="Họ tên"
                            value={owner.fullname}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled
                            name='idCard'
                            label="CMND/CCCD"
                            value={owner.idCard}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled
                            name='birthDate'
                            label='Năm sinh'
                            value={owner.birthDate}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            disabled
                            name='phoneNumber'
                            label='Số điện thoại'
                            value={owner.phoneNumber}
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
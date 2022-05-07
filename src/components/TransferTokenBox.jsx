import { Close } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'
import React from 'react'
import { AuthContext } from '../contexts/AuthContext'
import BoxContainer from './BoxContainer'
import { getAllUser } from '../firebase/search'

const TransferTokenBox = ({ handleClose, handleSubmit }) => {

    const initialReceiver = {
        userId: '',
        fullname: '',
        birthDate: '',
        idCard: '',
        phoneNumber: ''
    }

    const { user } = React.useContext(AuthContext)

    const [receiver, setReceiver] = React.useState(initialReceiver)
    const [users, setUsers] = React.useState([])
    const [amount, setAmount] = React.useState(0)
    const [fetching, setFetching] = React.useState(false)


    const handleChange = async (event) => {
        setReceiver({ ...receiver, [event.target.name]: event.target.value })
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

    const handleTranferToken = () => {
        handleSubmit(receiver, amount)
        handleClose()
    }

    const handleChooseUser = (user) => {
        setUsers([])
        setReceiver({
            ...receiver,
            userId: user.userId,
            fullname: user.fullname,
            birthDate: user?.birthDay || '',
            idCard: user.idCard,
            phoneNumber: user?.phoneNumber.replace('+84', '0') || ''
        })
    }

    const abledAction = () => {
        return parseInt(amount) !== 0 && receiver.fullname !== ''
    }

    return (
        <BoxContainer>
            <Box
                sx={{
                    width: 500,
                    height: 530,
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
                <Typography variant="button" >Chuyển tiền</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2, position: 'relative' }}>

                    <Grid item xs={12} component="form" autoComplete="off">
                        <TextField
                            fullWidth
                            required
                            name='userId'
                            label="Email/userId"
                            value={receiver.userId}
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
                            value={receiver.fullname}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled
                            name='idCard'
                            label="CMND/CCCD"
                            value={receiver.idCard}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled
                            name='birthDate'
                            label='Năm sinh'
                            value={receiver.birthDate}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            disabled
                            name='phoneNumber'
                            label='Số điện thoại'
                            value={receiver.phoneNumber}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Số coin muốn chuyển'
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">LTK</InputAdornment>
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            onClick={handleTranferToken}
                            disabled={!abledAction()}
                        >
                            Chuyển
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </BoxContainer>
    )
}

export default TransferTokenBox
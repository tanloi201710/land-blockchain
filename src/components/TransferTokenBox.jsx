import { Close } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'
import BoxContainer from './BoxContainer'

const TransferTokenBox = ({ handleClose, handleSubmit }) => {

    const [receiver, setReceiver] = React.useState('')
    const [amount, setAmount] = React.useState(0)

    const handleTranferToken = () => {
        handleSubmit(receiver, amount)
        handleClose()
    }


    const abledAction = () => {
        return parseInt(amount) !== 0 && receiver !== ''
    }

    return (
        <BoxContainer>
            <Box
                sx={{
                    width: 500,
                    height: 330,
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
                            name='receiver'
                            label="Địa chỉ ví nhận"
                            value={receiver}
                            onChange={(e) => setReceiver(e.target.value)}
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
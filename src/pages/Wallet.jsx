import { ContentCopy } from '@mui/icons-material'
import { Box, Button, CircularProgress, IconButton, Paper, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { getWallet, transferToken } from '../api'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import BasicAlerts from '../components/Alert'
import TransferTokenBox from '../components/TransferTokenBox'
import ConfirmBox from '../components/ConfirmBox'

const Wallet = () => {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    // styles
    const container = {
        height: '100vh',
        overflowX: 'hidden',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.1)), url(${PF}images/addLandBackGround.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const cardWrapper = {
        width: 500,
        height: 350,
        background: `linear-gradient(to bottom right, #424f66, #4384f8)`,
        color: 'white',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }

    const cardHeader = {
        fontWeight: 500
    }

    const cardContent = {
        display: 'flex',
        flexDirection: 'column',
        gap: 1
    }

    const cardBalance = {
        fontWeight: 'bold',
        fontSize: 24
    }

    const cardAccountId = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1
    }

    const exchangeToken = {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    }

    // states
    const [balance, setBalance] = React.useState(0)
    const [clipboard, setClipboard] = React.useState({
        copied: false,
        value: ''
    })
    const [isTransferTokenBox, setIsTransferTokenBox] = React.useState(false)
    const [error, setError] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [fetching, setFetching] = React.useState(false)

    // hooks

    React.useEffect(() => {
        (async () => {
            setFetching(true)
            const result = await getWallet()
            setFetching(false)
            if (!result.data.error) {
                setBalance(result.data.balance)
                setClipboard(prev => ({ ...prev, value: result.data.accountIdToken }))
            }
        })()
    }, [])

    React.useEffect(() => {
        if (clipboard.copied) {
            setInterval(() => {
                setClipboard(prev => ({ ...prev, copied: false }))
            }, 4000)
        }
    }, [clipboard.copied, setClipboard])

    // functions
    const handleCloseTransferToken = () => {
        setIsTransferTokenBox(false)
    }

    const handleTransferToken = async (to, amount) => {
        const formData = {
            from: clipboard.value,
            to,
            amount
        }

        const result = await transferToken(formData)
        if (!result.data.error) {
            setMessage(result.data.message)
        } else {
            setError(result.data.message)
        }
    }

    const handleCloseConfirm = () => {
        (async () => {
            setFetching(true)
            const result = await getWallet()
            setFetching(false)
            if (!result.data.error) {
                setBalance(result.data.balance)
                setClipboard(prev => ({ ...prev, value: result.data.accountIdToken }))
            }
        })()

        setMessage('');
    }

    return (
        <Box sx={container}>
            <NavBar />
            {error !== '' && <BasicAlerts serverity="error" message={error} onClose={() => setError('')} />}
            {message !== '' && <ConfirmBox message={message} handleConfirm={handleCloseConfirm} />}
            <Box
                sx={{
                    paddingX: 8,
                    paddingY: 5,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 64px - 68px)'
                }}

            >
                <Typography variant="h6" gutterBottom >VÍ TIỀN</Typography>
                <Box>
                    <ThemeProvider theme={darkTheme}>
                        <Paper
                            elevation={3}
                            sx={cardWrapper}
                        >
                            {fetching
                                ? <CircularProgress />
                                : <>
                                    <Box sx={cardHeader}>
                                        <Typography variant="body1">Land Token</Typography>
                                    </Box>
                                    <Box sx={cardContent}>
                                        <Box>
                                            <Typography sx={cardBalance} variant="h1" component="span">{balance}</Typography>
                                            &nbsp;&nbsp;
                                            <Typography variant="button" component="span">LTK</Typography>
                                        </Box>
                                        <Box sx={exchangeToken}>
                                            <Typography variant="button">1LTK = 1.000.000.000 VNĐ</Typography>
                                            <Typography variant="button">Nội bộ</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={cardAccountId}>
                                        <TextField
                                            label="Địa chỉ ví tiền"
                                            value={clipboard.value}
                                            disabled
                                            sx={{ minWidth: 350 }}
                                        />
                                        {clipboard.copied
                                            ? <Typography variant="subtitle1" component="span" color="lightgreen">✔ Đã copy</Typography>
                                            :
                                            <CopyToClipboard text={clipboard?.value}
                                                onCopy={() => setClipboard({ ...clipboard, copied: true })}
                                            >
                                                <span>
                                                    <Tooltip title="Sao chép địa chỉ">
                                                        <IconButton sx={{ color: 'white' }} disabled={clipboard.value === ''}>
                                                            <ContentCopy />
                                                        </IconButton>
                                                    </Tooltip>
                                                </span>
                                            </CopyToClipboard>
                                        }
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        sx={{ color: 'white' }}
                                        onClick={() => setIsTransferTokenBox(true)}
                                    >
                                        Chuyển tiền
                                    </Button>
                                </>
                            }
                        </Paper>
                    </ThemeProvider>
                </Box>
            </Box>
            <Footer />
            {isTransferTokenBox && <TransferTokenBox handleClose={handleCloseTransferToken} handleSubmit={handleTransferToken} />}
        </Box>
    )
}

export default Wallet
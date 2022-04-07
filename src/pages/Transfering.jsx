import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getSendLand } from '../api'
import Container from '../components/Container'
import CustomizedTransferTables from '../components/CustomizedTransferTables'
import ConfirmBox from '../components/ConfirmBox'
// import CustomizedTables from '../components/CustomizedTables'
import NavBar from '../components/NavBar'
import BasicAlerts from '../components/Alert'

const Transfering = () => {

    const [rows, setRows] = useState([])
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            const result = await getSendLand()
            if (result.data.error) {
                console.log(result.data.error)
                setError(result.data.message)
                return
            }
            setRows(result.data.trans)
        })()
    }, [])

    console.log(rows)
    const handleCloseConfirm = () => {
        // refetch data before closing the confirm box
        (async () => {
            const result = await getSendLand()
            if (result.data.error) {
                console.log(result.data.error)
                setError(result.data.message)
                return
            }
            setRows(result.data.trans)
        })()

        setMessage('')
    }

    return (
        <Container>
            <NavBar />
            {message !== '' && <ConfirmBox message={message} handleConfirm={handleCloseConfirm} />}
            {error !== '' && <BasicAlerts serverity="error" message={error} onClose={() => setError('')} />}
            <Box
                sx={{
                    paddingX: 8,
                    paddingY: 5,
                }}
            >
                <CustomizedTransferTables rows={rows} setMessage={setMessage} setError={setError} />
            </Box>
        </Container>
    )
}

export default Transfering
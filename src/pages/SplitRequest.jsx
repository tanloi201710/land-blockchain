import { Box } from '@mui/material'
import React from 'react'
import { getSplitRequest } from '../api'
import BasicAlerts from '../components/Alert'
import ConfirmBox from '../components/ConfirmBox'
import Container from '../components/Container'
import CustomizedSplitRequestTables from '../components/CustomizedSplitRequestTables'
import NavBar from '../components/NavBar'
import ProcessedDataBox from '../components/ProcessedDataBox'

const SplitRequest = () => {
    const [rows, setRows] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState('')
    const [processedData, setProcessedData] = React.useState([])

    useEffect(() => {
        (async () => {
            const result = await getSplitRequest()
            if (result.data.error) {
                console.log(result.data.error)
                setError(result.data.message)
                return
            }
            setRows(result.data.splitRequest)
        })()
    }, [])

    const handleCloseConfirm = () => {

    }

    const handleOpenDataProcesed = (data) => {
        setProcessedData(data)
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
                <CustomizedSplitRequestTables rows={rows} setMessage={setMessage} setError={setError} handleOpenDataProcesed={handleOpenDataProcesed} />
            </Box>
            {processedData.length > 0 && <ProcessedDataBox />}
        </Container>
    )
}

export default SplitRequest
import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getSplitRequest } from '../api'
import BasicAlerts from '../components/Alert'
import ConfirmBox from '../components/ConfirmBox'
import Container from '../components/Container'
import CustomizedSplitRequestTables from '../components/CustomizedSplitRequestTables'
import NavBar from '../components/NavBar'
import ProcessedDataBox from '../components/ProcessedDataBox'
import { getHomePageData } from '../contexts/actions'
import { AuthContext } from '../contexts/AuthContext'

const SplitRequest = () => {

    const navigate = useNavigate()

    const { user, setLands, setNotifyList } = React.useContext(AuthContext)

    const [rows, setRows] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState('')
    const [processedData, setProcessedData] = React.useState([])
    const [keyLand, setKeyLand] = React.useState('')
    const [keySplit, setKeySplit] = React.useState('')

    React.useEffect(() => {
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

    const handleCloseConfirm = async () => {
        setMessage('')
        await getHomePageData(user?.role, setLands, setNotifyList)
        navigate('/')

    }

    const handleOpenDataProcesed = (keyLand, keySplit, data) => {
        setKeyLand(keyLand)
        setKeySplit(keySplit)
        setProcessedData(data)
    }

    console.log(processedData)

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
            {processedData.length > 0
                && <ProcessedDataBox
                    keyLand={keyLand}
                    keySplit={keySplit}
                    data={processedData}
                    handleClose={() => setProcessedData([])}
                    setError={setError}
                    setMessage={setMessage}
                />}
        </Container>
    )
}

export default SplitRequest
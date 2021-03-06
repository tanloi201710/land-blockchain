import { Box, Typography } from '@mui/material'
import React from 'react'
import { getReceiveLand } from '../api'
import BasicAlerts from '../components/Alert'
import ConfirmBox from '../components/ConfirmBox'
import Container from '../components/Container'
import CustomizedReceiveTables from '../components/CustomizedReceiveTables'
// import CustomizedTables from '../components/CustomizedTables'
import NavBar from '../components/NavBar'
import NoData from '../components/NoData'
import { getHomePageData } from '../contexts/actions'
import { AuthContext } from '../contexts/AuthContext'

const Received = () => {

    const { user, setLands, setNotifyList } = React.useContext(AuthContext)
    const [rows, setRows] = React.useState([])
    const [message, setMessage] = React.useState('')
    const [error, setError] = React.useState('')

    React.useEffect(() => {
        (async () => {
            const result = await getReceiveLand()
            console.log(result.data)
            if (!result.data.error) {
                setRows(result.data.trans)
            }
        })()
    }, [])

    const handleCloseConfirm = async () => {
        await getHomePageData(user?.role, setLands, setNotifyList)
        setMessage('');
        (async () => {
            const result = await getReceiveLand()
            console.log(result.data)
            if (!result.data.error) {
                setRows(result.data.trans)
            }
        })()
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
                <Typography variant="h6" gutterBottom>DANH SÁCH ĐẤT ĐƯỢC CHUYỂN</Typography>
                {rows.length > 0
                    ? <CustomizedReceiveTables rows={rows} setMessage={setMessage} setError={setError} />
                    : <NoData />
                }
            </Box>
        </Container>
    )
}

export default Received
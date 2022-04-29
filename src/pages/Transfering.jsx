import { Box, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { getSendLand } from '../api'
import Container from '../components/Container'
import CustomizedTransferTables from '../components/CustomizedTransferTables'
import ConfirmBox from '../components/ConfirmBox'
// import CustomizedTables from '../components/CustomizedTables'
import NavBar from '../components/NavBar'
import BasicAlerts from '../components/Alert'
import { getHomePageData } from '../contexts/actions'
import { AuthContext } from '../contexts/AuthContext'
import NoData from '../components/NoData'

const Transfering = () => {

    const { user, setLands, setNotifyList } = useContext(AuthContext)

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
            setRows(result.data.trans.filter(item => item.value.TimeEnd === "-/-/-"))
            console.log(result.data.trans)
        })()
    }, [])

    console.log(rows)
    const handleCloseConfirm = async () => {
        // refetch data before closing the confirm box
        const result = await getSendLand()
        if (result.data.error) {
            console.log(result.data.error)
            setError(result.data.message)
            return
        }
        setRows(result.data.trans.filter(item => item.value.TimeEnd === "-/-/-"))

        setMessage('')

        await getHomePageData(user?.role, setLands, setNotifyList)
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
                <Typography variant="h6" gutterBottom>DANH SÁCH ĐẤT ĐANG CHUYỂN</Typography>
                {rows.length > 0
                    ? <CustomizedTransferTables rows={rows} setMessage={setMessage} setError={setError} />
                    : <NoData />
                }
            </Box>
        </Container>
    )
}

export default Transfering
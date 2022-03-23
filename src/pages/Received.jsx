import { Box } from '@mui/material'
import React from 'react'
import { getReceiveLand } from '../api'
import Container from '../components/Container'
import CustomizedReceiveTables from '../components/CustomizedReceiveTables'
// import CustomizedTables from '../components/CustomizedTables'
import NavBar from '../components/NavBar'

const Received = () => {
    const [rows, setRows] = React.useState([])

    React.useEffect(() => {
        (async () => {
            const result = await getReceiveLand()
            console.log(result.data)
            if (!result.data.error) {
                setRows(result.data.trans)
            }
        })()
    }, [])

    return (
        <Container>
            <NavBar />
            <Box
                sx={{
                    paddingX: 8,
                    paddingY: 5,
                }}
            >
                <CustomizedReceiveTables rows={rows} />
            </Box>
        </Container>
    )
}

export default Received
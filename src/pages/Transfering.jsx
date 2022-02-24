import { Box } from '@mui/material'
import React from 'react'
import Container from '../components/Container'
import CustomizedTables from '../components/CustomizedTables'
import NavBar from '../components/NavBar'

const Transfering = () => {
    function createData(code, time, info, transfer, status) {
        return { code, time, info, transfer, status }
    }

    const rows = [
        createData('01', "2022-01-8", 24, 4.0, 'Đã duyệt'),
        createData('02', "2022-01-6", 37, 4.3, 'Chưa duyệt'),
        createData('03', "2022-01-6", 16.0, 24, 'Đang chuyển'),
        createData('04', "2022-01-5", 16.0, 24, 'Đang chuyển'),
    ]

    return (
        <Container>
            <NavBar />
            <Box
                sx={{
                    paddingX: 8,
                    paddingY: 5,
                }}
            >
                <CustomizedTables rows={rows} />
            </Box>
        </Container>
    )
}

export default Transfering
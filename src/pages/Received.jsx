import { Box } from '@mui/material'
import React from 'react'
import Container from '../components/Container'
// import CustomizedTables from '../components/CustomizedTables'
import NavBar from '../components/NavBar'

const Received = () => {

    return (
        <Container>
            <NavBar />
            <Box
                sx={{
                    paddingX: 8,
                    paddingY: 5,
                }}
            >
                {/* <CustomizedTables rows={rows} /> */}
            </Box>
        </Container>
    )
}

export default Received
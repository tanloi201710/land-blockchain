import { Box } from '@mui/material'
import React from 'react'
import Container from '../components/Container'
// import CustomizedTables from '../components/CustomizedTables'
import NavBar from '../components/NavBar'

const Transfering = () => {

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

export default Transfering
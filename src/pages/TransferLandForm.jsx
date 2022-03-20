import React from 'react'
import Container from '../components/Container'
import NavBar from '../components/NavBar'
import CustomizedStepper from '../components/CustomizedStepper'
import { Box } from '@mui/material'

const TransferLandForm = () => {
    const initialValues = {
        owners: {},
        land: {}
    }

    const [values, setValues] = React.useState(initialValues)
    console.log(values.keyLand)

    return (
        <Container>
            <NavBar />
            <Box
                sx={{ paddingX: 8, paddingY: 5, display: 'flex', justifyContent: 'center' }}
            >
                <CustomizedStepper values={values} setValues={setValues} />

            </Box>
        </Container>
    )
}

export default TransferLandForm
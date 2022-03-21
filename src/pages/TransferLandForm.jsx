import React from 'react'
import Container from '../components/Container'
import NavBar from '../components/NavBar'
import CustomizedStepper from '../components/CustomizedStepper'
import { Box } from '@mui/material'
import { transferLand, transferLandCo } from '../api'
import { useLocation } from 'react-router-dom'

const TransferLandForm = () => {
    const location = useLocation()

    const initialValues = {
        owners: [],
        land: location?.state || {},
        amount: ''
    }

    const [values, setValues] = React.useState(initialValues)

    console.log(values.land)
    console.log(values.owners)
    console.log(location.state)

    const handleSubmit = async () => {
        if (values.owners.length === 0) return
        if (values.owners.length > 1) {
            const result = await transferLandCo(values)
            console.log(result.data.message)
        } else {
            const result = await transferLand(values)
            console.log(result.data.message)
        }
    }

    return (
        <Container>
            <NavBar />
            <Box
                sx={{ paddingX: 8, paddingY: 5, display: 'flex', justifyContent: 'center' }}
            >
                <CustomizedStepper values={values} setValues={setValues} handleSubmit={handleSubmit} />

            </Box>
        </Container>
    )
}

export default TransferLandForm
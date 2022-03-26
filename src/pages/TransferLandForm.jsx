import React from 'react'
import Container from '../components/Container'
import NavBar from '../components/NavBar'
import CustomizedStepper from '../components/CustomizedStepper'
import { Box } from '@mui/material'
import { transferLand, transferLandCo } from '../api'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { getHomePageData } from '../contexts/actions'
import ConfirmBox from '../components/ConfirmBox'

const TransferLandForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, setLands, setNotifyList } = React.useContext(AuthContext)

    const initialValues = {
        owners: [],
        land: location?.state || {},
        amount: ''
    }

    const [values, setValues] = React.useState(initialValues)
    const [message, setMessage] = React.useState('')
    const [processing, setProcessing] = React.useState(false)

    console.log(values.land)
    console.log(values.owners)
    console.log(location.state)

    const handleSubmit = async () => {
        if (values.owners.length === 0) return
        setProcessing(true)
        if (values.owners.length > 1) {
            const result = await transferLandCo(values)
            console.log(result.data.message)
            setMessage(result.data.message)
            setProcessing(false)
        } else {
            const result = await transferLand(values)
            console.log(result.data.message)
            setMessage(result.data.message)
            setProcessing(false)
        }
    }

    const handleConfirm = async () => {
        await getHomePageData(user?.role, setLands, setNotifyList)
        setMessage('')
        navigate('/')
    }

    return (
        <Container>
            <NavBar />
            {message !== '' && <ConfirmBox message={message} handleConfirm={handleConfirm} />}
            <Box
                sx={{ paddingX: 8, paddingY: 5, display: 'flex', justifyContent: 'center' }}
            >
                <CustomizedStepper values={values} setValues={setValues} handleSubmit={handleSubmit} processing={processing} />

            </Box>
        </Container>
    )
}

export default TransferLandForm
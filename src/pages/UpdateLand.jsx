import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container'
import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'
import AddLandForm from './AddLandForm'

const UpdateLand = () => {

    const params = useParams()
    const { lands, user } = useContext(AuthContext)
    const currentLand = lands.find(land => land.key === params.id)
    const currentUsers = currentLand?.value.UserId

    return (
        <AddLandForm />
    )
}

export default UpdateLand
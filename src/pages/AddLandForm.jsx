import { Box, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { addLand, addLandCo } from '../api'
import AddOwnerForm from '../components/AddOwnerForm'
import BasicAlerts from '../components/Alert'
import Container from '../components/Container'
import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'
import { uploadImage } from '../firebase/images'
import { getHomePageData } from '../contexts/actions'

import ConfirmBox from '../components/ConfirmBox'
import AddLandCustom from '../components/AddLandCustom'
import AddConstructionBox from '../components/AddConstructionBox'
import AddHouseBox from '../components/AddHouseBox'

const AddLandForm = () => {

    const initialValues = {
        thuaDatSo: '',
        toBanDoSo: '',
        dienTich: '',
        diaChi: '',
        hinhThucSuDung: '',
        mucDichSuDung: '',
        thoiHanSuDung: '',
        nguonGoc: '',
        toaDoCacDinh: {},
        doDaiCacCanh: {},
        cacSoThuaGiapRanh: {},
        nhaO: [],
        congTrinhKhac: [],
        url: []
    }

    const { user, setLands, setNotifyList } = useContext(AuthContext)

    const [values, setValues] = useState(initialValues)
    const [owners, setOwners] = useState([user])
    const [files, setFiles] = useState([])
    const [isAddFormOpen, setIsAddFormOpen] = useState(false)
    const [isAddConstructionBox, setIsAddConstructionBox] = useState(false)
    const [isAddHouseBox, setIsAddHouseBox] = useState(false)

    const [isRegisting, setIsRegisting] = useState(false)
    const [info, setInfo] = useState('')
    const [error, setError] = useState('')

    const params = useParams()
    const type = params.type
    const navigate = useNavigate()

    console.log(values, info, type)

    const handleOpenAddForm = () => {
        setIsAddFormOpen(true)
    }

    const handleCloseAddForm = () => {
        setIsAddFormOpen(false)
    }

    const handleAddNewOwner = (owner) => {
        setOwners([...owners, owner])
    }

    // const checkFormData = () => {
    //     return (
    //         values.thuaDatSo !== '' && values.toBanDoSo !== '' && values.dienTich !== '' && values.diaChi !== ''
    //         && values.hinhThucSuDung !== '' && values.thoiHanSuDung !== '' && values.mucDichSuDung !== ''
    //         && values.nguonGoc !== ''
    //         && (Object.values(values.toaDoCacDinh).length !== 0 && Object.values(values.toaDoCacDinh).length === parseInt(sideCount, 10))
    //         && (Object.values(values.doDaiCacCanh).length !== 0 && Object.values(values.doDaiCacCanh).length === parseInt(sideCount, 10))
    //         && (Object.values(values.cacSoThuaGiapRanh).length !== 0 && Object.values(values.cacSoThuaGiapRanh).length === parseInt(landCount, 10))
    //     )
    // }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = { ...values }
        setIsRegisting(true)
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const result = await uploadImage(files[i])
                form.url.push(result)
            }
        }
        form.chuSoHuu = owners

        console.log(form)
        if (type === 'one') {
            const result = await addLand(form)
            console.log(result.data.message)

            if (!result.data.error) {
                setIsRegisting(false)
                setInfo(result.data.message)
                return
            }

            setError(result.data.message)
            setIsRegisting(false)
        } else {
            const result = await addLandCo(form)
            console.log(result.data.message)

            if (!result.data.error) {
                setIsRegisting(false)
                setInfo(result.data.message)
                return
            }

            setError(result.data.message)
            setIsRegisting(false)
        }
    }

    const handleConfirm = async () => {
        await getHomePageData(user?.role, setLands, setNotifyList)
        setInfo('')
        navigate('/')
    }

    const handleAddConstruction = (data) => {
        setIsAddConstructionBox(false)
        setValues({ ...values, congTrinhKhac: [...values.congTrinhKhac, data] })
    }

    const handleAddHouse = (data) => {
        setIsAddHouseBox(false)
        setValues({ ...values, nhaO: [...values.nhaO, data] })
    }

    return (
        <Container>
            <NavBar />
            {info !== ''
                ?
                <ConfirmBox message={info} handleConfirm={handleConfirm} />
                : null
            }

            {error !== ''
                ?
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BasicAlerts serverity="error" message={error} onClose={() => setError('')} />
                </Box>
                : null
            }

            <Box sx={{ paddingX: 8, paddingY: 5 }}>
                <Typography variant='h5' gutterBottom>Đăng ký đất mới</Typography>
                <AddLandCustom
                    handleOpenAddForm={handleOpenAddForm}
                    setIsAddConstructionBox={setIsAddConstructionBox}
                    setIsAddHouseBox={setIsAddHouseBox}
                    type={type}
                    owners={owners}
                    setOwners={setOwners}
                    values={values}
                    setValues={setValues}
                    files={files}
                    setFiles={setFiles}
                    handleSubmit={handleSubmit}
                    isRegisting={isRegisting}
                />
            </Box>

            {isAddConstructionBox && <AddConstructionBox handleClose={() => setIsAddConstructionBox(false)} handleSubmit={handleAddConstruction} />}

            {isAddHouseBox && <AddHouseBox handleClose={() => setIsAddHouseBox(false)} handleSubmit={handleAddHouse} />}

            {isAddFormOpen && <AddOwnerForm handleClose={handleCloseAddForm} handleSubmit={handleAddNewOwner} />}
        </Container>
    )
}

export default AddLandForm
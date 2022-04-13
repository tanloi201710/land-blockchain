import { Add, Autorenew, PhotoCamera, Remove } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, IconButton, ImageList, ImageListItem, ListSubheader, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { addLand, addLandCo } from '../api'
import AddOwnerForm from '../components/AddOwnerForm'
import BasicAlerts from '../components/Alert'
import Container from '../components/Container'
import DisplayOwner from '../components/DisplayOwner'
import Input from '../components/Input'
import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'
import { uploadImage } from '../firebase/images'
import { getHomePageData } from '../contexts/actions'

import { hinhThucSuDung, hinhThucNhan, datNongNghiep, datPhiNongNghiep, nguonGoc } from '../data'
import ConfirmBox from '../components/ConfirmBox'
import AddLandCustom from '../components/AddLandCustom'

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
    const [sideCount, setSideCount] = useState(0)
    const [landCount, setLandCount] = useState(0)
    const [isAddFormOpen, setIsAddFormOpen] = useState(false)

    const [isRegisting, setIsRegisting] = useState(false)
    const [info, setInfo] = useState('')
    const [error, setError] = useState('')

    const params = useParams()
    const type = params.type
    const navigate = useNavigate()

    console.log(values, info)

    // const handleChange = (event) => {
    //     setValues({ ...values, [event.target.name]: event.target.value })
    // }

    // const handleChangeSides = (event) => {
    //     setValues({ ...values, doDaiCacCanh: { ...values.doDaiCacCanh, [event.target.name]: event.target.value } })
    // }

    // const handleOpenAddForm = () => {
    //     setIsAddFormOpen(true)
    // }

    const handleCloseAddForm = () => {
        setIsAddFormOpen(false)
    }

    const handleAddNewOwner = (owner) => {
        setOwners([...owners, owner])
    }

    const checkFormData = () => {
        return (
            values.thuaDatSo !== '' && values.toBanDoSo !== '' && values.dienTich !== '' && values.diaChi !== ''
            && values.hinhThucSuDung !== '' && values.thoiHanSuDung !== '' && values.mucDichSuDung !== ''
            && values.nguonGoc !== ''
            && (Object.values(values.toaDoCacDinh).length !== 0 && Object.values(values.toaDoCacDinh).length === parseInt(sideCount, 10))
            && (Object.values(values.doDaiCacCanh).length !== 0 && Object.values(values.doDaiCacCanh).length === parseInt(sideCount, 10))
            && (Object.values(values.cacSoThuaGiapRanh).length !== 0 && Object.values(values.cacSoThuaGiapRanh).length === parseInt(landCount, 10))
        )
    }

    const resetFormData = () => {
        setValues(initialValues)
        setSideCount(0)
        setLandCount(0)
        setOwners([user])
        setFiles([])
    }

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
                resetFormData()
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
                resetFormData()
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
                <AddLandCustom setIsAddFormOpen={setIsAddFormOpen} type={type} owners={owners} setOwners={setOwners} values={values} setValues={setValues} />
            </Box>
            {/* <Box sx={{ paddingX: 8, paddingY: 5 }}>
                <Typography variant='h5' gutterBottom>Đăng ký đất mới</Typography>
                <Typography variant='h6' >Chủ sở hữu</Typography>
                <Box>
                    {owners.map((owner, index) => (
                        <Box
                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            key={index}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 4
                                }}
                            >
                                <DisplayOwner owner={owner} />
                                {index >= 1 &&
                                    <Tooltip title='Xóa'>
                                        <IconButton
                                            onClick={() => setOwners(owners.filter((owner, id) => id !== index))}
                                        // disableRipple
                                        // sx={{ backgroundColor: '#d32f2fcc' }}
                                        >
                                            <Remove color='error' />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </Box>
                        </Box>
                    ))}
                    {type === 'group' &&
                        <Box
                            sx={{
                                padding: 1,
                                marginBottom: 3,
                                marginLeft: 3,
                            }}>
                            <Tooltip title={'Thêm chủ sở hữu'}>
                                <IconButton
                                    disableRipple
                                    sx={{ backgroundColor: '#424242' }}
                                    onClick={handleOpenAddForm}
                                >
                                    <Add sx={{ color: 'white' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                </Box>
                <Box sx={{ paddingBottom: 20, paddingTop: 5, display: 'flex', gap: 4 }}>
                    <Box sx={{ flex: '2' }}>
                        <Box component='form' noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2} >
                                <Input
                                    label='Thửa đất số'
                                    name='thuaDatSo'
                                    type='text'
                                    handleChange={handleChange}
                                    half
                                />
                                <Input
                                    label='Tờ bản đồ số'
                                    name='toBanDoSo'
                                    type='text'
                                    handleChange={handleChange}
                                    half
                                />
                                <Input
                                    label='Diện tích (m&#178;)'
                                    name='dienTich'
                                    type='text'
                                    handleChange={handleChange}
                                />
                                <Input
                                    label='Địa chỉ'
                                    name='diaChi'
                                    type='text'
                                    handleChange={handleChange}
                                />

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        name='hinhThucSuDung'
                                        label='Hình thức sử dụng'
                                        value={values.hinhThucSuDung}
                                        onChange={handleChange}
                                    >
                                        {
                                            hinhThucSuDung.map((hinhThuc, index) => (
                                                <MenuItem key={index} value={hinhThuc}>
                                                    {hinhThuc}
                                                </MenuItem>
                                            ))
                                        }
                                        <ListSubheader>Nhận chuyển quyền sử dụng đất</ListSubheader>
                                        {
                                            hinhThucNhan.map((hinhThuc, index) => (
                                                <MenuItem key={index} value={hinhThuc} sx={{ textIndent: 15 }}>
                                                    {hinhThuc}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        name='mucDichSuDung'
                                        label='Mục đích sử dụng'
                                        value={values.mucDichSuDung}
                                        onChange={handleChange}
                                    >

                                        <ListSubheader>Nhóm đất Nông Nghiệp</ListSubheader>
                                        {
                                            datNongNghiep.map((dat, index) => (
                                                <MenuItem key={index} value={dat} sx={{ textIndent: 15 }}>
                                                    {dat}
                                                </MenuItem>
                                            ))
                                        }

                                        <ListSubheader>Nhóm đất phi Nông Nghiệp</ListSubheader>
                                        {
                                            datPhiNongNghiep.map((dat, index) => (
                                                <MenuItem key={index} value={dat} sx={{ textIndent: 15 }}>
                                                    {dat}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        name='thoiHanSuDung'
                                        label='Thời hạn sử dụng'
                                        value={values.thoiHanSuDung}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Đất sử dụng ổn định lâu dài'}>
                                            {'Đất sử dụng ổn định lâu dài'}
                                        </MenuItem>
                                        <MenuItem value={'Đất sử dụng có thời hạn'}>
                                            {'Đất sử dụng có thời hạn'}
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        select
                                        fullWidth
                                        required
                                        name='nguonGoc'
                                        label='Nguồn gốc'
                                        value={values.nguonGoc}
                                        onChange={handleChange}
                                    >
                                        {
                                            nguonGoc.map((nguon, index) => (
                                                <MenuItem key={index} value={nguon}>
                                                    {nguon}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Grid>

                                <Input
                                    label='Tổng số thửa giáp ranh'
                                    name='tongSoThua'
                                    type='number'
                                    handleChange={(e) => setLandCount(e.target.value)}
                                />

                                {
                                    [...Array(parseInt(landCount || '0', 10))].map((land, index) => (
                                        <Grid item xs={3} key={index} >
                                            <TextField
                                                required
                                                name={`l${index + 1}`}
                                                label={`Số thửa thứ ${index + 1}`}
                                                value={values.cacSoThuaGiapRanh[index] || ''}
                                                onChange={(event) => setValues({ ...values, cacSoThuaGiapRanh: { ...values.cacSoThuaGiapRanh, [index]: event.target.value } })}
                                            />
                                        </Grid>
                                    ))
                                }

                                <Input
                                    label='Tổng số đỉnh'
                                    name='tongSoDinh'
                                    type='number'
                                    handleChange={(e) => setSideCount(e.target.value)}
                                />

                                {
                                    [...Array(parseInt(sideCount || '0', 10))].map((side, index) => (
                                        <React.Fragment key={index}>
                                            <Typography sx={{ width: '100%', paddingLeft: '1rem', paddingTop: '1rem' }}>Đỉnh {index + 1}</Typography>
                                            <Grid item xs={4} sm={4}>
                                                <TextField
                                                    required
                                                    name='DX'
                                                    label='Tọa độ X'
                                                    value={values.toaDoCacDinh[index + 1]?.X || ""}
                                                    onChange={(event) => setValues({ ...values, toaDoCacDinh: { ...values.toaDoCacDinh, [index + 1]: { ...values.toaDoCacDinh[index + 1], X: event.target.value } } })}
                                                />
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <TextField
                                                    required
                                                    name='DY'
                                                    label='Tọa độ Y'
                                                    value={values.toaDoCacDinh[index + 1]?.Y || ""}
                                                    onChange={(event) => setValues({ ...values, toaDoCacDinh: { ...values.toaDoCacDinh, [index + 1]: { ...values.toaDoCacDinh[index + 1], Y: event.target.value } } })}
                                                />
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <Input
                                                    required
                                                    label={`Độ dài cạnh ${index + 1}-${index + 2 > sideCount ? 1 : index + 2}`}
                                                    name={`C${index + 1}`}
                                                    type='text'
                                                    handleChange={handleChangeSides}
                                                />
                                            </Grid>

                                        </React.Fragment>
                                    ))
                                }

                                <Grid item xs={12} sm={12} >
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={isRegisting || !checkFormData()}
                                        onClick={handleSubmit}
                                    >
                                        {isRegisting ? <CircularProgress size={20} /> : 'Đăng ký'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{ flex: '1' }}>
                        {
                            files.length > 0
                                ? <>
                                    <ImageList sx={{ width: 335 }} cols={2} rowHeight={164} >
                                        {
                                            files.map((file, index) => (
                                                <ImageListItem key={index}>
                                                    <img
                                                        src={`${URL.createObjectURL(file)}`}
                                                        srcSet={`${URL.createObjectURL(file)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={`display${index}`}
                                                        style={{ width: 164, height: 164 }}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                            ))
                                        }

                                    </ImageList>
                                    <Stack direction="row" alignItems="center" spacing={2} sx={{ marginTop: 2 }} >
                                        <Button
                                            variant="text"
                                            sx={{ color: blue[700] }}
                                            endIcon={<Autorenew />}
                                            onClick={() => setFiles([])}
                                        >
                                            Chọn lại
                                        </Button>
                                    </Stack>
                                </>
                                : <Stack direction="row" alignItems="center" spacing={2}>
                                    <label htmlFor="icon-button-file" >
                                        <Typography variant="button" sx={{ color: blue[700] }}>Tải ảnh lên</Typography>
                                        <input
                                            type='file'
                                            accept="image/*"
                                            id="icon-button-file"
                                            multiple
                                            style={{ display: 'none' }}
                                            onChange={((e) => { setFiles(Array.from(e.target.files)); console.log(e.target.files) })}
                                        />
                                        <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                        >
                                            <PhotoCamera sx={{ color: blue[700] }} />
                                        </IconButton>
                                    </label>
                                </Stack>
                        }

                    </Box>
                </Box>
            </Box> */}

            {isAddFormOpen && <AddOwnerForm handleClose={handleCloseAddForm} handleSubmit={handleAddNewOwner} />}
        </Container>
    )
}

export default AddLandForm
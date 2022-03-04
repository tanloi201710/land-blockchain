import { Add, Autorenew, PhotoCamera, Remove } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, ImageList, ImageListItem, ListSubheader, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import AddOwnerForm from '../components/AddOwnerForm'
import Container from '../components/Container'
import DisplayOwner from '../components/DisplayOwner'
import Input from '../components/Input'
import NavBar from '../components/NavBar'
import { AuthContext } from '../contexts/AuthContext'

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
        toaDoCacDinh: [],
        doDaiCacCanh: [],
        nhaO: [],
        congTrinhKhac: []

    }

    const hinhThucSuDung = [
        'Nhận quyền sử dụng đất từ nhà nước',
        'Được nhà nước giao đất',
        'Được nhà nước cho thuê đất',
        'Được nhà nước cho phép chuyển mục đích sử dụng đất',
        'Được nhà nước công nhận quyền sử dụng đất',
        'Thuê quyền sử dụng đất từ chủ thể sử dụng đất khác',
        'Thuê lại quyền sử dụng đất từ chủ thể sử dụng đất khác'
    ]

    const hinhThucNhan = [
        'Nhận chuyển đổi',
        'Nhận chuyển nhượng',
        'Nhận thừa kế',
        'Nhận tặng cho',
        'Nhận góp vốn',
    ]

    const datNongNghiep = [
        'Đất trồng cây hàng năm gồm đất trồng lúa và đất trồng cây hàng năm khác',
        'Đất trồng cây lâu năm',
        'Đất rừng sản xuất',
        'Đất rừng phòng hộ',
        'Đất rừng đặc dụng',
        'Đất nuôi trồng thủy sản',
        'Đất làm muối',
        'Đất nông nghiệp khác'
    ]

    const datPhiNongNghiep = [
        'Đất ở gồm đất ở tại nông thôn, đất ở tại đô thị',
        'Đất sử dụng vào mục đích quốc phòng, an ninh',
        'Đất xây dựng công trình sự nghiệp',
        'Đất sản xuất, kinh doanh phi nông nghiệp',
        'Đất sử dụng vào mục đích công cộng',
        'Đất cơ sở tôn giáo, tín ngưỡng',
        'Đất làm nghĩa trang, nghĩa địa, nhà tang lễ, nhà hỏa táng',
        'Đất sử dụng vào mục đích quốc phòng, an ninh',
        'Đất phi nông nghiệp khác'
    ]

    const nguonGoc = [
        'Nhà nước giao đất không thu tiền sử dụng đất',
        'Nhà nước giao đất có thu tiền sử dụng đất',
        'Nhà nước cho thuê đất trả tiền một lần',
        'Nhà nước cho thuê đất trả tiền hàng năm',
        'Công nhận QSDĐ như giao đất có thu tiền sử dụng đất',
        'Công nhận QSDĐ như giao đất không thu tiền sử dụng đất',
        'Thuê đất trả tiền một lần của doanh nghiệp đầu tư hạ tầng khu công nghiệp',
        'Thuê đất trả tiền hàng năm của doanh nghiệp đầu tư hạ tầng khu công nghiệp'
    ]

    const { user } = useContext(AuthContext)

    const [values, setValues] = useState(initialValues)
    const [owners, setOwners] = useState([user])
    const [files, setFiles] = useState([])
    const [sideCount, setSideCount] = useState(0)
    const [isAddFormOpen, setIsAddFormOpen] = useState(false)

    const params = useParams()
    const type = params.type

    console.log(values)
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleChangeSides = (event) => {
        setValues({ ...values, doDaiCacCanh: { ...values.doDaiCacCanh, [event.target.name]: event.target.value } })
    }

    const handleOpenAddForm = () => {
        setIsAddFormOpen(true)
    }

    const handleCloseAddForm = () => {
        setIsAddFormOpen(false)
    }

    const handleAddNewOwner = (owner) => {
        setOwners([...owners, owner])
    }

    return (
        <Container>
            <NavBar />
            <Box sx={{ paddingX: 8, paddingY: 5 }}>
                <Typography variant='h5' gutterBottom>Đăng ký đất mới</Typography>
                <Typography variant='h6' >Chủ sở hữu</Typography>
                <Box>
                    {owners.map((owner, index) => (
                        <Box
                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 4
                                }}
                            >
                                <DisplayOwner owner={owner} key={index} />
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
                <Box sx={{ paddingBottom: 20, display: 'flex', gap: 4 }}>
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
                                    label='Tổng số cạnh'
                                    name='tongSoCanh'
                                    type='text'
                                    handleChange={(e) => setSideCount(e.target.value)}
                                />

                                {
                                    [...Array(parseInt(sideCount || '0', 10))].map((side, index) => (
                                        <Input
                                            key={index}
                                            label={`Độ dài cạnh ${index + 1}`}
                                            name={`canh${index + 1}`}
                                            type='text'
                                            handleChange={handleChangeSides}
                                            half
                                        />
                                    ))
                                }

                                <Grid item xs={12} sm={12} >
                                    <Button
                                        variant="contained"
                                        type="submit"
                                    >
                                        Đăng ký
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
                                    <Typography variant="button" sx={{ color: blue[700] }}>Tải ảnh lên</Typography>
                                    <label htmlFor="icon-button-file">
                                        <input
                                            type='file'
                                            accept="image/*"
                                            id="icon-button-file"
                                            multiple
                                            style={{ display: 'none' }}
                                            onChange={((e) => { setFiles(Array.from(e.target.files)); console.log(e.target.files) })}
                                        />
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera sx={{ color: blue[700] }} />
                                        </IconButton>
                                    </label>
                                </Stack>
                        }

                    </Box>
                </Box>
            </Box>

            {isAddFormOpen && <AddOwnerForm handleClose={handleCloseAddForm} handleSubmit={handleAddNewOwner} />}
        </Container>
    )
}

export default AddLandForm
import { Autorenew, PhotoCamera } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, ImageList, ImageListItem, ListSubheader, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { useState } from 'react'
import Container from '../components/Container'
import Input from '../components/Input'
import NavBar from '../components/NavBar'

const AddLandForUser = () => {

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

    const [values, setValues] = useState(initialValues)
    const [files, setFiles] = useState([])
    console.log(files)
    const handleSubmit = () => {

    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    return (
        <Container>
            <NavBar />
            <Typography variant='h5' sx={{ paddingX: 8, paddingTop: 5 }}>Đăng ký đất mới</Typography>
            <Box sx={{ paddingX: 8, paddingY: 5, display: 'flex', gap: 4 }}>
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
        </Container>
    )
}

export default AddLandForUser
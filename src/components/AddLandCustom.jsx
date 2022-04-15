import React, { useContext, useState } from 'react'
import {
    Box, Stepper, Step, Typography,
    Tooltip, IconButton, Grid, TextField,
    ListSubheader, MenuItem, ImageList,
    ImageListItem, Stack, Button, StepLabel, TableContainer, Paper, Table, TableHead, TableRow, TableBody, CircularProgress
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Add, ArrowBack, ArrowForward, Autorenew, CheckCircle, Clear, PhotoCamera, Remove } from '@mui/icons-material'
import { blue } from '@mui/material/colors'


import DisplayOwner from './DisplayOwner'
import Input from './Input'
import StyledTableCell from './StyledTableCell'
import StyledTableRow from './StyledTableRow'
import { datNongNghiep, datPhiNongNghiep, hinhThucNhan, hinhThucSuDung, nguonGoc } from '../data'
import { AuthContext } from '../contexts/AuthContext'

const steps = [
    {
        label: 'Chủ sỡ hữu'
    },
    {
        label: 'Thông tin cơ bản'
    },
    {
        label: 'Thông tin địa lý'
    },
    {
        label: 'Nhà ở - Công trình'
    },
    {
        label: 'Hình ảnh'
    }
]

const Owners = ({ owners, setOwners, type, setIsAddFormOpen }) => {
    return (
        <Box>
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
                                onClick={() => setIsAddFormOpen(true)}
                            >
                                <Add sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
            </Box>
        </Box>
    )
}

const BasicInfo = ({ handleChange, values }) => {
    return (
        <Box sx={{ width: 1000 }} >
            <Grid container spacing={2} >
                <Input
                    label='Thửa đất số'
                    name='thuaDatSo'
                    type='text'
                    value={values.thuaDatSo}
                    handleChange={handleChange}
                    half
                />
                <Input
                    label='Tờ bản đồ số'
                    name='toBanDoSo'
                    type='text'
                    value={values.toBanDoSo}
                    handleChange={handleChange}
                    half
                />
                <Input
                    label='Diện tích (m&#178;)'
                    name='dienTich'
                    type='text'
                    value={values.dienTich}
                    handleChange={handleChange}
                />
                <Input
                    label='Địa chỉ'
                    name='diaChi'
                    type='text'
                    value={values.diaChi}
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
            </Grid>
        </Box>
    )
}

const InfoLocate = ({ values, setValues, handleChangeSides, landCount, setLandCount, sideCount, setSideCount }) => {

    return (
        <Box sx={{ width: 1000 }}>
            <Grid container spacing={2}>
                <Input
                    label='Tổng số thửa giáp ranh'
                    name='tongSoThua'
                    type='number'
                    value={landCount}
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
                    value={sideCount}
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
                                    value={Object.values(values.doDaiCacCanh)[index]}
                                    handleChange={handleChangeSides}
                                />
                            </Grid>

                        </React.Fragment>
                    ))
                }
            </Grid>
        </Box>
    )
}

const HouseAndConstruction = ({ values, setValues, setIsAddConstructionBox, setIsAddHouseBox }) => {
    return (
        <Box sx={{ width: 1000 }}>
            <Box>
                <Typography variant="h6">Nhà ở</Typography>
                {values.nhaO.length > 0 &&
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>STT</StyledTableCell>
                                    <StyledTableCell>Loại nhà ở</StyledTableCell>
                                    <StyledTableCell>Diện tích xây dựng</StyledTableCell>
                                    <StyledTableCell>Diện tích sàn</StyledTableCell>
                                    <StyledTableCell>Hình thức sỡ hữu</StyledTableCell>
                                    <StyledTableCell>Cấp(hạng) nhà ở</StyledTableCell>
                                    <StyledTableCell>Thời hạn sỡ hữu</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {values.nhaO.map((value, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component='th' scope='row'>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{value.loaiNhaO}</StyledTableCell>
                                        <StyledTableCell align="right">{value.dienTichXayDung}</StyledTableCell>
                                        <StyledTableCell align="right">{value.dienTichSan}</StyledTableCell>
                                        <StyledTableCell align="right">{value.hinhThucSoHuu}</StyledTableCell>
                                        <StyledTableCell align="right">{value.capNhaO}</StyledTableCell>
                                        <StyledTableCell align="right">{value.thoiHanSoHuu}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <IconButton onClick={() => setValues({ ...values, nhaO: values.nhaO.filter((value, id) => id !== index) })}>
                                                <Clear color='error' />
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                <Box
                    sx={{
                        padding: 1,
                        marginBottom: 3,
                        marginLeft: 3,
                    }}>
                    <Tooltip title={'Thêm nhà ở'}>
                        <IconButton
                            disableRipple
                            sx={{ backgroundColor: '#424242' }}
                            onClick={() => setIsAddHouseBox(true)}
                        >
                            <Add sx={{ color: 'white' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box>
                <Typography variant="h6">Công trình</Typography>
                {values.congTrinhKhac.length > 0 &&
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>STT</StyledTableCell>
                                    <StyledTableCell>Loại công trình</StyledTableCell>
                                    <StyledTableCell>Diện tích xây dựng(m2)</StyledTableCell>
                                    <StyledTableCell>Diện tích sàn(m2)</StyledTableCell>
                                    <StyledTableCell>Hình thức sỡ hữu</StyledTableCell>
                                    <StyledTableCell>Cấp công trình</StyledTableCell>
                                    <StyledTableCell>Thời hạn sỡ hữu</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {values.congTrinhKhac.map((value, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component='th' scope='row'>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{value.loaiCongTrinh}</StyledTableCell>
                                        <StyledTableCell align="right">{value.dienTichXayDung}</StyledTableCell>
                                        <StyledTableCell align="right">{value.dienTichSan}</StyledTableCell>
                                        <StyledTableCell align="right">{value.hinhThucSoHuu}</StyledTableCell>
                                        <StyledTableCell align="right">{value.capCongTrinh}</StyledTableCell>
                                        <StyledTableCell align="right">{value.thoiHanSoHuu}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <IconButton onClick={() => setValues({ ...values, congTrinhKhac: values.congTrinhKhac.filter((value, id) => id !== index) })}>
                                                <Clear color='error' />
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                <Box
                    sx={{
                        padding: 1,
                        marginBottom: 3,
                        marginLeft: 3,
                    }}>
                    <Tooltip title={'Thêm công trình'}>
                        <IconButton
                            disableRipple
                            sx={{ backgroundColor: '#424242' }}
                            onClick={() => setIsAddConstructionBox(true)}
                        >
                            <Add sx={{ color: 'white' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    )
}

const GetImage = ({ files, setFiles }) => {
    return (
        <Box sx={{ width: 1000 }}>
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
    )
}

const getDisplayComponent = (
    index, values, setValues, files,
    setFiles, owners, setOwners,
    setIsAddFormOpen, setIsAddConstructionBox,
    setIsAddHouseBox, type, handleChange, handleChangeSides,
    landCount, setLandCount, sideCount, setSideCount
) => {
    switch (index) {
        case 0:
            return <Owners owners={owners} setOwners={setOwners} type={type} setIsAddFormOpen={setIsAddFormOpen} />

        case 1:
            return <BasicInfo values={values} handleChange={handleChange} />

        case 2:
            return <InfoLocate values={values} setValues={setValues} landCount={landCount} setLandCount={setLandCount} sideCount={sideCount} setSideCount={setSideCount} handleChangeSides={handleChangeSides} />

        case 3:
            return <HouseAndConstruction values={values} setValues={setValues} setIsAddConstructionBox={setIsAddConstructionBox} setIsAddHouseBox={setIsAddHouseBox} />

        case 4:
            return <GetImage files={files} setFiles={setFiles} />

        default:
            return null
    }
}

const AddLandCustom = ({
    setIsAddFormOpen,
    setIsAddConstructionBox,
    setIsAddHouseBox,
    type,
    owners,
    setOwners,
    values,
    setValues,
    files,
    setFiles,
    handleSubmit,
    isRegisting
}) => {

    const theme = createTheme();

    const [activeStep, setActiveStep] = React.useState(0)

    const [landCount, setLandCount] = useState(Object.values(values.cacSoThuaGiapRanh).length || 0)
    const [sideCount, setSideCount] = useState(Object.values(values.toaDoCacDinh).length || 0)

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleChangeSides = (event) => {
        setValues({ ...values, doDaiCacCanh: { ...values.doDaiCacCanh, [event.target.name]: event.target.value } })
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    const checkToNextStep = () => {
        switch (activeStep) {
            case 1:
                return values.thuaDatSo !== '' && values.toBanDoSo !== '' && values.dienTich !== '' && values.diaChi !== ''
                    && values.hinhThucSuDung !== '' && values.thoiHanSuDung !== '' && values.mucDichSuDung !== ''
                    && values.nguonGoc !== ''
            case 2:
                return (Object.values(values.toaDoCacDinh).length !== 0 && Object.values(values.toaDoCacDinh).length === parseInt(sideCount, 10))
                    && (Object.values(values.doDaiCacCanh).length !== 0 && Object.values(values.doDaiCacCanh).length === parseInt(sideCount, 10))
                    && (Object.values(values.cacSoThuaGiapRanh).length !== 0 && Object.values(values.cacSoThuaGiapRanh).length === parseInt(landCount, 10))
            default:
                return true
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minWidth: 1000, display: 'flex', justifyContent: 'center' }}>
                <Box>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, width: 1000 }}>
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel
                                    optional={
                                        index === 4 ? (
                                            <Typography variant="caption">Bước cuối</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep < steps.length ?
                        <Box>
                            {getDisplayComponent(activeStep, values, setValues,
                                files, setFiles, owners, setOwners, landCount, setLandCount,
                                sideCount, setSideCount, setIsAddFormOpen,
                                setIsAddConstructionBox, setIsAddHouseBox, type,
                                handleChange, handleChangeSides
                            )}
                            <Box sx={{ mb: 2, mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Quay lại
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Hoàn Thành' : 'Tiếp tục'}
                                    </Button>

                                </div>
                            </Box>
                        </Box>
                        :
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant='button'>Xác nhận đăng ký đất mới</Typography>
                            <Box sx={{ mt: 2 }}>
                                <Button onClick={handleSubmit} sx={{ mt: 1, mr: 1 }} variant='contained' disabled={!checkToNextStep}>
                                    {isRegisting ? <CircularProgress size={20} color='inherit' /> : 'Xác nhận'}
                                </Button>
                                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} variant='outlined'>
                                    Nhập lại
                                </Button>
                            </Box>
                        </Paper>
                    }
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default AddLandCustom
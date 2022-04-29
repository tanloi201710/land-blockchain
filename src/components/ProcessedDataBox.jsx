import { Close } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import { confirmSplitAdmin } from '../api'
import { AuthContext } from '../contexts/AuthContext'
import Input from './Input'


const ContiguousLand = ({ viewMode, data, index, item, dataEdit, setDataEdit, setCheckContiguous }) => {
    const [landCount, setLandCount] = React.useState(data[index]?.CacSoThuaGiapRanh ? Object.values(data[index].CacSoThuaGiapRanh).length : 0)

    React.useEffect(() => {

        setCheckContiguous(
            Object.values(dataEdit[index].CacSoThuaGiapRanh).length !== 0
            && Object.values(dataEdit[index].CacSoThuaGiapRanh).length === parseInt(landCount, 10)
            && Object.values(dataEdit[index].CacSoThuaGiapRanh).every(item => item !== '')
        )

    }, [landCount, dataEdit, index, setCheckContiguous])

    // console.log(
    //     Object.values(dataEdit[index].CacSoThuaGiapRanh).length !== 0
    //     , Object.values(dataEdit[index].CacSoThuaGiapRanh).length === parseInt(landCount, 10)
    //     , Object.values(dataEdit[index].CacSoThuaGiapRanh).every(item => item !== '')
    // )

    return (
        <React.Fragment>
            <Input
                disabled={viewMode}
                label='Tổng số thửa giáp ranh'
                name='tongSoThua'
                type='number'
                value={landCount}
                handleChange={(e) => setLandCount(e.target.value)}
            />

            {
                [...Array(parseInt(landCount || '0', 10))].map((land, id) => (
                    <Grid item xs={6} key={id} >
                        <TextField
                            required
                            disabled={viewMode}
                            name={`l${id + 1}`}
                            label={`Số thửa thứ ${id + 1}`}
                            value={item?.CacSoThuaGiapRanh[id] || ''}
                            onChange={(event) => setDataEdit(dataEdit.map((item, idx) => {
                                if (idx === index) {
                                    const currentCpy = item
                                    currentCpy.CacSoThuaGiapRanh[id] = event.target.value
                                    return currentCpy
                                }
                                return item
                            }))}
                        />
                    </Grid>
                ))
            }
        </React.Fragment>
    )
}


const Coordinates = ({ viewMode, dataEdit, setDataEdit, data, index, item, setCheckCoordinates }) => {

    const [sideCount, setSideCount] = React.useState(data[index]?.ChieuDaiCacCanh ? Object.values(data[index].ChieuDaiCacCanh).length : 0)

    React.useEffect(() => {
        setCheckCoordinates(
            ((Object.values(dataEdit[index].ToaDoCacDinh).length !== 0 && Object.values(dataEdit[index].ToaDoCacDinh).length === parseInt(sideCount, 10))
                && (Object.values(dataEdit[index].ChieuDaiCacCanh).length !== 0 && Object.values(dataEdit[index].ChieuDaiCacCanh).length === parseInt(sideCount, 10)))
        )
    }, [sideCount, dataEdit, index, setCheckCoordinates])

    return (
        <React.Fragment>
            <Input
                disabled={viewMode}
                label='Tổng số đỉnh'
                name='tongSoDinh'
                type='number'
                value={sideCount}
                handleChange={(e) => setSideCount(e.target.value)}
            />

            {
                [...Array(parseInt(sideCount || '0', 10))].map((side, id) => (
                    <React.Fragment key={id}>
                        <Typography sx={{ width: '100%', paddingLeft: '1rem', paddingTop: '1rem' }}>Đỉnh {id + 1}</Typography>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                fullWidth
                                disabled={viewMode}
                                name='DX'
                                label='Tọa độ X'
                                value={item?.ToaDoCacDinh[id + 1]?.X || ""}
                                onChange={(event) => setDataEdit(dataEdit.map((item, idx) => {
                                    if (idx === index) {
                                        const currentCpy = item
                                        currentCpy.ToaDoCacDinh[id + 1] = { ...currentCpy.ToaDoCacDinh[id + 1], X: event.target.value }
                                        return currentCpy
                                    }

                                    return item
                                }))}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                required
                                fullWidth
                                disabled={viewMode}
                                name='DY'
                                label='Tọa độ Y'
                                value={item?.ToaDoCacDinh[id + 1]?.Y || ""}
                                onChange={(event) => setDataEdit(dataEdit.map((item, idx) => {
                                    if (idx === index) {
                                        const currentCpy = item
                                        currentCpy.ToaDoCacDinh[id + 1] = { ...currentCpy.ToaDoCacDinh[id + 1], Y: event.target.value }
                                        return currentCpy
                                    }

                                    return item
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Input
                                required
                                disabled={viewMode}
                                label={`Độ dài cạnh ${id + 1}-${id + 2 > sideCount ? 1 : id + 2}`}
                                name={`C${id + 1}`}
                                type='text'
                                value={Object.values(item?.ChieuDaiCacCanh)[id]}
                                handleChange={(event) => setDataEdit(dataEdit.map((item, idx) => {
                                    if (idx === index) {
                                        const currentCpy = item
                                        currentCpy.ChieuDaiCacCanh[event.target.name] = event.target.value
                                        return currentCpy
                                    }

                                    return item
                                }))}
                            />
                        </Grid>

                    </React.Fragment>
                ))
            }
        </React.Fragment>
    )
}


const ProcessedDataBox = ({ keyLand, keySplit, data, requestData = {}, handleClose, setError, setMessage, viewMode = true }) => {
    const { user, lands } = React.useContext(AuthContext)

    const currentLand = lands.find(land => land.key === keyLand)

    const initData = () => {
        let initialData = []

        if (requestData?.NumOfLands) {
            for (let i = 0; i < requestData.NumOfLands; i++) {
                let oldData = { ...currentLand.value }
                oldData.CacSoThuaGiapRanh = {}
                oldData.ChieuDaiCacCanh = {}
                oldData.DienTich = requestData.AreaOfLands.split(',')[i]
                oldData.ThuaDatSo = ''
                oldData.ToaDoCacDinh = {}

                initialData.push(oldData)
            }
        } else {
            initialData = data
        }

        return initialData
    }

    const [dataEdit, setDataEdit] = React.useState(initData())
    const [checkContiguous, setCheckContiguous] = React.useState(false)
    const [checkCoordinates, setCheckCoordinates] = React.useState(false)

    // const [sideCount, setSideCount] = React.useState(data[0]?.ChieuDaiCacCanh ? Object.values(data[0].ChieuDaiCacCanh).length : 0)
    // const [landCount, setLandCount] = React.useState(data[0]?.CacSoThuaGiapRanh ? Object.values(data[0].CacSoThuaGiapRanh).length : 0)

    const isUser = () => user.role === 'user'

    console.log(dataEdit)
    console.log(data)

    const displayOwner = (owner) => {
        if (typeof owner === 'object') {
            return owner.join(', ')
        }
        return owner
    }


    const SubmitButton = () => {

        const [processing, setProcessing] = React.useState(false)

        const disabledAction = () => {
            return checkCoordinates && checkContiguous && dataEdit.every(item => item.ThuaDatSo !== '')
                && dataEdit.every(item => Object.values(item.CacSoThuaGiapRanh).every(it => it !== ''))
        }

        const handleSubmitSplitLand = async () => {
            const formData = {
                key: keySplit,
                dataProcessed: dataEdit
            }

            setProcessing(true)
            const result = await confirmSplitAdmin(formData)
            if (!result.data.error) {
                setMessage(result.data.message)
            } else {
                setError(result.data.message)
            }

            setProcessing(false)
            handleClose()

        }

        return (
            <Button
                variant='contained'
                disabled={!disabledAction()}
                onClick={handleSubmitSplitLand}
            >
                {processing ? <CircularProgress size={25} color='inherit' /> : 'Hoàn tất'}
            </Button>
        )
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 99999
            }}
        >
            <Box
                sx={{
                    width: 1000,
                    maxHeight: 700,
                    padding: 3,
                    borderRadius: 1,
                    backgroundColor: 'white',
                }}
            >
                <Box
                    sx={{
                        height: 15,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                >
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Box>

                <Typography variant="button" >
                    {user.role === 'user'
                        ? `Kết quả xử lý tách thửa đất có mã ${keyLand}`
                        : `Xử lý tách thửa đất có mã ${keyLand}`
                    }
                </Typography>
                <Typography variant="subtitle1" gutterBottom color="text.secondary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Thông tin chung</Typography>
                <Box>
                    <Typography variant="subtitle1" component="span">Chủ sở hữu: </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">{isUser() ? displayOwner(data[0].Owner) : displayOwner(dataEdit[0].Owner)}</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" component="span">Tờ bản đồ số: </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">{isUser() ? data[0].ToBanDoSo : dataEdit[0].ToBanDoSo}</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" component="span">Địa chỉ: </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">{isUser() ? data[0].Address : dataEdit[0].Address}</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" component="span">Hình thức sử dụng: </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">{isUser() ? data[0].HinhThucSuDung : dataEdit[0].HinhThucSuDung}</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" component="span">Mục đích sử dụng: </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">{isUser() ? data[0].MucDichSuDung : dataEdit[0].MucDichSuDung}</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" component="span">Thời hạn sử dụng: </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">{isUser() ? data[0].ThoiHanSuDung : dataEdit[0].ThoiHanSuDung}</Typography>
                </Box>
                <Box>
                    <Typography variant="subtitle1" component="span">Nguồn gốc sử dụng: </Typography>
                    <Typography variant="subtitle1" component="span" color="text.secondary">{isUser() ? data[0].NguonGocSuDung : dataEdit[0].NguonGocSuDung}</Typography>
                </Box>

                <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Thông tin được xử lý</Typography>

                <Grid container spacing={4} sx={{ mt: 1, maxHeight: 300, overflowY: 'auto' }}>
                    {(isUser() ? data : dataEdit).map((item, index) => (
                        <Grid item xs={6} key={index}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" color="text.secondary">Mảnh số {index + 1}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        disabled={viewMode}
                                        fullWidth
                                        InputProps={{ inputProps: { min: 0 } }}
                                        label="Thửa đất số"
                                        type="number"
                                        name="ThuaDatSo"
                                        value={item?.ThuaDatSo || ''}
                                        onChange={(event) => setDataEdit(dataEdit.map((item, idx) => {
                                            if (idx === index) {
                                                const currentCpy = item
                                                currentCpy.ThuaDatSo = event.target.value
                                                return currentCpy
                                            }

                                            return item
                                        }))}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        disabled
                                        fullWidth
                                        label="Diện tích"
                                        type="number"
                                        value={item?.DienTich || ''}
                                    />
                                </Grid>

                                <ContiguousLand
                                    viewMode={viewMode}
                                    data={data}
                                    dataEdit={dataEdit}
                                    setDataEdit={setDataEdit}
                                    item={item}
                                    index={index}
                                    setCheckContiguous={setCheckContiguous}
                                />

                                <Coordinates
                                    viewMode={viewMode}
                                    data={data}
                                    dataEdit={dataEdit}
                                    setDataEdit={setDataEdit}
                                    item={item}
                                    index={index}
                                    setCheckCoordinates={setCheckCoordinates}
                                />


                            </Grid>
                        </Grid>
                    ))}
                    {(!isUser() && !viewMode) &&
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <SubmitButton />
                        </Grid>
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default ProcessedDataBox
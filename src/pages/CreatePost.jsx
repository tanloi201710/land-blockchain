import { Close } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'
import { createPost } from '../api'

import { AuthContext } from '../contexts/AuthContext'
import { uploadImage } from '../firebase/images'

const CreatePost = ({ handleClose, setMessage, setError }) => {
    const initialData = {
        land: '',
        price: '',
        desc: '',
    }

    const { lands, posts } = React.useContext(AuthContext)
    const [currentLand, setCurrentLand] = React.useState({})
    const [file, setFile] = React.useState({})
    const [data, setData] = React.useState(initialData)
    const [processing, setProcessing] = React.useState(false)

    const availableLands = lands.filter(land => land.value.Status === 'Đã duyệt')
    const defaultValueLand = {}

    console.log(Boolean(file?.name))

    const disableAction = () => {
        return Boolean(currentLand) && data.price !== '' && data.desc !== ''
    }

    const checkExistLand = () => {
        return posts.some(post => post.land === currentLand.key)
    }

    const handleSubmit = async () => {
        const formData = data
        formData.land = currentLand.key
        formData.img = ''

        if (checkExistLand()) {
            handleClose()
            setError(`Mảnh đất ${currentLand.key} đã được người đồng sỡ hữu rao bán!`)
            return
        }

        setProcessing(true)
        if (Boolean(file?.name)) {
            try {
                const url = await uploadImage(file)
                formData.img = url
            } catch (error) {
                console.log('ERROR: ', error)
                return
            }
        }

        const result = await createPost(formData)
        setProcessing(false)
        handleClose()
        if (!result.data.error) {
            setMessage(result.data.message)
        } else {
            setError(result.data.message)
        }

        return
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
                alignItems: 'center'
            }}
        // onClick={handleClose}
        >
            <Box
                sx={{
                    width: 600,
                    padding: 3,
                    borderRadius: 1,
                    backgroundColor: 'white',
                    marginTop: 5
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
                <Typography variant="button" >Đăng tin bán đất</Typography>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            required
                            label="Chọn mãnh đất"
                            value={availableLands.find(land => land.key === currentLand.key) || ''}
                            onChange={(e) => setCurrentLand(e.target.value)}
                        >
                            {availableLands.length > 0 ? availableLands.map((land, index) => (
                                <MenuItem key={index} value={land}>
                                    {land.key}
                                </MenuItem>
                            )) : <MenuItem value={defaultValueLand} disabled={true}>
                                {'Không có đất phù hợp để rao bán'}
                            </MenuItem>
                            }
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            color='info'
                            label='Thửa đất số'
                            disabled
                            fullWidth
                            value={currentLand?.value?.ThuaDatSo || ""}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Diện tích'
                            disabled
                            fullWidth
                            value={currentLand?.value?.DienTich || ""}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Địa chỉ'
                            disabled
                            fullWidth
                            value={currentLand?.value?.Address || ""}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label='Thời gian đăng ký'
                            disabled
                            fullWidth
                            value={currentLand?.value?.ThoiGianDangKy || ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type={'text'}
                            label='Giá khởi điểm'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">VNĐ/m&#178;</InputAdornment>,
                            }}
                            value={data.price}
                            onChange={(e) => setData({ ...data, price: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            type='text'
                            multiline
                            minRows={5}
                            label='Mô tả'
                            value={data.desc}
                            onChange={(e) => setData({ ...data, desc: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' onClick={handleSubmit} disabled={!disableAction() || processing}>
                            {processing ? <CircularProgress size={25} color='inherit' /> : 'Đăng tin'}
                        </Button>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    )
}

export default CreatePost
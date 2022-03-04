import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const OptionsLandCard = ({ owner, largeTitle, smallTitle }) => {

    const navigate = useNavigate()

    const handleRedirect = () => {
        owner === 'one' ? navigate('/addLand/one') : navigate('/addLand/group')
    }
    return (
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component='div' variant='button' gutterBottom>
                        {/* {owner === 'one' ? 'Chính tôi sỡ hữu' : 'Nhóm người sỡ hữu'} */}
                        {largeTitle}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary' gutterBottom>
                        {/* {owner === 'one' ? 'Đăng ký đất mới do chính bạn sỡ hữu' : 'Đăng ký đất mới cho nhóm người cùng sỡ hữu'} */}
                        {smallTitle}
                    </Typography>
                    <Button variant='contained' color='primary' sx={{ marginTop: 5 }} onClick={handleRedirect}>Đăng ký</Button>
                </CardContent>

            </Box>
            <CardMedia
                component='img'
                sx={{ width: 161 }}
                image={owner === 'one' ? 'http://localhost:3000/assets/images/userOne.png' : 'http://localhost:3000/assets/images/userGroup.png'}
                alt='One user'
            />
        </Card>
    )
}

export default OptionsLandCard
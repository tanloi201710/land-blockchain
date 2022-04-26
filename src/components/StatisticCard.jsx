import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

const StatisticCard = ({ icon, label, number, color }) => {
    // styles
    const cardWrapper = {
        position: 'relative',
        width: 230,
        overflow: 'hidden',
    }

    const iconWrapper = {
        position: 'absolute',
        top: 2,
        left: 2,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        transform: 'scale(1.6)',
        backgroundColor: color,
        color: 'white',
        zIndex: 100
    }

    const contentWrapper = {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingX: 2,
        background: `linear-gradient(to right, #fff, ${color})`
    }

    const styledLabel = {
        color: 'lightgray'
    }

    const styledNumber = {
        fontSize: 24,
        fontWeight: 600,
        padding: 1,
        color: 'white'
    }

    return (
        <Paper sx={cardWrapper}>
            {/* Icon */}
            <Box sx={iconWrapper}>
                {icon}
            </Box>
            {/* label */}
            <Box sx={[contentWrapper, { pt: 2 }]}>
                <Typography variant="subtitle1" sx={styledLabel}>{label}</Typography>
            </Box>
            {/* number */}
            <Box sx={[contentWrapper, { pb: 2 }]}>
                <Typography variant="h6" sx={styledNumber}>{number}</Typography>
            </Box>
        </Paper>
    )
}

export default StatisticCard
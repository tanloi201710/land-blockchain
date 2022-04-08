import { TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react'

const StyledTableRow = ({ children }) => {
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    return (
        <StyledTableRow>{children}</StyledTableRow>
    )
}

export default StyledTableRow
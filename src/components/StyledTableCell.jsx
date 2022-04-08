import { TableCell, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react'

const StyledTableCell = (props) => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    return (
        <StyledTableCell {...props}>{props.children}</StyledTableCell>
    )
}

export default StyledTableCell
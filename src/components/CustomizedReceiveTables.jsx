import * as React from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material'
import { ConfirmFromReceiver } from '../api';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function CustomizedReceiveTables({ rows }) {

    const ReceiveButton = ({ row }) => {
        const [processing, setProcessing] = React.useState(false)

        const handleReceive = async () => {
            const formData = {
                key: row.key,
                userIdFromTransfer: row.value.From,
                amount: row.value.Money
            }
            setProcessing(true)

            const result = await ConfirmFromReceiver(formData)
            console.log(result.data)
            setProcessing(false)
        }

        return (
            <Button variant='contained' color='success' onClick={handleReceive} disabled={row.value.ConfirmFromReceiver}>
                {processing ? <CircularProgress size={25} color='inherit' /> : 'Nhận'}
            </Button>
        )
    }

    return (
        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Mã giao dịch</StyledTableCell>
                        <StyledTableCell align="right">Mã đất</StyledTableCell>
                        <StyledTableCell align="right">Người chuyển</StyledTableCell>
                        <StyledTableCell align="right">Người nhận</StyledTableCell>
                        <StyledTableCell align="right">Thời gian chuyển</StyledTableCell>
                        <StyledTableCell align="right">Chi phí nhận đất</StyledTableCell>
                        <StyledTableCell align="right">Trạng thái</StyledTableCell>
                        <StyledTableCell align="right">Thao tác</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.key}>
                            <StyledTableCell component="th" scope="row">
                                {row.key}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.value.Land}</StyledTableCell>
                            <StyledTableCell align="right">{typeof row.value.From === 'object'
                                ? row.value.From.map((value) => Object.keys(value)).join(', ')
                                : row.value.From}
                            </StyledTableCell>
                            <StyledTableCell align="right">{typeof row.value.To === 'object'
                                ? row.value.To.join(',')
                                : row.value.To}
                            </StyledTableCell>
                            <StyledTableCell align="right">{`${row.value.TimeStart}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${row.value.Money}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${row.value.ConfirmFromReceiver
                                ? 'Đã nhận đất'
                                : 'Chưa nhận đất'}`}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {/* <Button variant='contained' color='success' onClick={() => handleReceive(row)}>
                                    {processing ? <CircularProgress size={20} color='inherit' /> : 'Nhận'}
                                </Button> */}
                                <ReceiveButton row={row} />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
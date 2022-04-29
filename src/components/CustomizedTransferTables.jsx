import * as React from 'react'
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, Typography, Tooltip } from '@mui/material'
import { confirmFromTransfer, cancelTransfer } from '../api';
import { AuthContext } from '../contexts/AuthContext';
import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';
import { Link } from 'react-router-dom';


export default function CustomizedTransferTables({ rows, setMessage, setError }) {

    const { user } = React.useContext(AuthContext)
    console.log(rows)

    // Disable action or make out the status of transfer
    const disabled = (row) => {
        if (typeof row.value.From === 'object') {
            for (let i = 0; i < row.value.From.length; i++) {
                if (Object.keys(row.value.From[i]).toString() === user.userId) {
                    console.log(row.value.From[i][user.userId])
                    return row.value.From[i][user.userId]

                }
            }
        }
        return true
    }

    const confirmedUsers = (row, userId) => {
        if (typeof row.value.From === 'object') {
            const user = row.value.From.find(user => Object.keys(user).toString() === userId)
            return Object.values(user)[0]
        } else {
            return true
        }
    }

    const ConfirmButton = ({ row }) => {
        const [processing, setProcessing] = React.useState(false)

        const handleReceive = async () => {
            const formData = {
                key: row.key
            }
            setProcessing(true)

            const result = await confirmFromTransfer(formData)
            console.log(result.data)

            setProcessing(false)
            if (!result.data.error) {
                setMessage(result.data.message)
            } else {
                setError(result.data.message)
            }
        }


        return (
            <Button variant='contained' color='success' onClick={handleReceive} disabled={disabled(row)}>
                {processing ? <CircularProgress size={25} color='inherit' /> : 'Xác nhận'}
            </Button>
        )
    }

    const CancelButton = ({ row }) => {
        const [processing, setProcessing] = React.useState(false)

        const handleCancel = async () => {
            const anyReceiverConfirmed = typeof row.value.To === 'object' && row.value.To.some(item => Object.values(item).toString() === 'true')
            const formData = {
                keyLand: row.value.Land,
                keyTransfer: row.key,
                otherSenders: typeof row.value.From === 'object'
                    ? row.value.From.filter(item => Object.keys(item).toString() !== user.userId)
                    : [],
                receiver: row.value.To,
                receiverConfirm: typeof row.value.To === 'object'
                    ? anyReceiverConfirmed
                    : row.value.ConfirmFromReceiver
            }
            console.log(formData)

            setProcessing(true)

            const result = await cancelTransfer(formData)
            console.log(result.data)

            setProcessing(false)

            if (!result.data.error) {
                setMessage(result.data.message)
            } else {
                setError(result.data.message)
            }
        }

        return (
            <Button variant='contained' color='error' onClick={handleCancel} >
                {processing ? <CircularProgress size={25} color='inherit' /> : 'Hủy chuyển'}
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
                            <StyledTableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                {row.key}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Link to={`/detail/${row.value.Land}`} style={{ color: '#0288d1', fontWeight: 500 }}>
                                    {row.value.Land}
                                </Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">{typeof row.value.From === 'object'
                                ? row.value.From.map((value, index) => (
                                    <Tooltip title={confirmedUsers(row, Object.keys(value)[0]) ? 'Đã xác nhận' : 'Chưa xác nhận'}>
                                        <Typography
                                            key={index}
                                            color={confirmedUsers(row, Object.keys(value)[0]) ? 'text.primary' : 'text.secondary'}
                                            component="span"
                                            sx={{ fontSize: 14 }}
                                        >
                                            {Object.keys(value)[0]} &nbsp;
                                        </Typography>
                                    </Tooltip>
                                ))
                                : row.value.From}
                            </StyledTableCell>
                            <StyledTableCell align="right">{typeof row.value.To === 'object'
                                ? row.value.To.join(',')
                                : row.value.To}
                            </StyledTableCell>
                            <StyledTableCell align="right">{`${row.value.TimeStart}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${row.value.Money}`}</StyledTableCell>
                            <StyledTableCell align="right">{`${disabled(row)
                                ? 'Đã xác nhận'
                                : 'Chưa xác nhận'}`}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <ConfirmButton row={row} />
                                    <CancelButton row={row} />
                                </Box>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
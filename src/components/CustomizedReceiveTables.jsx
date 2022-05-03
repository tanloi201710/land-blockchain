import * as React from 'react'
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, CircularProgress, Tooltip, Typography } from '@mui/material'
import { ConfirmFromReceiver } from '../api';
import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';
import { Link } from 'react-router-dom';

export default function CustomizedReceiveTables({ rows, setMessage, setError }) {

    const getStatus = (row) => {
        if (typeof row.value.From === 'object') {
            for (let i = 0; i < row.value.From.length; i++) {
                if (!row.value.From[i][Object.keys(row.value.From[i])])
                    return 'Chưa xác nhận'
            }
        }

        if (!row.value.ConfirmFromReceiver) {
            return 'Chưa nhận đất'
        }

        return 'Đã nhận đất'
    }

    const confirmedUsers = (row, userId) => {
        if (typeof row.value.From === 'object') {
            const user = row.value.From.find(user => Object.keys(user).toString() === userId)
            return Object.values(user)[0]
        } else {
            return true
        }
    }

    const ReceiveButton = ({ row }) => {
        const [processing, setProcessing] = React.useState(false)

        const handleReceive = async () => {
            const formData = {
                key: row.key,
                userIdFromTransfer: row.value.From,
                amount: row.value.Money,
                landKey: row.value.Land
            }
            setProcessing(true)

            const result = await ConfirmFromReceiver(formData)
            console.log(result.data)
            if (!result.data.error) {
                setMessage(result.data.message)
            } else {
                setError(result.data.message)
            }
            setProcessing(false)
        }

        return (
            <Button
                variant='contained'
                color='success'
                onClick={handleReceive}
                disabled={(getStatus(row) !== 'Chưa nhận đất' ? true : false) || processing}
            >
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
                            <StyledTableCell align="right">{getStatus(row)}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <ReceiveButton row={row} />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
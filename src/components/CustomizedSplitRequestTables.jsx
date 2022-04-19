import * as React from 'react'
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material'
import { confirmSplit } from '../api';
import StyledTableRow from './StyledTableRow';
import StyledTableCell from './StyledTableCell';
import { AuthContext } from '../contexts/AuthContext';

export default function CustomizedSplitRequestTables({ rows, setMessage, setError, handleOpenDataProcesed }) {

    const { user } = React.useContext(AuthContext)

    const getStatus = (value) => {
        if (value.ConfirmFromAdmin === false) {
            return 'Chưa xử lý'
        }

        if (typeof value.UserRequest === 'object') {
            for (let i = 0; i < value.UserRequest.length; i++) {
                if (!value.UserRequest[i][Object.keys(value.UserRequest[i])])
                    return 'Chưa xác nhận'
            }
        }

        return 'Đã xác nhận'
    }

    const handleDisableConfirm = (row) => {
        if (typeof row.value.UserRequest === 'object') {
            for (let i = 0; i < row.value.UserRequest.length; i++) {
                if (Object.keys(row.value.UserRequest[i]).toString() === user.userId) {
                    return row.value.UserRequest[i][user.userId]
                }
            }
        }
        return true
    }

    const ConfirmButton = ({ row }) => {
        const [processing, setProcessing] = React.useState(false)

        const handleConfirm = async () => {
            const formData = {
                key: row.key
            }
            setProcessing(true)

            const result = await confirmSplit(formData)
            console.log(result.data)
            setProcessing(false)
            if (!result.data.error) {
                setMessage(result.data.message)
            } else {
                setError(result.data.message)
            }
        }

        return (
            <Button variant='contained' color='success' onClick={handleConfirm} disabled={() => handleDisableConfirm(row)}>
                {processing ? <CircularProgress size={25} color='inherit' /> : 'Xác Nhận'}
            </Button>
        )
    }

    const ProcessButton = ({ row }) => {

        const handleClick = () => {
            handleOpenDataProcesed(row.value.Land, row.value.DataProcessed, row.value)
        }


        return (
            <Button variant='contained' color='info' onClick={handleClick} disabled={row.value.ConfirmFromAdmin}>
                Xử lý
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
                        <StyledTableCell align="right">Số thửa muốn tách</StyledTableCell>
                        <StyledTableCell align="right">Diện tích</StyledTableCell>
                        <StyledTableCell align="right">Thời gian yêu cầu</StyledTableCell>
                        <StyledTableCell align="right">Kết quả xử lý</StyledTableCell>
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
                                {row.value.Land}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {row.value.NumOfLands}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {`[${row.value.AreaOfLands}]`}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {`${row.value.TimeStart}`}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                <Button variant='outlined' disabled={getStatus(row.value) !== 'Chưa xử lý' ? false : true} onClick={() => handleOpenDataProcesed(row.value.DataProcesed)}>Xem</Button>
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {getStatus(row.value)}
                            </StyledTableCell>

                            <StyledTableCell align="right">
                                {user.role === 'user' ?
                                    <ConfirmButton row={row} />
                                    :
                                    <ProcessButton row={row} />
                                }
                                {/* <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                
                            </Box> */}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
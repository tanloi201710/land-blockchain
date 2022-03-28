import * as React from 'react'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material'
import { confirmNewAsset } from '../api';
import { useNavigate } from 'react-router-dom';

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



export default function CustomizedNewAssetTables({ rows, setMessage, setError }) {
    const navigate = useNavigate()

    const ConfirmButton = ({ row }) => {
        const [processing, setProcessing] = React.useState(false)

        const handleConfirm = async () => {
            const formData = {
                key: row.key,
                status: 'Đã duyệt',
                userId: row.value.UserId
            }
            setProcessing(true)

            const result = await confirmNewAsset(formData)
            console.log(result.data)
            if (!result.data.error) {
                setMessage(result.data.message)
            } else {
                setError(result.data.message)
            }
            setProcessing(false)
        }

        return (
            <Button variant='contained' color='success' onClick={handleConfirm}>
                {processing ? <CircularProgress size={25} color='inherit' /> : 'Xác nhận'}
            </Button>
        )
    }

    return (
        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Mã đất</StyledTableCell>
                        <StyledTableCell align="right">Thời gian đăng ký</StyledTableCell>
                        <StyledTableCell align="right">Chủ sở hữu</StyledTableCell>
                        <StyledTableCell align="right">Thông tin chi tiết</StyledTableCell>
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
                            <StyledTableCell align="right">{row.value.ThoiGianDangKy}</StyledTableCell>
                            <StyledTableCell align="right">{typeof row.value.Owner === 'object'
                                ? row.value.Owner.join(', ')
                                : row.value.Owner}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button variant='outlined' onClick={() => navigate(`/detail/${row.key}`)}>Xem</Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">{`${row.value.Status}`}</StyledTableCell>

                            <StyledTableCell align="right">
                                {/* <Button variant='contained' color='success' onClick={() => handleReceive(row)}>
                                    {processing ? <CircularProgress size={20} color='inherit' /> : 'Nhận'}
                                </Button> */}
                                <ConfirmButton row={row} />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
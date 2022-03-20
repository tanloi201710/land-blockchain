import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton } from '@mui/material'
import { Flip, ModeEdit, Shortcut } from '@mui/icons-material'

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



export default function CustomizedTables({ rows, user }) {
    const navigate = useNavigate()
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
                        {user?.role === 'manager' &&
                            <StyledTableCell align="right">Cập nhật trạng thái</StyledTableCell>

                        }
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
                                ? row.value.Owner.join(',')
                                : row.value.Owner}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button variant='outlined' onClick={() => navigate(`/detail/${row.key}`)}>Xem</Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">{`${row.value.Status}`}</StyledTableCell>
                            {user?.role === 'user' &&
                                <StyledTableCell align="right">
                                    <Tooltip title='Chỉnh sửa thông tin'>
                                        <IconButton>
                                            <ModeEdit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Tách thửa'>
                                        <IconButton color='warning'>
                                            <Flip color='warning' />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Chuyển quyền sỡ hữu'>
                                        <IconButton color='info'>
                                            <Shortcut color='info' />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                            }

                            {user?.role === 'manager' &&
                                <StyledTableCell align="right">
                                    <Button variant='outlined' color='success'>Cập nhật</Button>
                                </StyledTableCell>
                            }
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
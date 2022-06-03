import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton, TablePagination } from '@mui/material'
import { Flip, ModeEdit, Shortcut } from '@mui/icons-material'
import StyledTableRow from './StyledTableRow'
import StyledTableCell from './StyledTableCell'

export default function CustomizedTables({ rows, user }) {
    const navigate = useNavigate()
    const disabledAction = (row) => row.value.Status !== 'Đã duyệt'
    const rowsPerPage = 5

    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }
    return (
        <Paper >
            <TableContainer >

                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Mã đất</StyledTableCell>
                            <StyledTableCell align="right">Thời gian đăng ký</StyledTableCell>
                            <StyledTableCell align="right">Chủ sở hữu</StyledTableCell>
                            <StyledTableCell align="right">Thông tin chi tiết</StyledTableCell>
                            <StyledTableCell align="right">Trạng thái</StyledTableCell>
                            {user?.role === 'user' &&
                                <StyledTableCell align="right">Thao tác</StyledTableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <StyledTableRow key={row.key}>
                                <StyledTableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                    {row.key}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.value.ThoiGianDangKy}</StyledTableCell>
                                <StyledTableCell align="right">{typeof row.value.Owner === 'object'
                                    ? row.value.Owner.join(', ')
                                    : row.value.Owner}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant='outlined' color='info' onClick={() => navigate(`/detail/${row.key}`)}>Xem</Button>
                                </StyledTableCell>
                                <StyledTableCell align="right">{`${row.value.Status}`}</StyledTableCell>
                                {user?.role === 'user' &&
                                    <StyledTableCell align="right">
                                        {/* <Tooltip title='Chỉnh sửa thông tin'>
                                            <span>
                                                <IconButton disabled={disabledAction(row)}>
                                                    <ModeEdit />
                                                </IconButton>

                                            </span>
                                        </Tooltip> */}
                                        <Tooltip title='Tách thửa'>
                                            <span>
                                                <IconButton color='warning' disabled={disabledAction(row)} onClick={() => navigate('/splitLand', { state: row })}>
                                                    <Flip color={disabledAction(row) ? 'inherit' : 'warning'} />
                                                </IconButton>

                                            </span>
                                        </Tooltip>
                                        <Tooltip title='Chuyển quyền sử dụng đất'>
                                            <span>
                                                <IconButton color='info' disabled={disabledAction(row)} onClick={() => navigate('/transferLand', { state: row })}>
                                                    <Shortcut color={disabledAction(row) ? 'inherit' : 'info'} />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                    </StyledTableCell>
                                }

                                {/* {user?.role === 'manager' &&
                                <StyledTableCell align="right">
                                    <Button variant='outlined' color='success' disabled={row.value.Status === 'Đang chuyển'}>
                                        Cập nhật
                                    </Button>
                                </StyledTableCell>
                            } */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={rows.length}
                rowsPerPage={parseInt(rowsPerPage)}
                page={page}
                onPageChange={handleChangePage}
                getItemAriaLabel={(type) => `Trang ${type === 'next' ? 'kế tiếp' : 'trước'}`}
                labelRowsPerPage="Số dòng"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count !== -1 ? count : `nhiều hơn ${to}`}`}
            />
        </Paper>
    );
}
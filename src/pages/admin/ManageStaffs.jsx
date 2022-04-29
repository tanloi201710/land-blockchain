import { Add, Clear } from '@mui/icons-material'
import { IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React from 'react'
import { getManagers, deleteManager } from '../../api'
import StyledTableCell from '../../components/StyledTableCell'
import StyledTableRow from '../../components/StyledTableRow'

const ManageStaffs = ({ setActionConfirm, handleCloseActionConfirm }) => {

  const [staffs, setStaffs] = React.useState([])

  React.useEffect(() => {
    (async () => {
      const result = await getManagers()
      if (!result.data.error) {
        setStaffs(result.data.managers)
      }
    })()
  }, [])

  const handleAddStaff = () => { }

  const handleDeleteStaff = (id) => {
    setActionConfirm(prev => {
      return {
        ...prev,
        isOpen: true,
        message: `Bạn có muốn xóa nhân viên ${id}`,
        handleConfirm: async () => {
          const result = await deleteManager(id)
          if (!result.data.error) {
            (async () => {
              const result = await getManagers()
              handleCloseActionConfirm()
              if (!result.data.error) {
                setStaffs(result.data.managers)
              }
            })()
          }
        }
      }
    })
  }


  return (
    <>
      <Tooltip title='Thêm nhân viên'>
        <IconButton
          disableRipple
          sx={{ backgroundColor: '#424242' }}
          onClick={handleAddStaff}
        >
          <Add sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>STT</StyledTableCell>
              <StyledTableCell align="right">Tên nhân viên</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Số điện thoại</StyledTableCell>
              <StyledTableCell align="right">Khu vực</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                  {index + 1}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {row.fullname}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {row.userId}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {row?.phoneNumber || '+84334131019'}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {row.city}
                </StyledTableCell>

                <StyledTableCell align="right">
                  <Tooltip title="Xóa nhân viên">
                    <IconButton onClick={() => handleDeleteStaff(row.userId)}>
                      <Clear color='error' />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ManageStaffs
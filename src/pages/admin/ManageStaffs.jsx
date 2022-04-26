import { Add } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

const ManageStaffs = () => {
  return (
    <>
      <Tooltip title='Thêm nhân viên'>
        <IconButton
          sx={{ backgroundColor: '#424242' }}
        >
          <Add sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default ManageStaffs
import { Add, Clear } from '@mui/icons-material'
import { IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React from 'react'
import { getManagers, deleteManager, addManager } from '../../api'
import AddStaffBox from '../../components/admin/AddStaffBox'
import StyledTableCell from '../../components/StyledTableCell'
import StyledTableRow from '../../components/StyledTableRow'

const ManageStaffs = ({ setActionConfirm, handleCloseActionConfirm, setError }) => {

	const initialFormData = {
		fullname: '',
		userId: '',
		password: '',
		city: '',
		phoneNumber: ''
	}

	const [staffs, setStaffs] = React.useState([])
	const [isAddStaffBox, setIsAddStaffBox] = React.useState(false)
	const [formData, setFormData] = React.useState(initialFormData)

	React.useEffect(() => {
		(async () => {
			const result = await getManagers()
			if (!result.data.error) {
				setStaffs(result.data.managers)
			}
		})()
	}, [])

	const handleAddStaff = async () => {
		setIsAddStaffBox(false)
		const result = await addManager(formData)
		if (!result.data.error) {
			(async () => {
				const result = await getManagers()
				if (!result.data.error) {
					setStaffs(result.data.managers)
				}
			})()
		} else {
			setError(result.data.message)
		}
		setFormData(initialFormData)
	}

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

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	const handleCloseAddStaffBox = () => {
		setIsAddStaffBox(false)
		setFormData(initialFormData)
	}


	return (
		<>
			<Tooltip title='Thêm nhân viên'>
				<IconButton
					disableRipple
					sx={{ backgroundColor: '#424242' }}
					onClick={() => setIsAddStaffBox(true)}
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

			{isAddStaffBox
				&& <AddStaffBox
					handleClose={handleCloseAddStaffBox}
					handleChange={handleChange}
					formData={formData}
					handleSubmit={handleAddStaff}

				/>
			}
		</>
	)
}

export default ManageStaffs
import * as React from 'react'
import {
    Grid, MenuItem, TextField, Paper,
    Chip, IconButton, Typography, Button,
    Box, Stepper, Step, StepLabel, StepContent,
    Tooltip
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { Add } from '@mui/icons-material';
import AddOwnerForm from './AddOwnerForm';

const steps = [
    {
        label: 'Chọn mãnh đất'
    },
    {
        label: 'Chọn người muốn chuyển'
    },
    {
        label: 'Nhập số tiền muốn chuyển'
    },
];

export default function CustomizedStepper({ values, setValues, handleSubmit }) {
    const { lands } = React.useContext(AuthContext)
    const [currentLand, setCurrentLand] = React.useState(values.land)
    const [activeStep, setActiveStep] = React.useState(0)
    const [openOwnerForm, setOpenOwnerForm] = React.useState(false)

    console.log(currentLand)
    console.log(lands.find(land => land.key === currentLand.key))

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleDelete = (userId) => {
        const newArr = values.owners.filter(value => value.userId !== userId)
        setValues({ ...values, owners: newArr })
    }

    const handleAddOwner = (owner) => {
        const existingOwner = values.owners.find(value => value.userId === owner.userId)
        if (!existingOwner) {
            setValues({ ...values, owners: [...values.owners, owner] })
        }
        return
    }

    return (
        <Box sx={{ width: 700 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Bước cuối</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            {index === 0
                                ? (
                                    <>
                                        <TextField
                                            select
                                            fullWidth
                                            required
                                            name='landKey'
                                            label='Chọn mãnh đất'
                                            value={lands.find(land => land.key === currentLand.key)}
                                            onChange={(e) => {
                                                const land = e.target.value
                                                setValues({ ...values, land: land })
                                                setCurrentLand(land)
                                            }}
                                        >
                                            {lands.map((land, index) => (
                                                <MenuItem key={index} value={land}>
                                                    {land.key}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Grid container spacing={2} sx={{ marginY: 2 }}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    color='info'
                                                    label='Thửa đất số'
                                                    disabled
                                                    fullWidth
                                                    value={currentLand?.value?.ThuaDatSo || ""}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label='Diện tích'
                                                    disabled
                                                    fullWidth
                                                    value={currentLand?.value?.DienTich || ""}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label='Địa chỉ'
                                                    disabled
                                                    fullWidth
                                                    value={currentLand?.value?.Address || ""}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label='Thời gian đăng ký'
                                                    disabled
                                                    fullWidth
                                                    value={currentLand?.value?.ThoiGianDangKy || ""}
                                                />
                                            </Grid>
                                        </Grid>
                                    </>
                                )

                                : index === 1 ? (
                                    <><Paper
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            flexWrap: 'wrap',
                                            listStyle: 'none',
                                            p: 0.5,
                                            m: 0,
                                        }}
                                        component="ul"
                                    >
                                        {values.owners.map((value, index) => (
                                            <li key={index} style={{ margin: 2.5 }}>
                                                <Chip
                                                    label={value.fullname}
                                                    onDelete={() => handleDelete(value.userId)}
                                                />
                                            </li>
                                        ))}
                                    </Paper>
                                        <Tooltip title='Thêm người muốn chuyển'>
                                            <IconButton
                                                disableRipple
                                                sx={{ backgroundColor: '#424242', marginY: 5 }}
                                                onClick={() => setOpenOwnerForm(true)}
                                            >
                                                <Add sx={{ color: 'white' }} />
                                            </IconButton>
                                        </Tooltip>

                                        {openOwnerForm && <AddOwnerForm handleClose={() => setOpenOwnerForm(false)} handleSubmit={handleAddOwner} />}
                                    </>
                                ) : <>
                                    <TextField
                                        label='Nhập số tiền muốn chuyển(không bắt buộc)'
                                        type="text"
                                        fullWidth
                                        value={values.amount}
                                        onChange={(event) => setValues({ ...values, amount: event.target.value })}
                                    />
                                </>
                            }

                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Hoàn Thành' : 'Tiếp tục'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Quay lại
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                    <Typography variant="h6">Xác nhận chuyển đất</Typography>
                    <Box>
                        <Typography component='span'>Mãnh đất muốn chuyển: </Typography>
                        <Typography component='span' sx={{ fontWeight: 'bold' }}>{values.land.key}</Typography>

                    </Box>
                    <Box>
                        <Typography component='span'>Người thụ hưởng: </Typography>
                        <Typography component='span' sx={{ fontWeight: 'bold' }}>{values.owners.map(owner => owner.fullname).join(', ')}</Typography>

                    </Box>
                    <Box>
                        <Typography component='span'>Số tiền chuyển kèm: </Typography>
                        <Typography component='span' sx={{ fontWeight: 'bold' }}>{values.amount || 0}</Typography>

                    </Box>
                    <Box>

                        <Button onClick={handleSubmit} sx={{ mt: 1, mr: 1 }} variant='contained'>
                            Xác nhận
                        </Button>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} variant='outlined'>
                            Nhập lại
                        </Button>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}

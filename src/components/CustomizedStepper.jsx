import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid, MenuItem, TextField } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';

const steps = [
    {
        label: 'Chọn mãnh đất',
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Chọn người muốn chuyển',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Nhập số tiền muốn chuyển',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default function CustomizedStepper({ values, setValues }) {
    const { lands } = React.useContext(AuthContext)
    const [currentLand, setCurrentLand] = React.useState({})
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: 700 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
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
                                            value={values?.land || ""}
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

                                : null
                            }

                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

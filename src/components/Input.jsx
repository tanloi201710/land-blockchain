import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'

const Input = ({
    half, name, handleChange,
    label, autoFocus, autoComplete,
    type, handleShowPassword,
    error, helperText, onBlur, value,
    disabled
}) => {

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                defaultValue={value}
                variant="outlined"
                required
                fullWidth
                disabled={disabled}
                label={label}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                type={type}
                error={error}
                helperText={helperText}
                onBlur={onBlur}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input

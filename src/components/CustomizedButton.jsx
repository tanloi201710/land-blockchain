import { Button } from '@mui/material'
import React from 'react'

const CustomizedButton = (props) => {
    return (
        <Button
            variant={props.variant}
            color={props.color}
            sx={{
                borderRadius: 50,
                minWidth: 80
            }}
        >
            {props.children}
        </Button>
    )
}

export default CustomizedButton
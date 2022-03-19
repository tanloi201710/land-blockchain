import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts({ serverity, message, onClose }) {
    return (
        <Stack sx={{ width: '50%', position: 'absolute', top: 10, zIndex: 99999 }} >
            <Alert severity={serverity} onClose={onClose} >{message}</Alert>
        </Stack>
    );
}
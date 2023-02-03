import React from 'react';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

export function AppBarToggleIcon() {
    return (
        <MenuIcon />
    )
}

export function AppBarBody() {
    return (
        <Typography variant="h6" noWrap component="div">
            Mini variant drawer
        </Typography>
    )
}
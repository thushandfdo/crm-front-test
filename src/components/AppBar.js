import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useStyles } from '../Styles';
import { Divider, IconButton, Menu } from '@mui/material';

export function AppBarBody() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drop, setDrop] = useState(false);
    const { classes } = useStyles();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
        setDrop(!drop);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setDrop(!drop);
    };

    return (
        <Toolbar className={classes.toolbar}>
            <div className={classes.avatarContainer}>
                <Typography
                    variant='h6'
                    onClick={handleOpenUserMenu}
                    className={classes.avatarUsername}
                >
                    Thushan D. Fernando
                </Typography>
                <IconButton onClick={handleOpenUserMenu} className={classes.dropIcon}>
                    {!drop ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                </IconButton>
                <Menu
                    sx={{ mt: '45px' }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    className={classes.hiddenMenu}
                >
                    <div className='hiddenMenuContent'>
                        <Typography>Administrator</Typography>
                        <Divider />
                        <Typography className={classes.editProfile} >Edit Profile</Typography>
                        <Button
                            disableRipple
                            startIcon={<LogoutOutlinedIcon />}
                            className={classes.signout}
                        >
                            Signout
                        </Button>
                    </div>
                </Menu>
            </div>
            <Avatar className={classes.avatar} src={require('../images/profile_01.jpg')} />
        </Toolbar>
    )
}
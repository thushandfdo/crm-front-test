import React, { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useStyles } from '../Styles';
import { Divider, IconButton, Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';

export function AppBarBody() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drop, setDrop] = useState(false);
    const [userWidth, setUserWidth] = useState(0);
    const { classes } = useStyles();
    const usernameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUserWidth(usernameRef.current.clientWidth);
    }, [userWidth]);

    const handleOpenUserMenu = () => {
        setAnchorElUser(usernameRef.current);
        setDrop(!drop);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setDrop(!drop);
    };

    const userMenuItems = [
        {
            text: "Edit Profile",
            icon: <AccountCircleIcon fontSize='small' />,
            path: '/edit-profile'
        },
        {
            text: "Log out",
            icon: <LogoutOutlinedIcon fontSize='small' />,
            path: '/'
        }
    ]

    return (
        <Toolbar className={classes.toolbar}>
            <div className={classes.avatarContainer}>
                <Typography
                    variant='h6'
                    onClick={handleOpenUserMenu}
                    className={classes.avatarUsername}
                    ref={usernameRef}
                >
                    Thushan D. Fernando
                </Typography>
                <IconButton
                    onClick={handleOpenUserMenu}
                    className={classes.dropIcon}>
                    {!drop ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                </IconButton>
                <Menu
                    sx={{
                        '& .MuiMenu-paper': {
                            width: `${userWidth}px`
                        }
                    }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    className={classes.hiddenMenu}
                >
                    <MenuItem sx={{ bottom: '-5px' }}>
                        <Typography className={classes.userType}>Administrator</Typography>
                    </MenuItem>
                    <Divider />
                        {userMenuItems.map(item => (
                            <MenuItem key={item.text} onClick={() => navigate(item.path)}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>{item.text}</ListItemText>
                            </MenuItem>
                        ))}
                </Menu>
            </div>
            <Avatar className={classes.avatar} src={require('../images/profile_01.jpg')} />
        </Toolbar>
    )
}
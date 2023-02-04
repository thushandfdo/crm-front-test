import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import SubjectOutlined from '@mui/icons-material/SubjectOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStyles } from '../Styles';

export function DrawerBody({ open }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { classes } = useStyles();

    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined className={classes.drawerIcon} />,
            path: '/'
        },
        {
            text: "Create Note",
            icon: <AddCircleOutlined className={classes.drawerIcon} />,
            path: '/create'
        }
    ]

    return (
        <div className="drawer-body">
            <List className={classes.topicList}>
                {menuItems.map(item => (
                    <ListItem
                        key={item.text}
                        onClick={() => navigate(item.path)}
                        className={(location.pathname === item.path) ? classes.active : null}
                        disablePadding sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} className={classes.drawerText} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

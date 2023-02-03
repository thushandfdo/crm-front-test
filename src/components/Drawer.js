import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import SubjectOutlined from '@mui/icons-material/SubjectOutlined';
import { useNavigate, useLocation } from 'react-router-dom';

export function DrawerBody({ open }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: "Create Note",
            icon: <AddCircleOutlined color='secondary' />,
            path: '/create'
        }
    ]

    return (
        <div className="drawer-body">
            <List>
                {menuItems.map(item => (
                    <ListItem
                        key={item.text}
                        onClick={() => navigate(item.path)}

                        disablePadding sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                backgroundColor: (location.pathname === item.path) ? '#f4f4f4' : 'inherit'
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
                            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

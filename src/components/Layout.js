import React from 'react'
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import SubjectOutlined from '@mui/icons-material/SubjectOutlined';
import { useStyles } from '../Styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

function Layout({ children }) {
    const { classes } = useStyles();
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
        <div className={classes.root}>
            {/* app bar */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the { format(new Date(), 'do MMMM Y') }
                    </Typography>
                    <Typography>
                        Thushan D. Fernando
                    </Typography>
                    <Avatar className={classes.avatar} src='/mario-av.png' />
                </Toolbar>
            </AppBar>

            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant='permanent'
                anchor='left'
                classes={{ paper: classes.drawerPaper }}
            >
                <div className="">
                    <Typography variant='h5' className={classes.title}>Ninja Notes</Typography>
                    <List>
                        {menuItems.map(item => (
                            <ListItem 
                                button
                                key={item.text}
                                onClick={() => navigate(item.path)}
                                className={(location.pathname === item.path) ? classes.active : null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText>{item.text}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>

            {/* main content */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}

export default Layout;

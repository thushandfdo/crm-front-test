import { makeStyles } from "tss-react/mui";
import { blue, pink, green, yellow } from "@mui/material/colors";

const drawerWidth = 240;

export const useStyles = makeStyles()((theme) => {
    return {
        field: {
            marginTop: 20,
            marginBottom: 20,
            display: 'block'
        },
        page: {
            backgroundColor: '#efefef',
            width: '100%',
            minHeight: '100vh',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            backgroundColor: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        yellowAvatar: {
            backgroundColor: `${yellow[700]}`
        },
        greenAvatar: {
            backgroundColor: `${green[500]}`
        },
        blueAvatar: {
            backgroundColor: `${blue[500]}`
        },
        pinkAvatar: {
            backgroundColor: `${pink[500]}`
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
});
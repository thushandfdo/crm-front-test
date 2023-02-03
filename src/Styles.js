import { makeStyles } from "tss-react/mui";
import { blue, pink, green, yellow } from "@mui/material/colors";

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
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
});
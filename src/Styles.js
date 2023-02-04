import { styled } from '@mui/system';
import { makeStyles } from "tss-react/mui";
import { blue, pink, green, yellow } from "@mui/material/colors";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import { Button } from '@mui/material';

export const useStyles = makeStyles()((theme) => {
    const cardBack = 'lightgray';
    const cardRadius = theme.spacing(1);

    return {
        field: {
            marginTop: 20,
            marginBottom: 20,
            display: 'block'
        },
        container: {
            backgroundColor: cardBack,
            padding: theme.spacing(2),
            borderRadius: cardRadius,
        },
        page: {
            backgroundColor: '#d2d4d9',
            width: '100%',
            minHeight: '100vh',
            padding: theme.spacing(3)
        },
        active: {
            backgroundColor: '#3b3b74'
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
        noteCard: {
            backgroundColor: 'lightgray'
        },
        avatar: {
            marginLeft: theme.spacing(2)
        },
        avatarContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 40px',
            alignItems: 'center',
        },
        avatarUsername: {
            cursor: 'pointer'
        },
        hiddenMenu: {
            '& .MuiMenu-list': {
                padding: 0
            },
            '& .MuiMenu-paper': {
                borderRadius: '8px',
                backgroundColor: '#d2d2d2',
            },
            '& .hiddenMenuContent': {
                padding: '10px 20px',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridAutoRows: 'minmax(20px, auto)',
                alignItems: 'center',
                justifyContent: 'flex-start'
            }
        },
        userType: {
            paddingBottom: 0,
            paddingTop: '5px',
            textAlign: 'center',
            width: '100%',
        },
        editProfile: {
            color: 'gray',
            cursor: 'pointer',
            '&:active': {
                color: '#636161'
            }
        },
        signout: {
            paddingLeft: '2px',
            paddingTop: theme.spacing(1),
            paddingBottom: 0,
            '&:hover': {
                backgroundColor: 'transparent'
            },
            '&:active': {
                color: '#085086'
            }
        },
        toolbar: {
            alignItems: 'right',
            justifyContent: 'flex-end',
            backgroundColor: '#f5f5f5',
            color: '#000',
            paddingRight: 0,
        },
        drawer: {
            '& .MuiDrawer-paper': {
                backgroundColor: '#5255c1'
            }
        },
        drawerIcon: {
            color: '#fff'
        },
        drawerText: {
            color: '#fff'
        },
        drawerHead: {
            backgroundColor: 'transparent'
        },
        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        logo: {
            width: '50%',
            marginRight: '15%',
            padding: 0
        },
        topicList: {
            paddingTop: 0
        },
        customerList: {
            backgroundColor: 'lightgray',
            borderRadius: cardRadius,
            marginTop: 0,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        // MuiCardContent-root css-bja8hb-MuiCardContent-root 
        customerContent: {
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2)
        }
    }
});

export const CustomButton = styled(Button)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: transparent;
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: transparent;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: transparent;
    box-shadow: 0;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0), 0 0 0 0 rgba(0, 127, 255, 0);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
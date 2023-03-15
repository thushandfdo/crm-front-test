import { makeStyles } from "tss-react/mui";
import backimage from './images/page-back.svg';

export const useStyles = makeStyles()((theme) => {
    const cardBack = 'lightgray';
    const cardRadius = theme.spacing(1);

    return {
        layoutContent: {
            flexGrow: 1,
            padding: theme.spacing(3),
            minHeight: '100vh',
            backgroundImage: `url(${backimage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        field: {
            marginTop: 20,
            marginBottom: 20,
            display: 'block',
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
        avatar: {
            marginLeft: theme.spacing(2)
        },
        avatarContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 40px',
            alignItems: 'center',
        },
        avatarUsername: {
            cursor: 'pointer',
            marginRight: '10px',
            minWidth: '150px',
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
        customerCard: {
            backgroundColor: 'lightgray',
        },
        customerContent: {
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2)
        },
        searchBarContainer: {
            position: 'sticky',
            top: '70px',
            zIndex: 5,
            backgroundColor: '#fff',
            padding: '5px',
            borderRadius: '8px',
        },
        searchBar: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: '#cdcdcd',
            padding: '5px',
            paddingLeft: '20px',
            borderRadius: '8px',
            columnGap: theme.spacing(1),
        },
        searchStack: {
            '& .MuiToggleButtonGroup-root .MuiToggleButton-root': {
                border: '1px solid gray',
                padding: '2px 5px',
            }
        },
        projectFormContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: '50px',
            width: '100%'
        },
        endUserContainer: {
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            columnGap: '20px',
        },
        endUserFormContainer: {
            
        },
        endUserSearchDiv: {
            minHeight: '82vh',
            backgroundColor: 'lightgray',
            borderRadius: theme.spacing(2),
            padding: theme.spacing(2),
        },
        euSearch: {
            width: '100%',
            '& .MuiToggleButtonGroup-root': {
                padding: theme.spacing(1)
            },
            '& .MuiToggleButtonGroup-root .MuiToggleButton-root': {
                border: '1px solid gray',
                padding: '2px 5px',
                width: '100%',
            }
        }
    }
});

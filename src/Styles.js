import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
    const cardBack = 'lightgray';
    const cardRadius = theme.spacing(1);

    return {
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
        customerCard: {
            backgroundColor: 'lightgray',
        },
        customerContent: {
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2)
        },
        addCustomerForm: {
            backgroundColor: cardBack,
            padding: theme.spacing(2),
            borderRadius: cardRadius,
        },
        floatIcon: {
            position: 'relative',
            top: 0,
            left: '-40px',
            display: 'inline'
        },
        rightPanel: {
            display: 'grid',
            justifyContent: 'center'
        },
        toggleButtons: {
            width: '100%',
            marginBottom: theme.spacing(1),
        },
        searchBar: {
            position: 'relative',
            top: '-15px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: '#cdcdcd',
            padding: '5px',
            paddingLeft: '20px',
            borderRadius: '8px',
        },
        searchStack: {
            // maxHeight: '24px', 
            '& .MuiToggleButtonGroup-root': {
                maxHeight: '24px',
                '& .MuiToggleButton-root': {
                    border: '1px solid gray',
                }
            }
        },
        // testToggle: {
        //     '& .MuiToggleButton-root': {
        //         padding: '10px',
        //         margin: '20px',
        //         border: '1px solid black',
        //         borderRadius: '0px',
        //         borderLeft: '1px solid black',
        //     },
        // }
    }
});

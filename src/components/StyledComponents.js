import { alpha, InputBase, styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { blue, pink, green, yellow } from "@mui/material/colors";

const getClass = (category) => {
    switch (category) {
        case 'money':
            return green[500]
        case 'todos':
            return pink[500]
        case 'reminders':
            return blue[500]
        case 'work':
            return yellow[700]
        default:
            return yellow[700]
    }
}

export const NoteAvatar = styled(Avatar, {
    shouldForwardProp: (prop) => prop !== 'category'
})(({ category }) => ({
    backgroundColor: `${getClass(category)}`
}));

const panelOpen = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    width: '100%',
});

const panelClose = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
});

export const EmptyRightPanel = styled('div')(
    ({ theme, open }) => ({
        // display: 'absolute',
        // top: 0,
        // display: 'inline-block',
        ...(open && {
            ...panelOpen(theme),
        }),
        ...(!open && {
            ...panelClose(theme),
        }),
        overflowX: 'hidden',
    }),
);

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
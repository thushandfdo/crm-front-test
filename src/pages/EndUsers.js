import React, { useState, useEffect } from 'react';
import { useStyles } from '../Styles';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/StyledComponents';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Masonry from 'react-masonry-css';
import SearchBar from '../components/SearchBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { generate } from '@wcj/generate-password';
import { newCustomerMail } from './Newsletters';

export default function EndUser() {
    const { classes } = useStyles();

    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('project');

    const [fetchError, setFetchError] = useState(false);
    const [endUsers, setEndUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    const [company, setCompany] = useState('');
    const [companyError, setCompanyError] = useState(false);
    var cError = false;

    const [project, setProject] = useState('');
    const [projectError, setProjectError] = useState(false);
    var pError = false;

    const [soldDate, setSoldDate] = useState('');
    const [soldDateError, setSoldDateError] = useState(false);
    var sdError = false;

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const handleSort = (event, newSort) => {
        if (newSort !== null) {
            setSortField(newSort);
        }
    };

    const handleClear = () => {
        // setType(userTypes[1]);
        // setFirstName('');
        // setLastName('');
        // setContact('');
        // setEmail('');
        // setSearch('');
        // setUpdateId('');
        // setCategory('name');
        // clearErrors();

        // if (!isUpdate)
        //     setIsUpdate(false);

        // setUsername('');
        // setPassword('');
    };

    const clearErrors = () => {
        // setUserTypeError(false);
        // setFirstNameError(false);
        // setLastNameError(false);
        // setContactError(false);
        // setEmailError(false);
        // setusernameError(false);
        // setPasswordError(false);

        // utError = false;
        // fError = false;
        // lError = false;
        // cNoError = false;
        // eError = false;
        // uError = false;
        // pError = false;
    };

    const validateForm = () => {
        // clearErrors();

        // var emailDuplicated = false;

        // if (isUpdate) {
        //     emailDuplicated = users.some(user => user.email === email && user.userId !== updateId);
        // }
        // else {
        //     emailDuplicated = users.some(user => user.email === email);
        // }

        // setEmailErrorMsg(emailDuplicated ? 'Email is already recorded' : 'Invalid email format');

        // if (type === '' || type === null) {
        //     setUserTypeError(true);
        //     utError = true;
        // }

        // if (firstName === '') {
        //     setFirstNameError(true);
        //     fError = true;
        // }

        // if (lastName === '') {
        //     setLastNameError(true)
        //     lError = true;
        // }

        // if (contactNo === '') {
        //     setContactError(true);
        //     cNoError = true;
        // }

        // var mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        // if (email === "" || !mailFormat.test(email) || emailDuplicated) {
        //     setEmailError(true);
        //     eError = true;
        // }

        // if (username === '') {
        //     setusernameError(true);
        //     uError = true;
        // }

        // if (password === '') {
        //     setPasswordError(true);
        //     pError = true;
        // }

        // if (!(utError || fError || lError || cNoError || eError || (!isUpdate && (uError || pError))))
        //     return true;
        // else
        //     return false;
    }

    const saveUser = (e) => {
        // e.preventDefault();

        // if (validateForm()) {
        //     var data = {
        //         type,
        //         username, password, firstName, lastName, contactNo, email,
        //         profilePic: '-'
        //     };

        //     createAPIEndpoint(ENDPOINTS.user)
        //         .post(data)
        //         .then((res) => {
        //             if (res.status === 200) {
        //                 handleClear();
        //                 setOpen(!open);
        //                 newCustomerMail(firstName + ' ' + lastName, email, username, password);
        //                 loadData();
        //                 console.log('User saved...!');
        //             }
        //         })
        //         .catch(err => {
        //             console.log(err);
        //             alert('Insert Failed..!');
        //         });
        // }
    };

    const deleteUser = async (id) => {
        // await createAPIEndpoint(ENDPOINTS.user)
        //     .delete(id)
        //     .then(res => {
        //         if (res.status === 200) {
        //             const newUsers = users.filter(user => user.userId !== id);
        //             setUsers(newUsers);
        //             loadData();
        //             return;
        //         }
        //         throw new Error("User can not be deleted..!");
        //     })
        //     .catch(err => {
        //         alert("Deletion Error..!");
        //         console.log(err);
        //     });
    };

    const setToUpdate = (id) => {
        // const user = users.find(u => u.userId === id);

        // setType(user.type);
        // setFirstName(user.firstName);
        // setLastName(user.firstName);
        // setContact(user.contactNo);
        // setEmail(user.email);
        // setOpen(true);
        // setIsUpdate(true);
        // setUpdateId(id);
    };

    const updateUser = () => {
        // if (validateForm()) {
        //     var u = users.find(user => user.userId === updateId);

        //     if (
        //         u.type === type &&
        //         u.firstName === firstName &&
        //         u.lastName === lastName &&
        //         u.contactNo === contactNo &&
        //         u.email === email
        //     ) {
        //         alert("Not changed...!");
        //     }
        //     else {
        //         var data = {
        //             type, firstName, lastName, contactNo, email
        //         };

        //         createAPIEndpoint(ENDPOINTS.user)
        //             .put(updateId, data)
        //             .then(() => {
        //                 handleClear();
        //                 loadData();
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //                 alert('Update Failed..!');
        //             });
        //     }

        //     setOpen(!open);
        //     setIsUpdate(!isUpdate);
        // }
    }

    const loadData = () => {
        // createAPIEndpoint(ENDPOINTS.user)
        //     .fetch()
        //     .then(res => {
        //         if (res.status === 200) {
        //             setFetchError(false);
        //             return res.data;
        //         }
        //         throw new Error("Can not fetch Users...!")
        //     })
        //     .then(data => {
        //         setUsers(data);
        //     })
        //     .catch(err => {
        //         setFetchError(true);
        //         console.log(err);
        //     });
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='end-user'>
            <div className={classes.endUserContainer}>
                <div className={classes.endUserFormContainer}>
                    <Card elevation={1} className={classes.customerCard}>
                        <CardHeader
                            title='Add a new End-user'
                        // className={classes.customerCardHeader}
                        />
                        <Divider />
                        <div className={classes.customerContent} style={{ padding: '30px 5%' }}>
                            <TextField
                                autoFocus
                                required
                                fullWidth
                                type='text'
                                name='company'
                                value={company}
                                label='Company'
                                variant='outlined'
                                color='secondary'
                                error={companyError}
                                helperText={companyError ? 'Can not be Empty' : null}
                                onChange={(e) => setCompany(e.target.value)}
                            />

                            <div className={classes.field}>
                                <Autocomplete
                                    value={project}
                                    onChange={(event, newValue) => {
                                        setProject(newValue);
                                    }}
                                    disablePortal
                                    options={projects}
                                    renderInput={({ inputProps, ...rest }) =>
                                        <TextField {...rest}
                                            autoFocus
                                            required
                                            fullWidth
                                            name='type'
                                            label='Project'
                                            variant='outlined'
                                            color='secondary'
                                            inputProps={{ ...inputProps }}
                                        />
                                    }
                                />
                                {projectError && <span style={{ color: '#d32f2f', fontSize: '12px' }}>Select a Project</span>}
                            </div>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Sold Date"
                                    inputFormat="MM/DD/YYYY"
                                    value={soldDate}
                                    onChange={(value) => setSoldDate(value)}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            fullWidth
                                            variant='outlined'
                                            color='secondary'
                                            className={classes.field}
                                            error={soldDateError}
                                            helperText={soldDateError ? "Can not be Empty" : null}
                                        />}
                                />
                            </LocalizationProvider>

                            <Stack direction='row' spacing={2} sx={{ mt: 3 }} justifyContent='right'>
                                <Button
                                    variant='outlined'
                                    onClick={handleClear}
                                >
                                    Clear
                                </Button>

                                <Button
                                    variant='contained'
                                    onClick={(isUpdate) ? updateUser : saveUser}
                                >
                                    {(isUpdate) ? 'Update' : 'Save'}
                                </Button>
                            </Stack>
                        </div>
                    </Card>
                </div>
                <div className={classes.endUserSearchDiv}>
                    <div className={classes.euSearch}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchRoundedIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                value={search}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Search>
                        <ToggleButtonGroup
                            value={sortField}
                            exclusive
                            onChange={handleSort}
                            sx={{ width: '100%' }}
                        >
                            <ToggleButton value='project'>
                                by Project
                            </ToggleButton>
                            <ToggleButton value='user'>
                                by User
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div>
                        {(!fetchError)
                            ? endUsers
                                .map(endUser => (
                                    <Card elevation={1} key={endUser.id} className={classes.customerCard}>
                                        <CardHeader
                                            title={endUser.company}
                                            subheader={endUser.company}
                                            className={classes.customerCardHeader}
                                        />
                                        <Divider />
                                        <div className={classes.customerContent}>
                                            <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                                {endUser.soldDate}
                                            </Typography>
                                        </div>
                                    </Card>
                                ))
                            : <Typography className={classes.error}>Loading...</Typography>}
                    </div>
                </div>
            </div>
        </div>
    )
}

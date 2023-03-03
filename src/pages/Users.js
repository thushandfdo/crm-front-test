import React, { useState, useEffect } from 'react';
import { useStyles } from '../Styles';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
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

export default function Users() {
    const { classes } = useStyles();

    const userTypes = ['Admin', 'Tech Lead'];
    const [type, setType] = useState(userTypes[1]);
    const [userTypeError, setUserTypeError] = useState(false);
    var utError = false;

    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    var fError = false;

    const [lastName, setLastName] = useState('');
    const [lastNameError, setLastNameError] = useState(false);
    var lError = false;

    const [contactNo, setContact] = useState('');
    const [contactError, setContactError] = useState(false);
    var cNoError = false;

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    var eError = false;

    const [username, setUsername] = useState('');
    const [usernameError, setusernameError] = useState(false);
    var uError = false;

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    var pError = false;

    const [fetchError, setFetchError] = useState(false);
    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('name');

    const [sortField, setSortField] = useState('all');
    const [descending, setDescending] = useState(1);

    const [open, setOpen] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const [emailErrorMsg, setEmailErrorMsg] = useState('');

    const fullWidth = true;

    const breakpoints = {
        default: 4,
        1100: 3,
        830: 2
    }

    const handleClear = () => {
        setType(userTypes[1]);
        setFirstName('');
        setLastName('');
        setContact('');
        setEmail('');
        setSearch('');
        setUpdateId('');
        setCategory('name');
        clearErrors();

        if (!isUpdate)
            setIsUpdate(false);

        setUsername('');
        setPassword('');
    };

    const clearErrors = () => {
        setUserTypeError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setContactError(false);
        setEmailError(false);
        setusernameError(false);
        setPasswordError(false);

        utError = false;
        fError = false;
        lError = false;
        cNoError = false;
        eError = false;
        uError = false;
        pError = false;
    };

    const validateForm = () => {
        clearErrors();

        var emailDuplicated = false;

        if (isUpdate) {
            emailDuplicated = users.some(user => user.email === email && user.userId !== updateId);
        }
        else {
            emailDuplicated = users.some(user => user.email === email);
        }

        setEmailErrorMsg(emailDuplicated ? 'Email is already recorded' : 'Invalid email format');

        if (type === '' || type === null) {
            setUserTypeError(true);
            utError = true;
        }

        if (firstName === '') {
            setFirstNameError(true);
            fError = true;
        }

        if (lastName === '') {
            setLastNameError(true)
            lError = true;
        }

        if (contactNo === '') {
            setContactError(true);
            cNoError = true;
        }

        var mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (email === "" || !mailFormat.test(email) || emailDuplicated) {
            setEmailError(true);
            eError = true;
        }

        if (username === '') {
            setusernameError(true);
            uError = true;
        }

        if (password === '') {
            setPasswordError(true);
            pError = true;
        }

        if (!(utError || fError || lError || cNoError || eError || (!isUpdate && (uError || pError))))
            return true;
        else
            return false;
    }

    const saveUser = (e) => {
        e.preventDefault();

        if (validateForm()) {
            var data = {
                type,
                username, password, firstName, lastName, contactNo, email,
                profilePic: '-'
            };

            createAPIEndpoint(ENDPOINTS.user)
                .post(data)
                .then((res) => {
                    if (res.status === 200) {
                        handleClear();
                        setOpen(!open);
                        newCustomerMail(firstName + ' ' + lastName, email, username, password);
                        loadData();
                        console.log('User saved...!');
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert('Insert Failed..!');
                });
        }
    };

    const deleteUser = async (id) => {
        await createAPIEndpoint(ENDPOINTS.user)
            .delete(id)
            .then(res => {
                if (res.status === 200) {
                    const newUsers = users.filter(user => user.userId !== id);
                    setUsers(newUsers);
                    loadData();
                    return;
                }
                throw new Error("User can not be deleted..!");
            })
            .catch(err => {
                alert("Deletion Error..!");
                console.log(err);
            });
    };

    const setToUpdate = (id) => {
        const user = users.find(u => u.userId === id);

        setType(user.type);
        setFirstName(user.firstName);
        setLastName(user.firstName);
        setContact(user.contactNo);
        setEmail(user.email);
        setOpen(true);
        setIsUpdate(true);
        setUpdateId(id);
    };

    const updateUser = () => {
        if (validateForm()) {
            var u = users.find(user => user.userId === updateId);

            if (
                u.type === type &&
                u.firstName === firstName &&
                u.lastName === lastName &&
                u.contactNo === contactNo &&
                u.email === email
            ) {
                alert("Not changed...!");
            }
            else {
                var data = {
                    type, firstName, lastName, contactNo, email
                };

                createAPIEndpoint(ENDPOINTS.user)
                    .put(updateId, data)
                    .then(() => {
                        handleClear();
                        loadData();
                    })
                    .catch(err => {
                        console.log(err);
                        alert('Update Failed..!');
                    });
            }

            setOpen(!open);
            setIsUpdate(!isUpdate);
        }
    }

    const loadData = () => {
        createAPIEndpoint(ENDPOINTS.user)
            .fetch()
            .then(res => {
                if (res.status === 200) {
                    setFetchError(false);
                    return res.data;
                }
                throw new Error("Can not fetch Users...!")
            })
            .then(data => {
                setUsers(data);
            })
            .catch(err => {
                setFetchError(true);
                console.log(err);
            });
    };

    const userGrid = () => {
        return (
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {(!fetchError)
                    ? users
                        .filter(user =>
                            (category === 'name')
                                ? (user.firstName + " " + user.lastName).toLowerCase().includes(search.toLowerCase())
                                : user[category].toLowerCase().includes(search.toLowerCase())
                        )
                        .filter(user =>
                            (sortField !== 'all')
                                ? user.type.replace(/\s/g, '').toLowerCase() === sortField.toLowerCase()
                                : user.type !== 'Customer'
                        )
                        .sort((u1, u2) => {
                            var name1 = u1.firstName + " " + u1.lastName;
                            var name2 = u2.firstName + " " + u2.lastName;

                            return (
                                (name1 < name2)
                                    ? -descending
                                    : (name1 > name2) ? descending : 0
                            );
                        })
                        .map(user => (
                            <Card elevation={1} key={user.userId} className={classes.customerCard}>
                                <CardHeader
                                    action={
                                        <Stack direction='row' spacing={1}>
                                            <IconButton onClick={() => setToUpdate(user.userId)}>
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton onClick={() => deleteUser(user.userId)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Stack>
                                    }
                                    title={user.firstName + " " + user.lastName}
                                    subheader={user.type}
                                    className={classes.customerCardHeader}
                                />
                                <Divider />
                                <div className={classes.customerContent}>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {user.contactNo}
                                    </Typography>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {user.email}
                                    </Typography>
                                </div>
                            </Card>
                        ))
                    : <Typography className={classes.error}>Loading...</Typography>}
            </Masonry>
        )
    };

    const handleDialogClose = () => {
        setOpen(!open);
        setIsUpdate(false);
        handleClear();
    };

    const sortFieldList = [
        {
            value: 'techLead',
            text: 'Tech Lead'
        },
        {
            value: 'admin',
            text: 'Admin'
        },
        {
            value: 'all',
            text: 'All'
        },
    ]

    const searchByList = [
        {
            value: 'name',
            text: 'by Name'
        },
        {
            value: 'contactNo',
            text: 'by Contact No'
        },
        {
            value: 'email',
            text: 'by Email'
        }
    ]

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (open && !isUpdate) {
            if (password === '') {
                var pwd = generate({ length: 10 });
                setPassword(pwd);
            }
            setUsername(firstName.replace(/\s/g, '_'));
        }
    }, [open, isUpdate, firstName, password]);

    return (
        <div className='users'>
            <div className={classes.searchBarContainer}>
                <SearchBar
                    sortFieldList={sortFieldList} searchByList={searchByList}
                    open={open} setOpen={setOpen}
                    sortField={sortField} setSortField={setSortField}
                    descending={descending} setDescending={setDescending}
                    search={search} setSearch={setSearch}
                    category={category} setCategory={setCategory}
                />
            </div>
            <Dialog
                open={open}
                onClose={handleDialogClose}
                fullWidth={fullWidth}
                maxWidth='xs'
            >
                <DialogTitle>
                    {isUpdate ? 'Update existing User' : 'Add a new User'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Autocomplete
                        value={type}
                        onChange={(event, newValue) => {
                            setType(newValue);
                        }}
                        disablePortal
                        options={userTypes}
                        renderInput={({inputProps, ...rest}) => 
                            <TextField {...rest} 
                                autoFocus
                                required
                                fullWidth
                                name='type'
                                label='User Type'
                                variant='standard'
                                color='secondary'
                                inputProps={{ ...inputProps, readOnly: true }}
                            />
                        }
                    />
                    {userTypeError && <span style={{color: '#d32f2f', fontSize: '12px'}}>Select a user Type</span>}

                    <TextField
                        autoFocus
                        required
                        fullWidth
                        type='text'
                        name='firstName'
                        value={firstName}
                        label='First Name'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={firstNameError}
                        helperText={firstNameError ? 'Can not be Empty' : null}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='lastName'
                        value={lastName}
                        label='Last Name'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={lastNameError}
                        helperText={lastNameError ? "Can not be Empty" : null}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='contactNo'
                        value={contactNo}
                        label='Contact No'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={contactError}
                        helperText={contactError ? "Can not be Empty" : null}
                        onChange={(e) => setContact(e.target.value)}
                    />

                    <TextField
                        required
                        fullWidth
                        type='email'
                        name='email'
                        value={email}
                        label='Email'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={emailError}
                        helperText={emailError ? emailErrorMsg : null}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {!isUpdate &&
                        <>
                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='username'
                                value={username}
                                label='Username'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={usernameError}
                                helperText={usernameError ? "Can not be Empty" : null}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <TextField
                                required
                                fullWidth
                                type='text'
                                name='password'
                                value={password}
                                label='Password'
                                variant='standard'
                                color='secondary'
                                className={classes.field}
                                error={passwordError}
                                helperText={passwordError ? "Can not be Empty" : null}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    }

                    <Stack direction='row' spacing={2} sx={{ mt: 3 }} justifyContent='right'>
                        <Button
                            variant='outlined'
                            onClick={handleDialogClose}
                        >
                            Cancel
                        </Button>

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
                </DialogContent>
            </Dialog>
            {userGrid()}
        </div>
    )
}

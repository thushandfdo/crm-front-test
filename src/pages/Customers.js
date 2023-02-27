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
import { generate } from '@wcj/generate-password';
import { newCustomerMail } from './Newsletters';

function Customers() {
    const { classes } = useStyles();

    const [company, setCompany] = useState('');
    const [companyError, setCompanyError] = useState(false);
    var cError = false;

    const [contactPerson, setContactPerson] = useState('');
    const [contactPersonError, setContactPersonError] = useState(false);
    var cpError = false;

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
    const [customers, setCustomers] = useState([]);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('company');

    const [sortField, setSortField] = useState('company');
    const [descending, setDescending] = useState(1);

    const [open, setOpen] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [companyErrorMsg, setCompanyErrorMsg] = useState('');

    const fullWidth = true;

    const breakpoints = {
        default: 4,
        1100: 3,
        830: 2
    }

    const handleClear = () => {
        setCompany('');
        setContactPerson('');
        setContact('');
        setEmail('');
        setSearch('');
        setUpdateId('');
        setCategory('company');
        clearErrors();

        if (!isUpdate)
            setIsUpdate(false);

        setUsername('');
        setPassword('');
    };

    const clearErrors = () => {
        setCompanyError(false);
        setContactPersonError(false);
        setContactError(false);
        setEmailError(false);
        setusernameError(false);
        setPasswordError(false);

        cError = false;
        cpError = false;
        cNoError = false;
        eError = false;
        uError = false;
        pError = false;
    };

    const validateForm = () => {
        clearErrors();

        var companyDuplicated = false;
        var emailDuplicated = false;

        if (isUpdate) {
            companyDuplicated = customers.some(customer => customer.company === company && customer.userId !== updateId);
            emailDuplicated = customers.some(customer => customer.email === email && customer.userId !== updateId);
        }
        else {
            companyDuplicated = customers.some(customer => customer.company === company);
            emailDuplicated = customers.some(customer => customer.email === email);
        }

        setCompanyErrorMsg(companyDuplicated ? 'Company name is taken, try another' : 'Invalid email format');
        setEmailErrorMsg(emailDuplicated ? 'Email is already recorded' : 'Invalid email format');

        if (company === '' || companyDuplicated) {
            setCompanyError(true);
            cError = true;
        }

        if (contactPerson === '') {
            setContactPersonError(true)
            cpError = true;
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

        if (!(cError || cpError || cNoError || eError || (!isUpdate && (uError || pError))) && company)
            return true;
        else
            return false;
    }

    const saveCustomer = (e) => {
        e.preventDefault();

        if (validateForm()) {
            var [firstName, ...lastName] = contactPerson.split(' ');
            lastName = lastName.join(' ');

            var data = {
                type: "Customer",
                username, password, firstName, lastName, contactNo, email,
                profilePic: ' ', company
            };

            createAPIEndpoint(ENDPOINTS.userCustomer)
                .post(data)
                .then((res) => {
                    if (res.status === 200) {
                        handleClear();
                        setOpen(!open);
                        newCustomerMail(contactPerson, email, username, password);
                        loadData();
                        console.log('Customer saved...!');
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert('Insert Failed..!');
                });
        }
    };

    const deleteCustomer = async (id) => {
        await createAPIEndpoint(ENDPOINTS.userCustomer)
            .delete(id)
            .then(res => {
                if (res.status === 200) {
                    const newCustomers = customers.filter(customer => customer.id !== id);
                    setCustomers(newCustomers);
                    loadData();
                    return;
                }
                throw new Error("Customer can not be deleted..!");
            })
            .catch(err => {
                alert("Deletion Error..!");
                console.log(err);
            });
    };

    const setToUpdate = (id) => {
        const customer = customers.find(cus => cus.userId === id);

        setCompany(customer.company);
        setContactPerson(customer.firstName + ' ' + customer.lastName);
        setContact(customer.contactNo);
        setEmail(customer.email);
        setOpen(true);
        setIsUpdate(true);
        setUpdateId(id);
    };

    const updateCustomer = () => {
        if (validateForm()) {
            var cus = customers.find(customer => customer.userId === updateId);

            if (
                cus.company === company &&
                (cus.firstName + ' ' + cus.lastName) === contactPerson &&
                cus.contactNo === contactNo &&
                cus.email === email
            ) {
                alert("Not changed...!");
            }
            else {
                var [firstName, ...lastName] = contactPerson.split(' ');
                lastName = lastName.join(' ');

                var data = {
                    firstName, lastName, contactNo, email, company
                };

                createAPIEndpoint(ENDPOINTS.userCustomer)
                    .put(updateId, data)
                    .then(() => {
                        handleClear();
                        loadData();
                    })
                    .catch(err => {
                        console.log(err);
                        alert('Insert Failed..!');
                    });
            }

            setOpen(!open);
            setIsUpdate(!isUpdate);
        }
    }

    const loadData = () => {
        createAPIEndpoint(ENDPOINTS.userCustomer)
            .fetch()
            .then(res => {
                if (res.status === 200) {
                    setFetchError(false);
                    return res.data;
                }
                throw new Error("Can not fetch Customers...!")
            })
            .then(data => {
                setCustomers(data);
            })
            .catch(err => {
                setFetchError(true);
                console.log(err);
            });
    };

    const customerGrid = () => {
        return (
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {(!fetchError)
                    ? customers
                        .filter(customer =>
                            (category === 'contactPerson')
                                ? (customer.firstName + " " + customer.lastName).toLowerCase().includes(search.toLowerCase())
                                : customer[category].toLowerCase().includes(search.toLowerCase())
                        )
                        .sort((c1, c2) => {
                            var name1 = c1.firstName + " " + c1.lastName;
                            var name2 = c2.firstName + " " + c2.lastName;

                            return (
                                (sortField === 'contactPerson')
                                    ? (name1 < name2)
                                        ? -descending
                                        : (name1 > name2) ? descending : 0
                                    : (c1[sortField] < c2[sortField])
                                        ? -descending
                                        : (c1[sortField] > c2[sortField]) ? descending : 0
                            );
                        })
                        .map(customer => (
                            <Card elevation={1} key={customer.userId} className={classes.customerCard}>
                                <CardHeader
                                    action={
                                        <Stack direction='row' spacing={1}>
                                            <IconButton onClick={() => setToUpdate(customer.userId)}>
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton onClick={() => deleteCustomer(customer.userId)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Stack>
                                    }
                                    title={customer.company}
                                    subheader={customer.firstName + " " + customer.lastName}
                                    className={classes.customerCardHeader}
                                />
                                <div>
                                </div>
                                <Divider />
                                <div className={classes.customerContent}>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {customer.contactNo}
                                    </Typography>
                                    <Typography color='textSecondary' sx={{ textAlign: 'left' }}>
                                        {customer.email}
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
            value: 'company',
            text: 'Company'
        },
        {
            value: 'contactPerson',
            text: 'Contact Person'
        }
    ]

    const searchByList = [
        {
            value: 'company',
            text: 'by Company'
        },
        {
            value: 'contactPerson',
            text: 'by Contact Person'
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
            setUsername(company.replace(/\s/g, '_'));
        }
    }, [open, isUpdate, company, password]);

    return (
        <div className='customers'>
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
                    {isUpdate ? 'Update existing Customer' : 'Add a new Customer'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        type='text'
                        name='company'
                        value={company}
                        label='Company'
                        variant='standard'
                        color='secondary'
                        error={companyError}
                        helperText={companyError ? companyErrorMsg : null}
                        onChange={(e) => setCompany(e.target.value)}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='contact-person'
                        value={contactPerson}
                        label='Contact Person'
                        variant='standard'
                        color='secondary'
                        className={classes.field}
                        error={contactPersonError}
                        helperText={contactPersonError ? "Can not be Empty" : null}
                        onChange={(e) => setContactPerson(e.target.value)}
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
                            onClick={(isUpdate) ? updateCustomer : saveCustomer}
                        >
                            {(isUpdate) ? 'Update' : 'Save'}
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
            {customerGrid()}
        </div>
    )
}

export default Customers;


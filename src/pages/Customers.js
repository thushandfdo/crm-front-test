import React, { useState, useEffect, useRef } from 'react';
import { useStyles } from '../Styles';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/StyledComponents';
import { AddCircleOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Masonry from 'react-masonry-css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Customers() {
    const inputType = 'standard';
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

    const [fetchError, setFetchError] = useState(false);
    const [customers, setCustomers] = useState([]);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('company');

    const [sortField, setSortField] = useState('company');
    const [descending, setDescending] = useState(1);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const [drop, setDrop] = useState(false);
    const [open, setOpen] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const searchBoxRef = useRef(null);
    const fullWidth = true;

    const breakpoints = {
        default: 4,
        1100: 3,
        830: 2
    }

    const handleSort = (event, newSort) => {
        if (newSort !== null) {
            setSortField(newSort);
        }
    };

    const handleClear = () => {
        setCompany('');
        setContactPerson('');
        setContact('');
        setEmail('');
        setSearch('');
        setUpdateId('');
        setCategory('company');
        clearErrors();
        setIsUpdate(false);
    };

    const clearErrors = () => {
        setCompanyError(false);
        setContactPersonError(false);
        setContactError(false);
        setEmailError(false);

        cError = false;
        cpError = false;
        cNoError = false;
        eError = false;
    };

    const validateForm = () => {
        clearErrors();

        if (company === ''){
            setCompanyError(true);
            cError = true;
        }

        if (contactPerson === ''){
            setContactPersonError(true)
            cpError = true;
        }

        if (contactNo === ''){
            setContactError(true);
            cNoError = true;
        }

        var mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (email === "" || !mailFormat.test(email)) {
            setEmailError(true);
            eError = true;
        }

        if (!(cError || cpError || cNoError || eError) && company)
            return true;
        else
            return false;
    }

    const saveCustomer = (e) => {
        e.preventDefault();

        if (validateForm()) {
            var data = { company, contactPerson, contactNo, email };

            createAPIEndpoint(ENDPOINTS.customer)
                .post(data)
                .then(() => {
                    handleClear();
                })
                .catch(err => {
                    console.log(err);
                    alert('Insert Failed..!');
                });

            setOpen(!open);
        }
    };

    const deleteCustomer = async (id) => {
        await createAPIEndpoint(ENDPOINTS.customer)
            .delete(id)
            .then(res => {
                if (res.status === 200) {
                    const newCustomers = customers.filter(customer => customer.id !== id);
                    setCustomers(newCustomers);
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
        const customer = customers.find(cus => cus.id === id);

        setCompany(customer.company);
        setContactPerson(customer.contactPerson);
        setContact(customer.contactNo);
        setEmail(customer.email);
        setOpen(true);
        setIsUpdate(true);
        setUpdateId(id);
    };

    const updateCustomer = () => {
        if (validateForm()) {
            var data = { company, contactPerson, contactNo, email };

            createAPIEndpoint(ENDPOINTS.customer)
                .put(updateId, data)
                .then(() => {
                    handleClear();
                })
                .catch(err => {
                    console.log(err);
                    alert('Insert Failed..!');
                });

            setOpen(!open);
            setIsUpdate(!isUpdate);
        } 
    }

    const loadData = () => {
        createAPIEndpoint(ENDPOINTS.customer)
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
                            customer[category].toLowerCase().includes(search.toLowerCase())
                        )
                        .sort((c1, c2) => 
                            (c1[sortField] < c2[sortField]) 
                            ? -descending 
                            : (c1[sortField] > c2[sortField]) ? descending : 0
                        )
                        .map(customer => (
                            <Card elevation={1} key={customer.id} className={classes.customerCard}>
                                <CardHeader
                                    action={
                                        <Stack direction='row' spacing={1}>
                                            <IconButton onClick={() => setToUpdate(customer.id)}>
                                                <EditOutlined />
                                            </IconButton>
                                            <IconButton onClick={() => deleteCustomer(customer.id)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Stack>
                                    }
                                    title={customer.company}
                                    subheader={customer.contactPerson}
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

    const showSearchMenu = () => {
        setAnchorElUser(searchBoxRef.current);
        setDrop(!drop);
    };

    const hideSearchMenu = () => {
        setAnchorElUser(null);
        setDrop(!drop);
    };

    const handleDialogClose = () => {
        setOpen(!open);
        setIsUpdate(false);
        handleClear();
    };

    useEffect(() => {
        loadData();
    }, [customers]);

    return (
        <div className='customers'>
            <div className={classes.searchBarContainer}>
                <div className={classes.searchBar}>
                    <Stack
                        direction='row'
                        spacing={1}
                        alignItems='center'
                        className={classes.searchStack}
                    >
                        <Typography>Sort By:</Typography>

                        <ToggleButtonGroup
                            value={sortField}
                            exclusive
                            onChange={handleSort}
                        >
                            <ToggleButton value="company">
                                Company
                            </ToggleButton>
                            <ToggleButton value="contactPerson">
                                Contact Person
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup
                            exclusive
                            value={(descending === -1) ? 'descending' : null}
                            onChange={() => setDescending(descending*-1)}
                        >
                            <ToggleButton value="descending">
                                descending
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    <Stack
                        direction='row'
                        justifySelf='flex-end'
                        alignItems='center'
                        className={classes.searchStack}
                        spacing={1}
                    >
                        <Search
                            ref={searchBoxRef}
                        >
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
                        <IconButton
                            onClick={showSearchMenu}
                            className={classes.dropIcon}
                        >
                            {!drop ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                        </IconButton>
                        <Menu
                            sx={{ mt: '8px' }}
                            anchorEl={anchorElUser}
                            keepMounted
                            open={Boolean(anchorElUser)}
                            onClose={hideSearchMenu}
                            className={classes.hiddenMenu}
                        >
                            <FormControl sx={{ m: '10px' }}>
                                <RadioGroup
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        hideSearchMenu();
                                    }}
                                >
                                    <FormControlLabel value='company' control={<Radio />} label='by Company' />
                                    <FormControlLabel value='contactPerson' control={<Radio />} label='by Contact Person' />
                                    <FormControlLabel value='contactNo' control={<Radio />} label='by Contact No' />
                                    <FormControlLabel value='email' control={<Radio />} label='by Email' />
                                </RadioGroup>
                            </FormControl>
                        </Menu>
                        <IconButton
                            onClick={() => setOpen(!open)}
                        >
                            <AddCircleOutlined />
                        </IconButton>
                        <Dialog 
                            open={open} 
                            onClose={handleDialogClose} 
                            fullWidth={fullWidth} 
                            maxWidth='xs'
                        >
                            <DialogTitle>
                                Add a New Customer
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                <form noValidate autoComplete='off'>
                                    <TextField
                                        autoFocus
                                        required
                                        fullWidth
                                        type='text'
                                        name='company'
                                        value={company}
                                        label='Company'
                                        variant={inputType}
                                        color='secondary'
                                        error={companyError}
                                        helperText={companyError ? "Can not be Empty" : null}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        type='text'
                                        name='contact-person'
                                        value={contactPerson}
                                        label='Contact Person'
                                        variant={inputType}
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
                                        variant={inputType}
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
                                        variant={inputType}
                                        color='secondary'
                                        className={classes.field}
                                        error={emailError}
                                        helperText={emailError ? "Incorrect email format" : null}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

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
                                </form>
                            </DialogContent>
                        </Dialog>
                    </Stack>
                </div>
            </div>
            {customerGrid()}
        </div>
    )
}

export default Customers;


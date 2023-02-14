import React, { useState, useEffect, useRef } from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
import { useStyles } from '../Styles';
import { EmptyRightPanel } from '../components/StyledComponents';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/StyledComponents';
import { Grid, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AddCircleOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
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
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';

function Customers() {
    const { classes } = useStyles();
    const navigate = useNavigate();

    const [company, setCompany] = useState('');
    const [companyError, setCompanyError] = useState(false);

    const [contactPerson, setContactPerson] = useState('');
    const [contactPersonError, setContactPersonError] = useState(false);

    const [contactNo, setContact] = useState('');
    const [contactError, setContactError] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [search, setSearch] = useState('');
    const [searchError, setSearchError] = useState(false);

    const [fetchError, setFetchError] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(true);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [category, setCategory] = useState('company');
    const [sortField, setSortField] = useState('company');
    const [descending, setDescending] = useState(false);

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [drop, setDrop] = useState(false);
    const usernameRef = useRef(null);

    const handleSort = (event, newSort) => {
        if (newSort !== null) {
            setSortField(newSort);
        }
    };

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    const handleClear = () => {
        setCompany('');
        setContactPerson('');
        setContact('');
        setEmail('');
        setSearch('');
        setCategory('company');
        clearErrors();
    };

    const clearErrors = () => {
        setCompanyError(false);
        setContactPersonError(false);
        setContactError(false);
        setEmailError(false);
        setSearchError(false);
    };

    const validateEmail = () => {
        var mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (email === "" || !mailFormat.test(email)) {
            setEmailError(true);
        }
    }

    const saveCustomer = (e) => {
        e.preventDefault();

        clearErrors();

        if (company === '')
            setCompanyError(true);
        if (contactPerson === '')
            setContactPersonError(true)
        if (contactNo === '')
            setContactError(true);

        validateEmail();

        if (!(companyError || contactPersonError || contactError || emailError) && company) {
            var data = { company, contactPerson, contactNo, email };

            createAPIEndpoint(ENDPOINTS.customer)
                .post(data)
                .then(() => {
                    alert("Insertion Success...!");
                    handleClear();
                })
                .catch(err => {
                    console.log(err);
                    alert('Insertion Failed..!');
                });
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

    const insertForm = () => {
        return (
            <div size='sm' className={classes.addCustomerForm}>
                <form noValidate autoComplete='off' onSubmit={saveCustomer}>
                    <Typography
                        gutterBottom
                        variant='h6'
                        component='h2'
                        color='textPrimary'
                    >
                        Add a new Customer
                    </Typography>

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='company'
                        value={company}
                        label='Company'
                        variant={inputType}
                        color='secondary'
                        className={classes.field}
                        error={companyError}
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
                        onChange={(e) => setContact(e.target.value)}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='email'
                        value={email}
                        label='Email'
                        variant={inputType}
                        color='secondary'
                        className={classes.field}
                        error={emailError}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Stack direction="row" spacing={5}>
                        <Button
                            type='reset'
                            variant='outlined'
                            endIcon={<BackspaceOutlinedIcon />}
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            endIcon={<SendOutlinedIcon />}
                        >
                            Submit
                        </Button>
                    </Stack>
                </form>
            </div>
        )
    };

    const searchForm = () => {
        return (
            <div className={classes.addCustomerForm}>
                <form noValidate autoComplete='off' >
                    <Stack container direction='row' alignItems='center'>
                        <TextField
                            required
                            fullWidth
                            type='text'
                            name='search'
                            value={search}
                            label='Search Customer'
                            variant='standard'
                            color='primary'
                            error={searchError}
                            onChange={(e) => setSearch(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div>
                            <IconButton>
                                <SearchRoundedIcon />
                            </IconButton>
                        </div>
                    </Stack>

                    <FormControl sx={{ my: '10px' }}>
                        <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                            <FormControlLabel value='company' control={<Radio />} label='by Company' />
                            <FormControlLabel value='contactPerson' control={<Radio />} label='by Contact Person' />
                            <FormControlLabel value='contactNo' control={<Radio />} label='by Contact No' />
                            <FormControlLabel value='email' control={<Radio />} label='by Email' />
                        </RadioGroup>
                    </FormControl>

                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={6} justifySelf='flex-start'>
                            <Button
                                type='reset'
                                variant='outlined'
                                onClick={handleClear}
                            >
                                Clear
                            </Button>
                        </Grid>
                        <Grid item xs={6} justifySelf='flex-end'>
                            <Button
                                type='submit'
                                variant='contained'
                                endIcon={<SearchRoundedIcon />}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: '10px' }} />

                    <Typography sx={{ py: '2px' }}>
                        Company:
                    </Typography>
                    <Typography sx={{ py: '2px' }}>
                        Contact Person:
                    </Typography>
                    <Typography sx={{ py: '2px' }}>
                        Contact No:
                    </Typography>
                    <Typography sx={{ py: '2px' }}>
                        Email:
                    </Typography>

                    <Stack direction='row' justifyContent='flex-end'>
                        <IconButton>
                            <DeleteOutlined />
                        </IconButton>
                        <IconButton>
                            <EditOutlined />
                        </IconButton>
                    </Stack>
                </form>
            </div>
        )
    };

    const customerGrid = () => {
        return (
            <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {(!fetchError)
                    ? customers.filter(customer => customer[category].toLowerCase().includes(search.toLowerCase())).map(customer => (
                        <Card elevation={1} key={customer.id} className={classes.customerCard}>
                            <CardHeader
                                action={
                                    <IconButton onClick={() => deleteCustomer(customer.id)}>
                                        <DeleteOutlined />
                                    </IconButton>
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

    const handleOpenUserMenu = () => {
        setAnchorElUser(usernameRef.current);
        setDrop(!drop);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        setDrop(!drop);
    };

    const userMenuItems = [
        'by Company',
        'by Contact Person',
        'by Email',
        'by Contact No',
    ]

    const inputType = 'outlined';

    useEffect(() => {
        loadData();
    }, [search]);

    return (
        <div className='customers'>
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
                        value={descending ? 'descending' : null}
                        onChange={() => setDescending(!descending)}
                    >
                        <ToggleButton value="descending">
                            descending
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Stack
                    direction='row'
                    justifySelf='flex-end'
                    className={classes.searchStack}
                >
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
                    <IconButton
                        onClick={handleOpenUserMenu}
                        className={classes.dropIcon}
                        ref={usernameRef}
                    >
                        {!drop ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />}
                    </IconButton>
                    <Menu
                        sx={{
                            // mt: '45px',
                            // '& .MuiMenu-paper': {
                            //     width: `${userWidth}px`
                            // }
                        }}
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        className={classes.hiddenMenu}
                    >
                        {/* <MenuItem sx={{ bottom: '-5px' }}>
                            <Typography className={classes.userType}>Administrator</Typography>
                        </MenuItem> */}
                        {/* <Divider /> */}
                        {userMenuItems.map(item => (
                            <MenuItem key={item} onClick={() => navigate(item.path)}>
                                {/* <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon> */}
                                <FormControl sx={{ my: '10px' }}>
                                    <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                                        <FormControlLabel value='company' control={<Radio />} label='by Company' />
                                        <FormControlLabel value='contactPerson' control={<Radio />} label='by Contact Person' />
                                        <FormControlLabel value='contactNo' control={<Radio />} label='by Contact No' />
                                        <FormControlLabel value='email' control={<Radio />} label='by Email' />
                                    </RadioGroup>
                                </FormControl>
                                {/* <ListItemText>{item.text}</ListItemText> */}
                            </MenuItem>
                        ))}
                    </Menu>
                    <IconButton>
                        <AddCircleOutlined />
                    </IconButton>
                </Stack>
            </div>
            <Grid container spacing={4}>
                <Grid item xs={open ? 9 : 12}>
                    { customerGrid() }
                </Grid>
                <Grid item xs={open ? 3 : 0}>
                    <div className={classes.rightPanel}>
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    onClick={() => setToggleSearch(true)}
                                    className={classes.toggleButtons}
                                >
                                    Search
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    onClick={() => setToggleSearch(false)}
                                    className={classes.toggleButtons}
                                >
                                    New
                                </Button>
                            </Grid>
                        </Grid>
                        <EmptyRightPanel open={open}>
                            {toggleSearch ? searchForm() : insertForm()}
                        </EmptyRightPanel>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Customers;


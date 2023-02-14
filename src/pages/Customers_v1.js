import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { Grid, Stack } from '@mui/material';
import { useStyles } from '../Styles';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { EmptyRightPanel } from '../components/StyledComponents';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function Customers_v1() {
    const { classes } = useStyles();

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

    const validateEmail = () => {
        var mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (email === "" || !mailFormat.test(email)) {
            setEmailError(true);
        }
    }

    const handleSubmit = (e) => {
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

    const handleDelete = async (id) => {
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
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
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
                <form noValidate autoComplete='off' onSubmit={handleSubmit} >
                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='search'
                        value={search}
                        label='Search Customer'
                        variant={inputType}
                        color='primary'
                        error={searchError}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <FormControl sx={{my: '10px'}}>
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

                    <Divider sx={{my: '10px'}} />

                    <Typography sx={{py: '2px'}}>
                        Company: 
                    </Typography>
                    <Typography sx={{py: '2px'}}>
                        Contact Person: 
                    </Typography>
                    <Typography sx={{py: '2px'}}>
                        Contact No: 
                    </Typography>
                    <Typography sx={{py: '2px'}}>
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

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    const customerGrid = () => {
        return (
            <Masonry
            breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {(!fetchError)
                ? customers.map(customer => (
                    <Card elevation={1} className={classes.customerCard}>
                        <CardHeader
                            action={
                                <IconButton onClick={() => handleDelete(customer.id)}>
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
    
    const inputType = 'outlined';
    
    useEffect(() => {
        loadData();
    }, [customers]);

    return (
        <div className='customers'>
            <Grid container spacing={4}>
                <Grid item xs={open? 9 : 12}>
                    {customerGrid()}
                </Grid>
                <Grid item xs={open? 3 : 0}>
                    <div className={classes.rightPanel}>
                        {/* <IconButton
                            color='primary'
                            onClick={() => setOpen(!open)}
                            className={classes.floatIcon}
                        >
                            <SearchRoundedIcon />
                        </IconButton> */}
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

export default Customers_v1;


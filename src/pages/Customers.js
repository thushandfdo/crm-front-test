import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { Grid, Stack } from '@mui/material';
import { useStyles } from '../Styles';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import { Divider } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

function Customers() {
    const { classes } = useStyles();

    const [company, setCompany] = useState('');
    const [companyError, setCompanyError] = useState(false);

    const [contactPerson, setContactPerson] = useState('');
    const [contactPersonError, setContactPersonError] = useState(false);

    const [contactNo, setContact] = useState('');
    const [contactError, setContactError] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [fetchError, setFetchError] = useState(false);
    const [customers, setCustomers] = useState([]);

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
        clearErrors();
    };

    const clearErrors = () => {
        setCompanyError(false);
        setContactPersonError(false);
        setContactError(false);
        setEmailError(false);
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

    useEffect(() => {
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
    }, []);

    const inputType = 'outlined';

    return (
        <div className='customers'>
            <Container size='sm' className={classes.container}>
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

                    <Stack direction="row" spacing={4}>
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
            </Container>
            <div></div>
            <Grid container rowSpacing={2} className={classes.customerList}>
                {(!fetchError)
                    ? customers.map(customer => (
                        <Grid item xs={12} key={customer.id}>
                            <Card elevation={1} className={classes.customer}>
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
                        </Grid>
                    ))
                    : <Typography className={classes.error}>Loading...</Typography>}
            </Grid>
        </div>
    )
}

export default Customers;


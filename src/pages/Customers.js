import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { Stack } from '@mui/material';
import { useStyles } from '../Styles';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { useNavigate } from 'react-router-dom';

function Customers() {
    const navigate = useNavigate();
    const { classes } = useStyles();
    const [company, setCompany] = useState('');
    const [companyError, setCompanyError] = useState(false);
    const [contactPerson, setContactPerson] = useState('');
    const [contactPersonError, setContactPersonError] = useState(false);
    const [contact, setContact] = useState('');
    const [contactError, setContactError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const validateEmail = () => {
        var mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    
        if(email === "" || !mailFormat.test(email)){
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
        if (contact === '')
            setContactError(true);
        
        validateEmail();

        if (!(companyError || contactPersonError || contactError || emailError) && company) {
            var data = { company, contactPerson, contact, email };

            alert("Done");

            createAPIEndpoint(ENDPOINTS.customer)
                .post(data)
                .then(() => navigate('/'))
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

    const inputType = 'outlined';

    return (
        <div className='customers'>
            <Container size='sm' className={classes.formContainer}>
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
                        name='contact'
                        value={contact}
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
        </div>
    )
}

export default Customers;
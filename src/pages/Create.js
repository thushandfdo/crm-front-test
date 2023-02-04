import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from '../Styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { Stack } from '@mui/material';
import { createAPIEndpoint, ENDPOINTS } from '../api';

export default function Create() {
    const { classes } = useStyles();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [category, setCategory] = useState('todos');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setTitleError(false);
        setDetailsError(false);

        if (title === '')
            setTitleError(true);
        if (details === '')
            setDetailsError(true)

        if (title && details) {
            var data = { title, details, category };

            createAPIEndpoint(ENDPOINTS.note)
                .post(data)
                .then(() => navigate('/'))
                .catch(err => {
                    console.log(err);
                    alert('Insertion Failed..!');
                });
        }
    }

    const handleClear = () => {
        setTitle('');
        setDetails('');
        setCategory('todos');
        setTitleError(false);
        setDetailsError(false);
    };

    return (
        <div className='create'>
            <Container size='sm' className={classes.formContainer}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Typography
                        gutterBottom
                        variant='h6'
                        component='h2'
                        color='textPrimary'
                    >
                        Create a new Note
                    </Typography>

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='title'
                        value={title}
                        label='Note Title'
                        variant='outlined'
                        color='secondary'
                        className={classes.field}
                        error={titleError}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextField
                        required
                        fullWidth
                        type='text'
                        name='details'
                        value={details}
                        label='Details'
                        variant='outlined'
                        color='secondary'
                        multiline
                        minRows={4}
                        className={classes.field}
                        error={detailsError}
                        onChange={(e) => setDetails(e.target.value)}
                    />

                    <FormControl className={classes.field}>
                        <FormLabel>Note Category</FormLabel>
                        <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                            <FormControlLabel value='money' control={<Radio />} label='Money' />
                            <FormControlLabel value='todos' control={<Radio />} label='Todos' />
                            <FormControlLabel value='reminders' control={<Radio />} label='Reminders' />
                            <FormControlLabel value='work' control={<Radio />} label='Work' />
                        </RadioGroup>
                    </FormControl>

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

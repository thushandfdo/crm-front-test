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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

export default function Create() {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [category, setCategory] = useState('todos');

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError(false);
        setDetailsError(false);

        if (title === '')
            setTitleError(true);
        if (details === '')
            setDetailsError(true)

        if (title && details) {
            fetch('https://localhost:7143/api/Note', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ title, details, category })
            }).then((response) => {
                if (response.ok) {
                    console.log(response.json());
                    return;
                }
                throw new Error('Something went wrong');
            }).then(() => navigate('/'))
                .catch(() => {
                    alert("Insertion failed...!");
                    console.log("Insertion Error...!");
                });
        }
    }

    return (
        <div className='create'>
            <Container size='sm'>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Typography
                        gutterBottom
                        variant='h6'
                        component='h2'
                        color='textSecondary'
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

                    <Button
                        type='submit'
                        variant='contained'
                        color='secondary'
                        endIcon={<KeyboardArrowRightIcon />}
                    >
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
    )
}

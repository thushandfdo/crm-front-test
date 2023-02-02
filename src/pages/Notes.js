import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';
import { useStyles } from '../Styles';
import { Typography } from '@mui/material';
import { createAPIEndpoint, ENDPOINTS } from '../api';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.note)
            .fetch()
            .then(res => {
                if(res.status === 200){
                    setError(false);
                    return res.data;
                }
                throw new Error("Can not fetch Notes...!")
            })
            .then(data => {
                setNotes(data);
            })
            .catch(err => {
                setError(true);
                console.log(err);
            });
    }, []);

    const handleDelete = async (id) => {
        await createAPIEndpoint(ENDPOINTS.note)
            .delete(id)
            .then(res => {
                if(res.status === 200){
                    const newNotes = notes.filter(note => note.id !== id);
                    setNotes(newNotes);
                    return;
                }
                throw new Error("Note can not be deleted..!");
            })
            .catch(err => {
                alert("Deletion Error..!");
                console.log(err);
            });
    };

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        <div className='notes'>
            <Container>
                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {(!error) 
                    ? notes.map(note => (
                        <div key={note.id}>
                            <NoteCard note={note} handleDelete={handleDelete} />
                        </div>
                    ))
                    : <Typography className={classes.error}>Loading...</Typography>}
                </Masonry>
            </Container>
        </div>
    )
}
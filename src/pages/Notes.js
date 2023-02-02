import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';
import { useStyles } from '../Styles';
import { Typography } from '@mui/material';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        fetch('https://localhost:7143/api/Note')
            .then(res => {
                if (res.ok){
                    setError(false);
                    return res.json();
                }
                throw new Error();
            })
            .then(data => {
                setNotes(data);
            })
            .catch(() => {
                setError(true);
                console.log("Can not fetch data...!");
            });
    }, []);

    const handleDelete = async (id) => {
        await fetch('https://localhost:7143/api/Note/' + id, {
            method: 'DELETE'
        }).then(res => {
            if (res.ok){
                console.log(res.json());
                return;
            }
            throw new Error();
        }).catch(() => {
            alert("Deletion Error...!");
            console.log("Deletion error...!");
        });

        const newNotes = notes.filter(note => note.id !== id);
        setNotes(newNotes);
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
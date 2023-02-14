import React from 'react';
import { useStyles } from '../Styles';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { NoteAvatar } from './StyledComponents';

function NoteCard({ note, handleDelete }) {
    const { classes } = useStyles();

    return (
        <div className='note-card'>
            <Card elevation={1} className={classes.noteCard}>
                <CardHeader
                    avatar={
                        <NoteAvatar category={note.category}>
                            {note.category[0].toUpperCase()}
                        </NoteAvatar>
                    }
                    action={
                        <IconButton onClick={() => handleDelete(note.id)}>
                            <DeleteOutlined />
                        </IconButton>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                <center>
                    <Divider sx={{ width: '90%' }} />
                    <CardContent sx={{ width: '90%' }}>
                        <Typography variant='body2' color='textSecondary' sx={{ textAlign: 'left' }}>
                            {note.details}
                        </Typography>
                    </CardContent>
                </center>
            </Card>
        </div>
    )
}

export default NoteCard;
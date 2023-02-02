import React from 'react';
import { useStyles } from '../Styles';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

function NoteCard({ note, handleDelete }) {
    const { classes } = useStyles();

    const getClass = (category) => {
        switch(category){
            case 'money':
                return classes.greenAvatar
            case 'todos':
                    return classes.pinkAvatar
            case 'reminders':
                return classes.blueAvatar
            case 'work':
                return classes.yellowAvatar
            default:
                return classes.yellowAvatar
        }
    }

    return (
        <div className='note-card'>
            <Card elevation={1}>
                <CardHeader
                    avatar={
                        <Avatar className={getClass(note.category)}>
                            {note.category[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => handleDelete(note.id)}>
                            <DeleteOutlined />
                        </IconButton>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                <CardContent>
                    <Typography variant='body2' color='textSecondary'>
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default NoteCard;
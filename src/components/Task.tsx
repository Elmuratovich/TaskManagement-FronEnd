import React from 'react';
import { TaskDTO } from '../api/dto/task.dto';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

interface Props {
    data: TaskDTO;
}

const Task = ({ data }: Props) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography
                    color="textSecondary"
                    gutterBottom
                >
                    {data.title}
                </Typography>
                <Typography variant="body2" component="p">
                   {data.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Container>
                    <Button size="small" variant="contained" color="primary" style={{marginLeft: 5}}>Edit</Button>
                    <Button size="small" variant="contained" color="secondary" style={{marginLeft: 5}}>Delete</Button>
                </Container>
                
            </CardActions>
        </Card>
    )
}

export default Task
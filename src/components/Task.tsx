import React from 'react';
import { TaskDTO } from '../api/dto/task.dto';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { TaskApi } from '../api/task.api';

interface Props {
    data: TaskDTO;
    onTaskDelete: (taskId: number) => void;
}

const Task = ({ data, onTaskDelete }: Props) => {
    const deleteTask = async () => {
        await TaskApi.deleteOne(data.id);
        onTaskDelete(data.id);
    }


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
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 5 }}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: 5 }}
                        onClick={deleteTask}
                    >
                        Delete
                    </Button>
                </Container>

            </CardActions>
        </Card>
    );
}

export default Task;
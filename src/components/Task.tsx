import React from 'react';
import { TaskDTO, TaskStatus } from '../api/dto/task.dto';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Container } from '@mui/material';
import { TaskApi } from '../api/task.api';

interface Props {
    data: TaskDTO;
    onTaskDelete: (taskId: number) => void;
    onTaskUpdate: (task: TaskDTO) => void;
}

const Task = ({ data, onTaskDelete, onTaskUpdate }: Props) => {
    const deleteTask = async () => {
        await TaskApi.deleteOne(data.id);
        onTaskDelete(data.id);
    }

    const getTaskStatusToString = (status: TaskStatus) => {
        let text: string = '';

        switch (status) {
            case TaskStatus.Created:
                text = "Created";
                break;
            case TaskStatus.InProgress:
                text = "In Progress";
                break;
            case TaskStatus.Done:
                text = "Done";
                break;
            default:
                text = "";
        }
        return text;
    }

    const getTaskStatusColor = (status: TaskStatus) => {
        let color: string = "";

        switch (status) {
            case TaskStatus.Created:
                color = "gray";
                break;
            case TaskStatus.InProgress:
                color = "orange";
                break;
            case TaskStatus.Done:
                color = "green";
                break;
            default:
                color = "";
        }
        return color;
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
                <Chip label={getTaskStatusToString(data.status)} 
                style={{
                    backgroundColor: getTaskStatusColor(data.status), color: "white",
                }} />
            </CardContent>
            <CardActions>
                <Container>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 5 }}
                        onClick={() => onTaskUpdate(data)}
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
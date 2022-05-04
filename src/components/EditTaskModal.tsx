import { Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { TaskApi } from "../api/task.api";
import { TaskDTO, TaskStatus } from "../api/dto/task.dto";

interface Props {
    open: boolean,
    handleClose: () => void;
    onTaskUpdate: (task: TaskDTO) => void;
    data: TaskDTO | undefined;
}

function getModalStyle() {
    const top = 25;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        textField: {
            width: "100%",
        },
        createBtn: {
            width: "100%",
            marginTop: 10
        },
    }),
);

const EditTaskModal = (props: Props) => {
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState<undefined | string>(undefined)
    const [status, setStatus] = useState(TaskStatus.Created)

    useEffect(() => {
        if (props.data) {
            setTitle(props.data.title);
            setDescription(props.data.description);
            setStatus(props.data.status);
        }
    }, [props.data]);

    const updateTask = async () => {
        if (props.data) {
            const resp = await TaskApi.updateOne(props.data.id, {
                title,
                description,
                status
            });


            props.onTaskUpdate(resp);

            console.log("New Task: ", resp);
        }
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Update Task</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
            <TextField
                placeholder="Title"
                variant="filled"
                className={classes.textField}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <TextField
                placeholder="Description"
                variant="filled"
                className={classes.textField}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <Select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className={classes.textField}
            >
                <MenuItem value={TaskStatus.Created}>Created</MenuItem>
                <MenuItem value={TaskStatus.InProgress}>In Progress</MenuItem>
                <MenuItem value={TaskStatus.Done}>Done</MenuItem>
            </Select>

            <Button
                color="primary"
                variant="contained"
                className={classes.createBtn}
                onClick={updateTask}
            >
                Update Task
            </Button>
        </div>
    );

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}

export default EditTaskModal;
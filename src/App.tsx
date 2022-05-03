import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TaskApi } from './api/task.api';
import { TaskDTO } from './api/dto/task.dto';
import { Grid } from '@mui/material';
import Task from './components/Task';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  useEffect(() => {
    async function fetchAll() {
      const resp = await TaskApi.getAll();
      setTasks(resp);
    }
    fetchAll();
  }, [])
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Button variant="contained" color="primary">Create Task</Button>
        </Toolbar>
      </AppBar>
      
      <Grid container spacing={1} style={{ padding: 10 }}>
        {tasks.map((task) => {
          return (
            <Grid item xs={3}>
              <Task data={task} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;

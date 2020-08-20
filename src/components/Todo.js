import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemAvatar,
  Modal,
  Input,
} from '@material-ui/core';
import './Todo.css';
import { db } from '../firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

function Todo(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [input, setInput] = useState();

  const updateTodo = () => {
    db.collection('todos').doc(props.todo.id).set(
      {
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <Input
            value={input}
            placeholder={props.todo.todo}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemText
            primary={props.todo.todo}
            secondary="Demo Deadline ⏰"
          />
        </ListItem>
        <Button
          onClick={(e) => {
            setOpen(true);
            setInput(props.todo.todo);
          }}
        >
          EDIT ME
        </Button>
        <DeleteForeverIcon
          onClick={(e) => db.collection('todos').doc(props.todo.id).delete()}
        />
      </List>
    </>
  );
}

export default Todo;

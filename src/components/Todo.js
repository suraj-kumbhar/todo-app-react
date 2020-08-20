import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Input,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import './Todo.css';
import { db } from '../firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
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
  const [input, setInput] = useState('');

  const updateTodo = (e) => {
    e.preventDefault();
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
        <form className={classes.paper}>
          <div className="todo__form">
            <FormControl>
              <InputLabel>✅ Edit the todo</InputLabel>
              <Input value={input} onChange={(e) => setInput(e.target.value)} />
            </FormControl>

            <Button
              onClick={updateTodo}
              disabled={!input}
              type="submit"
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </div>
        </form>
      </Modal>
      <List className="todo__list">
        <ListItem className="todo__listContent">
          <ListItemText primary={`⏰ ${props.todo.todo}`} secondary={``} />
        </ListItem>
        <EditIcon
          className="todo__edit"
          onClick={(e) => {
            setOpen(true);
            setInput(props.todo.todo);
          }}
        />
        <DeleteForeverIcon
          className="todo__delete"
          onClick={(e) => db.collection('todos').doc(props.todo.id).delete()}
        />
      </List>
    </>
  );
}

export default Todo;

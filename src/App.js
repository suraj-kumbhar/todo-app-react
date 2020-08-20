import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, InputLabel, Input, FormControl } from '@material-ui/core';
import Todo from './components/Todo';
import { db } from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState(['']);
  const [input, setInput] = useState('');

  useEffect(() => {
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div className="App">
      <h1>🚀 Todo App 🚀</h1>
      <form className="app__form">
        <FormControl>
          <InputLabel>✅ Write a todo</InputLabel>
          <Input
            className="app__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </form>
      <ul className="app__list">
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;

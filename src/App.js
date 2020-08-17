import React, { useState } from 'react';
import './App.css';
import { Button, InputLabel, Input, FormControl } from '@material-ui/core';
import Todo from './components/Todo';

function App() {
  const [todos, setTodos] = useState([
    'Take dogs for a walk',
    'Take the rubbish out',
  ]);
  const [input, setInput] = useState('');

  console.log(input);

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, input]);
    setInput('');
  };

  return (
    <div className="App">
      <h1>Todo App 🚀</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write a todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button
            disabled={!input}
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
          >
            Add Todo
          </Button>
        </FormControl>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;

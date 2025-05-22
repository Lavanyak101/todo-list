// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-blue-600 my-4">Todo List</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


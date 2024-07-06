import React, { useState } from 'react';
import './App.css';

const App = () => {
  const TODO = 'TODO';
  const INPROGRESS = 'INPROGRESS';
  const COMPLETED = 'COMPLETED';

  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (updateItem) {
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status,
        };
        const copyTask = [...tasks];
        const filterList = copyTask.filter((item) => item.id !== updateItem.id);
        setTasks((prevTasks) => [...filterList, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now(),
        };
        setTasks((prevTasks) => [...prevTasks, obj]);
      }
      setValue('');
    }
  };

  const handleDrag = (e, task) => {
    setDragTask(task);
  };

  const handleDragNDrop = (status) => {
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTasks(copyTask);
    setDragTask(null);
  };

  const handleDrop = (e) => {
    const status = e.target.getAttribute('data-status');
    handleDragNDrop(status);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const deleteTask = (item) => {
    let copyTask = [...tasks];
    copyTask = copyTask.filter((task) => task.id !== item.id);
    setTasks(copyTask);
  };

  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
  };

  return (
    <div className='App'>
      <h1>Project Management Tool</h1>
      <input 
        type='text'
        onChange={handleChange}
        placeholder='Enter Task'
        value={value}
        onKeyDown={handleKeyDown}
      />
      <h3>Note:- Drap and Drop To Change Status</h3>
      <div className='board'>
        <div className='todo'
          data-status={TODO}
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          <h2 className='todo-col'>Todo ✍️</h2>
          {
            tasks.map((task) => (
              task.status === TODO && (
                <div 
                  onDrag={(e) => handleDrag(e, task)}
                  className='task-item'
                  key={task.id}
                  draggable
                >
                  {task.title}
                  <div className='btns'>
                    <span className='btn' onClick={() => updateTask(task)}>✏️</span>
                    <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
                  </div>
                </div>
              )
            ))
          }
        </div>
        <div className='inprogress'
          data-status={INPROGRESS}
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          <h2 className='inprogress-col'>In Progress ⏳</h2>
          {
            tasks.map((task) => (
              task.status === INPROGRESS && (
                <div 
                  className='task-item' 
                  key={task.id} 
                  draggable
                  onDrag={(e) => handleDrag(e, task)}
                >
                  {task.title}
                  <div className='btns'>
                    <span className='btn' onClick={() => updateTask(task)}>✏️</span>
                    <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
                  </div>
                </div>
              )
            ))
          }
        </div>
        <div className='completed'
          data-status={COMPLETED}
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          <h2 className='completed-col'>Completed ✅</h2>
          {
            tasks.map((task) => (
              task.status === COMPLETED && (
                <div 
                  className='task-item' 
                  key={task.id} 
                  draggable
                  onDrag={(e) => handleDrag(e, task)}
                >
                  {task.title}
                  <div className='btns'>
                    <span className='btn' onClick={() => updateTask(task)}>✏️</span>
                    <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
                  </div>
                </div>
              )
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default App;

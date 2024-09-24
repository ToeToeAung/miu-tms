import React, { useEffect, useState } from 'react';
interface Task {
  id: string;
  content: string;
  completed: boolean;
  position: number;
  priority: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskContent, setNewTaskContent] = useState<string>('');
  const [newTaskPriority, setNewTaskPriority] = useState<string>('low');
  
  useEffect(() => {
    fetch('http://localhost:3002/tasks')
      .then(response => response.json())
      .then(data => setTasks(data.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  
    const newTask = {
      content: newTaskContent,
      completed: false,
      position: tasks.length + 1,
      priority: newTaskPriority,
    };  
    
    fetch('http://localhost:3002/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, data]);
        setNewTaskContent(''); 
        setNewTaskPriority('low'); 
      })
      .catch(error => console.error('Error creating task:', error));
  };

    // Handle task deletion
    const handleDelete = (id: string) => {
      fetch(`http://localhost:3002/tasks/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {            
            setTasks(tasks.filter((task) => task.id !== id));
          } else {
            console.error('Error deleting task');
          }
        })
        .catch((error) => console.error('Error deleting task:', error));
    };


  return (
    <div className="container mt-5">
      <h1 className="text-left mb-4">Task List</h1>
      {/* Task creation form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="New task content"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <select
            className="form-control mb-3"
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Add Task</button>
      </form>

      {/* Task list */}
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.content}</strong> - <span className="text-primary">{task.priority}</span>
            </div>
            <div>
              {task.completed ? (
                <span className="badge badge-success">Completed</span>
              ) : (
                <span className="badge badge-warning">Pending</span>
              )}            
               <button
                className="btn btn-danger btn-sm ml-3"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

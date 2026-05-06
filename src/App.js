import React, { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // 👇 TASK STATES
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);

  const [status, setStatus] = useState("TODO");
  const [priority, setPriority] = useState("HIGH");

  // 👇 FETCH TASKS ONLY AFTER LOGIN
  useEffect(() => {
    if (loggedIn) {
      fetch("http://localhost:8080/tasks/user/1")
        .then(res => res.json())
        .then(data => setTasks(data));
    }
  }, [loggedIn]);

  const createTask = () => {
    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description: desc,
        priority: priority,
        status: status,
        dueDate: "2026-05-01T10:00:00",
        createdByUserId: 1,
        assignedUserIds: [1]
      })
    })
      .then(res => res.json())
      .then(() => {
        alert("Task Created");
        window.location.reload();
      });
  };

  // 👇 SHOW LOGIN FIRST
  if (!loggedIn) {

    if(showRegister)
    {
      return <RegisterPage  onBackToLogin={() => setShowRegister(false)} />
    }

    return  (
      <div>
        <LoginPage 

        
           onLogin={() => setLoggedIn(true)} />
          <br/>

          <button 
          style={{
             width: "200px",
              backgroundColor: "green",
              padding: "10px",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft : "30px"

          }}
          
          onClick={() =>setShowRegister(true)}>
                    Go To Register
          </button>



      </div>
    
    )
  }

  // 👇 AFTER LOGIN → SHOW TASK UI
  return (
    <div className="container">
      <h1>🚀 Task Manager</h1>

      <div className="card">
        <h2>Create Task</h2>

        <input
          placeholder="Task name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />

        <select onChange={(e) => setStatus(e.target.value)}>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <select onChange={(e) => setPriority(e.target.value)}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <button onClick={createTask}>Create Task</button>
      </div>

      <div className="card">
        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="task-item">
                <div><b>Name:</b> {task.name}</div>
                <div><b>Status:</b> {task.status}</div>
                <div><b>Priority:</b> {task.priority}</div>
                <div><b>Due:</b> {task.dueDate}</div>
                <div><b>Created By:</b> {task.createdBy?.name}</div>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
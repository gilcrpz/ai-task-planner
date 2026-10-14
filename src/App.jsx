import { useState } from 'react'
import {
  Check,
  Clock3,
  Flower2,
  Heart,
  LayoutDashboard,
  ListTodo,
  Plus,
  Sparkles,
  Sprout,
} from 'lucide-react'
import './App.css'


const initialTasks = [
  { id: 1, title: "Finish my portfolio website", category: "Personal", priority: "High", time: "10:00 AM", done: false },
  { id: 2, title: "Review JavaScript fundamentals", category: "Study", priority: "Medium", time: "1:00 PM", done: false },
  { id: 3, title: "Organize project files", category: "Work", priority: "Low", time: "3:00 PM", done: true },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

  function addTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        category: "Personal",
        priority: "Medium",
        time: "No time set",
        done: false,
      },
    ]);

    setNewTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  const completed = tasks.filter((task) => task.done).length;
  const pending = tasks.length - completed;

  const visibleTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.done;
    if (filter === "Completed") return task.done;
    return true;
  });

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon"><Flower2 size={27} strokeWidth={1.8} aria-hidden="true" /></span>
          <span>Bloom<span className="brand-light">Plan</span></span>
        </div>

        <p className="nav-label">WORKSPACE</p>
        <button className="nav-item active"><LayoutDashboard size={17} aria-hidden="true" /> Dashboard</button>
        <button className="nav-item" onClick={() => setFilter("All")}>
          <ListTodo size={17} aria-hidden="true" /> All Tasks
        </button>
        <button className="nav-item" onClick={() => setFilter("Pending")}>
          <Clock3 size={17} aria-hidden="true" /> Pending Tasks
        </button>
        <button className="nav-item" onClick={() => setFilter("Completed")}>
          <Check size={17} aria-hidden="true" /> Completed
        </button>

        <div className="sidebar-bottom">
          <div className="mini-flower"><Flower2 size={28} strokeWidth={1.7} aria-hidden="true" /></div>
          <p>Small steps count.</p>
          <span>You've got this!</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span className="breadcrumb">Workspace / Dashboard</span>
          <span className="date-label">
            <Sparkles size={13} aria-hidden="true" /> YOUR SPACE, YOUR PACE
          </span>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR PERSONAL PRODUCTIVITY SPACE</p>
            <h1>Make today <span>bloom.</span></h1>
            <p className="subtitle">
              A little progress every day adds up to big results.
            </p>
          </div>
          <div className="welcome-flower"><Flower2 size={96} strokeWidth={1.25} aria-hidden="true" /></div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span className="stat-icon pink"><ListTodo size={18} aria-hidden="true" /></span>
            <p>Total tasks</p>
            <h2>{tasks.length}</h2>
            <span className="stat-note">Your to-do list</span>
          </div>

          <div className="stat-card">
            <span className="stat-icon peach"><Clock3 size={18} aria-hidden="true" /></span>
            <p>In progress</p>
            <h2>{pending}</h2>
            <span className="stat-note">One step at a time</span>
          </div>

          <div className="stat-card">
            <span className="stat-icon green"><Check size={18} aria-hidden="true" /></span>
            <p>Completed</p>
            <h2>{completed}</h2>
            <span className="stat-note">Look at you go!</span>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel tasks-panel">
            <div className="panel-heading">
              <div>
                <h2>Your tasks</h2>
                <p>Keep your day organized.</p>
              </div>
              <span className="flower-small"><Flower2 size={22} strokeWidth={1.7} aria-hidden="true" /></span>
            </div>

            <form className="task-form" onSubmit={addTask}>
              <input
                type="text"
                placeholder="What do you need to do?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button type="submit"><Plus size={16} aria-hidden="true" /> Add task</button>
            </form>

            <div className="filters">
              {["All", "Pending", "Completed"].map((item) => (
                <button
                  key={item}
                  className={filter === item ? "filter active-filter" : "filter"}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="task-list">
              {visibleTasks.map((task) => (
                <div className="task-row" key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Complete ${task.title}`}
                  />

                  <div className="task-info">
                    <p className={task.done ? "task-title done" : "task-title"}>
                      {task.title}
                    </p>
                    <span>{task.category} · {task.time}</span>
                  </div>

                  <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              ))}

              {visibleTasks.length === 0 && (
                <p className="empty">Nothing here yet. Enjoy the breathing room!</p>
              )}
            </div>
          </div>

          <div className="right-column">
            <div className="ai-card">
              <div className="ai-icon"><Sparkles size={29} strokeWidth={1.7} aria-hidden="true" /></div>
              <p className="eyebrow">YOUR SMART ASSISTANT</p>
              <h2>A little help goes a long way.</h2>
              <p>
                Soon, AI will help you organize priorities and plan a more
                manageable day.
              </p>
              <button
                className="ai-button"
                onClick={() => alert("Your AI assistant is coming in the next development step!")}
              >
                <Sparkles size={16} aria-hidden="true" /> Meet your AI planner
              </button>
              <span className="coming-soon">AI INTEGRATION COMING SOON</span>
            </div>

            <div className="progress-card">
              <h3><Sprout size={19} aria-hidden="true" /> Your progress</h3>
              <p>Every completed task is a win.</p>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <span>
                {tasks.length ? Math.round((completed / tasks.length) * 100) : 0}%
                {" "}completed
              </span>
            </div>
          </div>
        </section>

        <footer>Made with <Heart size={12} aria-hidden="true" /> · One thing at a time.</footer>
      </main>
    </div>
  );
}

export default App;

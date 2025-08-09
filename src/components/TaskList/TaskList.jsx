import { Link } from 'react-router';

const TaskList = (props) => {
  return (
    <main>
      <div>
        <Link to="/tasks/new">
          <button type="button">Add Task</button>
        </Link>
      </div>

      {props.tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        props.tasks.map((task) => (
          <article key={task._id}>
            <header>
              <h2>
                <Link to={`/tasks/${task._id}`}>{task.name}</Link>
              </h2>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Assigned To: {task.assignedTo}</p>
              <p>Duration: {task.duration}</p>
            </header>
          </article>
        ))
      )}
    </main>
  );
};

export default TaskList;

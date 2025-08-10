import { Link } from 'react-router';

const TaskList = (props) => {
  return (
    <main>
      {props.tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        props.tasks.map((task) => (
          <article key={task._id}>
            <header>
              <h2>
                <Link to={`/tasks/${task._id}`}>{task.name}</Link>
              </h2>
              <p><strong>Description: </strong> {task.description}</p>
              <p><strong>Status: </strong> {task.status}</p>
              <p><strong>Assigned To: </strong> {task.ministry && task.ministry.length > 0
                ? task.ministry.map(m => m.name).join(', ')
                : 'No ministries assigned'}
              </p>
              <p><strong>Duration: </strong> {task.duration}</p>
            </header>
          </article>
        ))
      )}
    </main>
  );
};

export default TaskList;

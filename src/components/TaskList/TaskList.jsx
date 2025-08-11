import { Link } from 'react-router';

const TaskList = (props) => {
  return (
    <main className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Tasks List</h1>
      </div>

      {props.tasks.length === 0 ? (
        <p className="text-muted text-center">No tasks found.</p>
      ) : (
        <div className="row g-4">
          {props.tasks.map((task) => (
            <div className="col-md-4" key={task._id}>
              <div className="card card-hover h-100 shadow-sm border-0 text-center d-flex justify-content-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title mb-3">
                    <Link
                      to={`/tasks/${task._id}`}
                      className="text-decoration-none text-danger"
                    >
                      {task.name}
                    </Link>
                  </h5>
                  <p className="mb-1"><strong>Description:</strong> {task.description}</p>
                  <p className="mb-1"><strong>Status:</strong> {task.status}</p>
                  <p className="mb-1">
                    <strong>Assigned To:</strong>{' '}
                    {task.ministry && task.ministry.length > 0
                      ? task.ministry.map((m) => m.name).join(', ')
                      : 'No ministries assigned'}
                  </p>
                  <p className="mb-0"><strong>Duration:</strong> {task.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default TaskList;

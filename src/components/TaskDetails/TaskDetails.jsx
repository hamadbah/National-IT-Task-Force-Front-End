import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import * as taskService from '../../services/taskService';
import * as teamService from '../../services/teamService';

const TaskDetails = (props) => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await taskService.show(taskId);
        setTask(data);
        if (data.teams && Array.isArray(data.teams)) {
          setSelectedTeamIds(data.teams.map(team => team._id));
        } else {
          setSelectedTeamIds([]);
        }
      } catch (err) {
        console.error("Failed to fetch task", err);
      }
    };
    fetchTask();
  }, [taskId]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await teamService.index();
        setTeams(teamsData);
      } catch (err) {
        console.error("Failed to fetch teams", err);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    if (!statusMessage) return;

    const timer = setTimeout(() => {
      setStatusMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [statusMessage]);

  const handleCheckboxChange = (teamId) => {
    setSelectedTeamIds(prev =>
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleAssignTeams = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await taskService.update(taskId, { teams: selectedTeamIds });
      setTask(updatedTask);
      setStatusMessage("Team Members updated to the selected task.");
    } catch (err) {
      console.error("Failed to assign teams", err);
      setStatusMessage("Failed to assign teams.");
    }
  };

  const handleDelete = async () => {
    await props.handleDeleteTask(taskId);
  };

  if (!task) return <p>Loading task details...</p>;

  return (
    <main className="container-fluid bg-secondary min-vh-100 py-4">
      <h2 className="mb-3">{task.name}</h2>

      <div className="mb-3">
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p>
          <strong>Assigned To:</strong> {task.ministry && task.ministry.length > 0
            ? task.ministry.map(m => m.name).join(', ')
            : 'No ministries assigned'}
        </p>
        <p><strong>Duration:</strong> {task.duration}</p>
      </div>

      <div className="mb-4">
        <Link to={`/tasks/${taskId}/edit`} className="btn btn-primary me-2">Edit</Link>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>

      <hr />

      <form onSubmit={handleAssignTeams}>
        <h3 className="mb-3">Assign Team Members to The Task</h3>

        {teams.length === 0 && <p>No teams available.</p>}

        <div className="mb-3">
          {teams.map(team => (
            <div className="form-check" key={team._id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`team-${team._id}`}
                value={team._id}
                checked={selectedTeamIds.includes(team._id)}
                onChange={() => handleCheckboxChange(team._id)}
              />
              <label className="form-check-label" htmlFor={`team-${team._id}`}>
                {team.name} ({team.speciality})
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-success">Set Task-Force Team</button>
      </form>

      {statusMessage && (
        <div
          className={`mt-3 alert ${
            statusMessage.includes('Failed') ? 'alert-danger' : 'alert-success'
          }`}
          role="alert"
        >
          {statusMessage}
        </div>
      )}
    </main>
  );
};

export default TaskDetails;

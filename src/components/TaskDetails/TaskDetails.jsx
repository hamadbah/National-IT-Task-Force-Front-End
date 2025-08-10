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
    <main>
      <h2>{task.name}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Assigned To:</strong> {task.ministry && task.ministry.length > 0
        ? task.ministry.map(m => m.name).join(', ')
        : 'No ministries assigned'}
      </p>
      <p><strong>Duration:</strong> {task.duration}</p>

      <div>
        <Link to={`/tasks/${taskId}/edit`}> <button type="button">Edit</button> </Link>
        <button type="button" onClick={handleDelete}> Delete </button>
      </div>
      <hr />
      <form onSubmit={handleAssignTeams}>

        <h3>Assign Team Members to The Task</h3>
        {teams.length === 0 && <p>No teams available.</p>}
        {teams.map(team => (
          <label key={team._id} style={{ display: 'block', marginBottom: '5px' }}>
            <input
              type="checkbox"
              value={team._id}
              checked={selectedTeamIds.includes(team._id)}
              onChange={() => handleCheckboxChange(team._id)}
            />
            {team.name} ({team.speciality})
          </label>
        ))}

        <button type="submit">Set Task-Force Team</button>
      </form>
      {statusMessage && (
        <p style={{ marginTop: '10px', color: statusMessage.includes('Failed') ? 'red' : 'green' }}>
          {statusMessage}
        </p>
      )}
    </main>
  );
};

export default TaskDetails;
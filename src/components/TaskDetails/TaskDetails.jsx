import { useState, useEffect, useContext } from 'react';
import * as taskService from '../../services/taskService';
import { useParams, Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';


const TaskDetails = (props) => {
   const [task, setTask] = useState(null);
  const { taskId } = useParams();
  console.log('taskId', taskId);
  const { user } = useContext(UserContext);

    useEffect(() => {
    const fetchTask = async () => {
      const taskData = await taskService.show(taskId);
      setHoot(hootData);
    };
    fetchTask();
  }, [taskId]);

  // Verify the task state is set correctly:
  console.log('task state:', task);

const handleAddComment = async (commentFormData) => {
    const newComment = await taskService.createComment(taskId, commentFormData);
    setTask({ ...task, comments: [...task.comments, newComment] });
  };
  // Function to handle deleting a comment
const handleDeleteComment = async (commentId) => {
    await taskService.deleteComment(taskId, commentId);
    setTask({
      ...task,
      comments: task.comments.filter(comment => comment._id !== commentId),
    });
  };



  if (!task) return (<main>Loading...</main>);

    return (
  <>
    <main>
      <section>
         <header>
          <p>{task.category.toUpperCase()}</p>
          <h1>{task.title}</h1>
          <p>
            {`${task.author.username} posted on
            ${new Date(task.createdAt).toLocaleDateString()}`}
          </p>
          {task.author._id === user._id && (
            <>
              <Link to={`/tasks/${taskId}/edit`}>Edit</Link>

              <button onClick={() => props.handleDeleteTask(taskId)}>
                Delete
              </button>
            </>
          )}
        </header>
        <p>{task.text}</p>
     
      </section>
    </main>
  </>
);


}
 

export default TaskDetails;
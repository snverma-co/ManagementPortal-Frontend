import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, updateTask } from '../../store/slices/taskSlice';

const ClientTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  
  const handleStatusChange = (taskId, newStatus) => {
    dispatch(updateTask({ id: taskId, taskData: { status: newStatus } }));
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Tasks</h2>
      
      {isLoading ? (
        <p className="text-center py-4">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center py-4">No tasks assigned to you yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Deadline</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {tasks.map((task) => (
                <tr key={task._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">{task.title}</td>
                  <td className="py-3 px-6 text-left">
                    {task.description.length > 50
                      ? `${task.description.substring(0, 50)}...`
                      : task.description}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClientTasks;
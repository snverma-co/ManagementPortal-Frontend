import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../store/slices/clientSlice';
import { getTasks } from '../../store/slices/taskSlice';
import { getDocuments } from '../../store/slices/documentSlice';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { clients, isLoading: clientsLoading } = useSelector((state) => state.clients);
  const { tasks, isLoading: tasksLoading } = useSelector((state) => state.tasks);
  const { documents, isLoading: documentsLoading } = useSelector((state) => state.documents);
  
  useEffect(() => {
    dispatch(getClients());
    dispatch(getTasks());
    dispatch(getDocuments());
  }, [dispatch]);
  
  // Calculate statistics
  const totalClients = clients?.length || 0;
  const pendingTasks = tasks?.filter(task => task.status === 'pending')?.length || 0;
  const inProgressTasks = tasks?.filter(task => task.status === 'in_progress')?.length || 0;
  const completedTasks = tasks?.filter(task => task.status === 'completed')?.length || 0;
  const totalDocuments = documents?.length || 0;
  
  // Get recent items
  const recentClients = [...(clients || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const recentTasks = [...(tasks || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  const recentDocuments = [...(documents || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
  
  const isLoading = clientsLoading || tasksLoading || documentsLoading;
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard data...</div>;
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?.name || 'Admin'}</h1>
        <p className="text-gray-600">Here's what's happening with your portal today.</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Clients</p>
              <p className="text-3xl font-semibold text-gray-800">{totalClients}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/clients" className="text-blue-500 hover:text-blue-700 text-sm font-medium">View all clients →</Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending Tasks</p>
              <p className="text-3xl font-semibold text-gray-800">{pendingTasks}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/tasks" className="text-yellow-500 hover:text-yellow-700 text-sm font-medium">View all tasks →</Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completed Tasks</p>
              <p className="text-3xl font-semibold text-gray-800">{completedTasks}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/tasks" className="text-green-500 hover:text-green-700 text-sm font-medium">View all tasks →</Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Documents</p>
              <p className="text-3xl font-semibold text-gray-800">{totalDocuments}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/admin/documents" className="text-purple-500 hover:text-purple-700 text-sm font-medium">View all documents →</Link>
          </div>
        </div>
      </div>
      
      {/* Task Status Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Status Overview</h2>
          <div className="flex items-center justify-around h-48">
            <div className="text-center">
              <div className="inline-block w-24 h-24 rounded-full border-8 border-yellow-500 flex items-center justify-center">
                <span className="text-xl font-bold">{pendingTasks}</span>
              </div>
              <p className="mt-2 text-gray-600">Pending</p>
            </div>
            <div className="text-center">
              <div className="inline-block w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center">
                <span className="text-xl font-bold">{inProgressTasks}</span>
              </div>
              <p className="mt-2 text-gray-600">In Progress</p>
            </div>
            <div className="text-center">
              <div className="inline-block w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center">
                <span className="text-xl font-bold">{completedTasks}</span>
              </div>
              <p className="mt-2 text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentTasks.slice(0, 3).map(task => (
              <div key={task._id} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{task.title}</p>
                  <p className="text-xs text-gray-500">New task created for {task.client?.name || 'a client'}</p>
                  <p className="text-xs text-gray-400">{new Date(task.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
            
            {recentDocuments.slice(0, 2).map(doc => (
              <div key={doc._id} className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-500">Document uploaded for {doc.client?.name || 'a client'}</p>
                  <p className="text-xs text-gray-400">{new Date(doc.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Clients and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
            <h2 className="text-lg font-semibold text-gray-800">Recent Clients</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentClients.length > 0 ? (
              recentClients.map(client => (
                <div key={client._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold">
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-800">{client.name}</h3>
                      <p className="text-xs text-gray-500">{client.email}</p>
                    </div>
                    <div className="ml-auto">
                      <Link to={`/admin/clients/${client._id}`} className="text-indigo-500 hover:text-indigo-700 text-sm">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">No clients found</div>
            )}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <Link to="/admin/clients" className="text-indigo-500 hover:text-indigo-700 text-sm font-medium">View all clients</Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
            <h2 className="text-lg font-semibold text-gray-800">Recent Tasks</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <div key={task._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.status === 'completed' ? 'bg-green-100 text-green-800' : task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
                      <p className="text-xs text-gray-500">Due: {new Date(task.deadline).toLocaleDateString()}</p>
                    </div>
                    <div className="ml-auto">
                      <button className="text-indigo-500 hover:text-indigo-700 text-sm">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">No tasks found</div>
            )}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <Link to="/admin/tasks" className="text-indigo-500 hover:text-indigo-700 text-sm font-medium">View all tasks</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
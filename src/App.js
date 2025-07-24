import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';

// Auth Pages
import Login from './pages/auth/Login.js';
import Register from './pages/auth/Register.js';
import ForgotPassword from './pages/auth/ForgotPassword.js';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard.js';
import ClientsList from './pages/admin/ClientsList.js';
import ClientDetails from './pages/admin/ClientDetails.js';
import TasksList from './pages/admin/TasksList.js';
import DocumentsList from './pages/admin/DocumentsList.js';

// Client Pages
import ClientDashboard from './pages/client/Dashboard.js';
import ClientTasks from './pages/client/Tasks.js';
import ClientDocuments from './pages/client/Documents.js';

// Components
import PrivateRoute from './components/routing/PrivateRoute.js';
import AdminRoute from './components/routing/AdminRoute.js';
import AdminLayout from './components/layouts/AdminLayout.js';
import ClientLayout from './components/layouts/ClientLayout.js';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminRoute>
            } />
            <Route path="/admin/clients" element={
              <AdminRoute>
                <AdminLayout>
                  <ClientsList />
                </AdminLayout>
              </AdminRoute>
            } />
            <Route path="/admin/clients/:id" element={
              <AdminRoute>
                <AdminLayout>
                  <ClientDetails />
                </AdminLayout>
              </AdminRoute>
            } />
            <Route path="/admin/tasks" element={
              <AdminRoute>
                <AdminLayout>
                  <TasksList />
                </AdminLayout>
              </AdminRoute>
            } />
            <Route path="/admin/documents" element={
              <AdminRoute>
                <AdminLayout>
                  <DocumentsList />
                </AdminLayout>
              </AdminRoute>
            } />
            
            {/* Client Routes */}
            <Route path="/client" element={
              <PrivateRoute>
                <ClientLayout>
                  <ClientDashboard />
                </ClientLayout>
              </PrivateRoute>
            } />
            <Route path="/client/tasks" element={
              <PrivateRoute>
                <ClientLayout>
                  <ClientTasks />
                </ClientLayout>
              </PrivateRoute>
            } />
            <Route path="/client/documents" element={
              <PrivateRoute>
                <ClientLayout>
                  <ClientDocuments />
                </ClientLayout>
              </PrivateRoute>
            } />
            
            {/* Redirect to login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
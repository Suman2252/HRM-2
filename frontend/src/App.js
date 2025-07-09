import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import MyProfile from './components/MyProfile';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <MyProfile />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Only Routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requiredRoles={['Admin']}>
                  <Layout>
                    <div className="container mt-5">
                      <div className="alert alert-info">
                        <h4>Admin Panel</h4>
                        <p>This is where admin-specific features would be implemented.</p>
                        <p>Features could include:</p>
                        <ul>
                          <li>User Management</li>
                          <li>System Configuration</li>
                          <li>Audit Logs</li>
                          <li>Reports & Analytics</li>
                        </ul>
                      </div>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* VP and Admin Routes */}
            <Route 
              path="/executive/*" 
              element={
                <ProtectedRoute requiredRoles={['Admin', 'Vice President']}>
                  <Layout>
                    <div className="container mt-5">
                      <div className="alert alert-success">
                        <h4>Executive Panel</h4>
                        <p>This is where executive-level features would be implemented.</p>
                        <p>Features could include:</p>
                        <ul>
                          <li>Executive Dashboard</li>
                          <li>Strategic Planning</li>
                          <li>Department Overview</li>
                          <li>High-level Reports</li>
                        </ul>
                      </div>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* HR Routes */}
            <Route 
              path="/hr/*" 
              element={
                <ProtectedRoute requiredRoles={['Admin', 'Vice President', 'HR BP', 'HR Manager', 'HR Executive']}>
                  <Layout>
                    <div className="container mt-5">
                      <div className="alert alert-warning">
                        <h4>HR Panel</h4>
                        <p>This is where HR-specific features would be implemented.</p>
                        <p>Features could include:</p>
                        <ul>
                          <li>Employee Records</li>
                          <li>Recruitment & Onboarding</li>
                          <li>Performance Management</li>
                          <li>Training & Development</li>
                          <li>Leave Management</li>
                        </ul>
                      </div>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* Team Management Routes */}
            <Route 
              path="/team/*" 
              element={
                <ProtectedRoute requiredRoles={['Admin', 'Vice President', 'Team Manager', 'Team Leader']}>
                  <Layout>
                    <div className="container mt-5">
                      <div className="alert alert-primary">
                        <h4>Team Management Panel</h4>
                        <p>This is where team management features would be implemented.</p>
                        <p>Features could include:</p>
                        <ul>
                          <li>Team Overview</li>
                          <li>Task Assignment</li>
                          <li>Performance Tracking</li>
                          <li>Team Reports</li>
                          <li>Goal Setting</li>
                        </ul>
                      </div>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect to profile */}
            <Route path="/" element={<Navigate to="/profile" replace />} />
            
            {/* 404 Page */}
            <Route 
              path="*" 
              element={
                <div className="container mt-5">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body text-center">
                          <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '4rem' }}></i>
                          <h2 className="card-title mt-3">Page Not Found</h2>
                          <p className="card-text text-muted">
                            The page you're looking for doesn't exist.
                          </p>
                          <a href="/dashboard" className="btn btn-primary">
                            <i className="bi bi-house me-2"></i>
                            Go to Dashboard
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

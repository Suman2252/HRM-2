import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopNavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsDropdownOpen(false);
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return 'U';
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
  };

  // Check if user has management access
  const hasManagementAccess = () => {
    const managementRoles = [
      'Admin',
      'Vice President',
      'HR BP',
      'HR Manager',
      'Team Manager',
      'Team Leader'
    ];
    return managementRoles.includes(user?.role);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        {/* Brand/Logo */}
        <div className="navbar-brand d-flex align-items-center">
          <i className="bi bi-building me-2" style={{ fontSize: '1.5rem' }}></i>
          <span className="fw-bold">HRM System</span>
        </div>

        {/* Spacer to push profile to the right */}
        <div className="flex-grow-1"></div>

        {/* Profile Section */}
        <div className="navbar-nav">
          <div className="nav-item dropdown" ref={dropdownRef}>
            <button
              className="btn btn-link nav-link dropdown-toggle d-flex align-items-center text-white text-decoration-none p-2"
              onClick={handleProfileClick}
              style={{ border: 'none', background: 'none' }}
            >
              {/* Profile Picture or Initials */}
              <div 
                className="rounded-circle bg-light text-primary d-flex align-items-center justify-content-center me-2"
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                {user?.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                ) : (
                  getInitials(user?.firstName, user?.lastName)
                )}
              </div>
              
              {/* User Info */}
              <div className="d-none d-md-block text-start me-2">
                <div className="fw-semibold" style={{ fontSize: '14px', lineHeight: '1.2' }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-light" style={{ fontSize: '12px', opacity: '0.8' }}>
                  {user?.role}
                </div>
              </div>

              {/* Dropdown Arrow */}
              <i className={`bi bi-chevron-${isDropdownOpen ? 'up' : 'down'} ms-1`}></i>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="dropdown-menu dropdown-menu-end show shadow-lg"
                style={{ 
                  minWidth: '250px',
                  border: 'none',
                  borderRadius: '8px',
                  marginTop: '8px'
                }}
              >
                {/* User Info Header */}
                <div className="dropdown-header bg-light">
                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                      style={{ 
                        width: '50px', 
                        height: '50px', 
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}
                    >
                      {user?.profilePhoto ? (
                        <img
                          src={user.profilePhoto}
                          alt="Profile"
                          className="rounded-circle"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      ) : (
                        getInitials(user?.firstName, user?.lastName)
                      )}
                    </div>
                    <div>
                      <div className="fw-bold text-dark">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-muted small">{user?.email}</div>
                      <div className="badge bg-primary mt-1">{user?.role}</div>
                    </div>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                {/* Navigation Options */}
                <button
                  className="dropdown-item d-flex align-items-center py-2"
                  onClick={() => handleNavigation('/profile')}
                >
                  <i className="bi bi-person-circle me-3 text-primary" style={{ fontSize: '18px' }}></i>
                  <div>
                    <div className="fw-semibold">My Profile</div>
                    <div className="text-muted small">View and edit your profile</div>
                  </div>
                </button>

                {/* Management Dashboard - Only show for management roles */}
                {hasManagementAccess() && (
                  <button
                    className="dropdown-item d-flex align-items-center py-2"
                    onClick={() => handleNavigation('/dashboard')}
                  >
                    <i className="bi bi-speedometer2 me-3 text-success" style={{ fontSize: '18px' }}></i>
                    <div>
                      <div className="fw-semibold">Management Dashboard</div>
                      <div className="text-muted small">Access management tools</div>
                    </div>
                  </button>
                )}

                <div className="dropdown-divider"></div>

                {/* Logout Option */}
                <button
                  className="dropdown-item d-flex align-items-center py-2 text-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-3" style={{ fontSize: '18px' }}></i>
                  <div>
                    <div className="fw-semibold">Logout</div>
                    <div className="text-muted small">Sign out of your account</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const MyProfile = () => {
  // Enhanced styles for aesthetic improvements
  const styles = {
    container: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '2rem 0'
    },
    profileCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    sidebarCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    tabButton: {
      border: 'none',
      borderRadius: '12px',
      margin: '4px 0',
      transition: 'all 0.3s ease',
      background: 'transparent'
    },
    activeTab: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      transform: 'translateX(8px)',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    profilePhoto: {
      width: '180px',
      height: '180px',
      border: '6px solid transparent',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '50%',
      padding: '6px',
      transition: 'all 0.3s ease'
    },
    profilePhotoInner: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      objectFit: 'cover',
      background: 'white'
    },
    gradientButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '25px',
      color: 'white',
      padding: '8px 20px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    infoCard: {
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '1.5rem',
      margin: '0.5rem 0',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    },
    leaveCard: {
      borderRadius: '15px',
      border: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      overflow: 'hidden'
    },
    casualLeave: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    sickLeave: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white'
    },
    earnedLeave: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: 'white'
    },
    maternityLeave: {
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: 'white'
    },
    paternityLeave: {
      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      color: 'white'
    },
    attendanceCard: {
      borderRadius: '15px',
      border: 'none',
      transition: 'all 0.3s ease'
    },
    presentCard: {
      background: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
      color: 'white'
    },
    absentCard: {
      background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
      color: 'white'
    },
    lateCard: {
      background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      color: 'white'
    },
    hoursCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    listItem: {
      borderRadius: '12px',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      margin: '8px 0',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.8)'
    },
    badge: {
      borderRadius: '20px',
      padding: '6px 12px',
      fontWeight: '500'
    },
    headerGradient: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }
  };
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await api.get('/auth/profile');
      setProfileData(response.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'personal', label: '👤 Personal Info', icon: '👤' },
    { id: 'work', label: '💼 Work Info', icon: '💼' },
    { id: 'documents', label: '📄 Documents', icon: '📄' },
    { id: 'emergency', label: '🚨 Emergency Contact', icon: '🚨' },
    { id: 'bank', label: '🏦 Bank & Salary', icon: '🏦' },
    { id: 'leave', label: '🏖️ Leave Summary', icon: '🏖️' },
    { id: 'attendance', label: '⏰ Attendance', icon: '⏰' },
    { id: 'payslips', label: '💰 Payslips', icon: '💰' },
    { id: 'performance', label: '📊 Performance', icon: '📊' },
    { id: 'trainings', label: '🎓 Trainings', icon: '🎓' },
    { id: 'notifications', label: '🔔 Notifications', icon: '🔔' },
    { id: 'security', label: '🔒 Security', icon: '🔒' }
  ];

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return 'Not provided';
    return '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-4);
  };

  const formatDate = (date) => {
    if (!date) return 'Not provided';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (!profileData) {
      return <div className="alert alert-warning">Unable to load profile data</div>;
    }

    switch (activeTab) {
      case 'personal':
        return (
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="profile-photo-container" style={{ position: 'relative' }}>
                <div style={styles.profilePhoto} className="mx-auto mb-3">
                  <img
                    src={profileData.profilePhoto || '/api/placeholder/150/150'}
                    alt="Profile"
                    style={styles.profilePhotoInner}
                  />
                </div>
                <button 
                  style={styles.gradientButton}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  📸 Change Photo
                </button>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div style={styles.infoCard}>
                    <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>👤 Full Name</label>
                    <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                      {profileData.firstName} {profileData.lastName}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div style={styles.infoCard}>
                    <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>🎂 Date of Birth</label>
                    <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                      {formatDate(profileData.dateOfBirth)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div style={styles.infoCard}>
                    <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>⚧ Gender</label>
                    <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                      {profileData.gender || 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div style={styles.infoCard}>
                    <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>📱 Phone Number</label>
                    <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                      {profileData.phoneNumber || 'Not provided'}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div style={styles.infoCard}>
                    <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>📧 Email</label>
                    <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                      {profileData.email}
                    </p>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div style={styles.infoCard}>
                    <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>🏠 Address</label>
                    <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                      {profileData.address ? 
                        `${profileData.address.street || ''}, ${profileData.address.city || ''}, ${profileData.address.state || ''} ${profileData.address.zipCode || ''}, ${profileData.address.country || ''}`.replace(/^,\s*|,\s*$/g, '') 
                        : 'Not provided'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'work':
        return (
          <div className="row">
            <div className="col-md-6 mb-3">
              <div style={styles.infoCard}>
                <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>🆔 Employee ID</label>
                <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                  {profileData.employeeId}
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div style={styles.infoCard}>
                <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>🏢 Department</label>
                <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                  {profileData.department}
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div style={styles.infoCard}>
                <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>👥 Team Name</label>
                <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                  {profileData.teamName || 'Not assigned'}
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div style={styles.infoCard}>
                <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>💼 Role/Designation</label>
                <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                  {profileData.role}
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div style={styles.infoCard}>
                <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>👨‍💼 Reporting Manager</label>
                <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                  {profileData.reportingManager?.firstName || 'Not assigned'}
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div style={styles.infoCard}>
                <label className="form-label fw-bold" style={{ color: '#667eea', fontSize: '0.9rem' }}>📅 Joining Date</label>
                <p className="form-control-plaintext fw-semibold" style={{ fontSize: '1.1rem', color: '#2d3748' }}>
                  {formatDate(profileData.joiningDate)}
                </p>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="row">
            <div className="col-12">
              <div style={{
                ...styles.infoCard,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                marginBottom: '1.5rem'
              }}>
                <h6 style={{ color: '#667eea', fontWeight: '600', marginBottom: '0.5rem' }}>📄 Personal Documents</h6>
                <p style={{ color: '#667eea', marginBottom: 0 }}>View and download your personal documents</p>
              </div>
              <div className="list-group">
                <div style={styles.listItem} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1" style={{ color: '#2d3748', fontWeight: '600' }}>🆔 ID Proof (Aadhar Card)</h6>
                    <small style={{ color: '#667eea' }}>Uploaded on: Jan 15, 2024</small>
                  </div>
                  <button 
                    style={styles.gradientButton}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    📥 Download
                  </button>
                </div>
                <div style={styles.listItem} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1" style={{ color: '#2d3748', fontWeight: '600' }}>📋 Offer Letter</h6>
                    <small style={{ color: '#667eea' }}>Uploaded on: Dec 20, 2023</small>
                  </div>
                  <button 
                    style={styles.gradientButton}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    📥 Download
                  </button>
                </div>
                <div style={styles.listItem} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1" style={{ color: '#2d3748', fontWeight: '600' }}>📜 Experience Letters</h6>
                    <small style={{ color: '#667eea' }}>Uploaded on: Dec 22, 2023</small>
                  </div>
                  <button 
                    style={styles.gradientButton}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    📥 Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'emergency':
        return (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Contact Name</label>
              <p className="form-control-plaintext">{profileData.emergencyContact?.name || 'Not provided'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Relationship</label>
              <p className="form-control-plaintext">{profileData.emergencyContact?.relationship || 'Not provided'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Phone Number</label>
              <p className="form-control-plaintext">{profileData.emergencyContact?.phone || 'Not provided'}</p>
            </div>
            <div className="col-12 mb-3">
              <label className="form-label fw-bold">Address</label>
              <p className="form-control-plaintext">{profileData.emergencyContact?.address || 'Not provided'}</p>
            </div>
          </div>
        );

      case 'bank':
        return (
          <div className="row">
            <div className="col-12 mb-3">
              <div className="alert alert-warning">
                <small>🔒 Sensitive information is masked for security</small>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Account Number</label>
              <p className="form-control-plaintext">{maskAccountNumber(profileData.bankDetails?.accountNumber)}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Bank Name</label>
              <p className="form-control-plaintext">{profileData.bankDetails?.bankName || 'Not provided'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">IFSC Code</label>
              <p className="form-control-plaintext">{profileData.bankDetails?.ifscCode || 'Not provided'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">PF Number</label>
              <p className="form-control-plaintext">{profileData.bankDetails?.pfNumber || 'Not provided'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">ESI Number</label>
              <p className="form-control-plaintext">{profileData.bankDetails?.esiNumber || 'Not provided'}</p>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">PAN Number</label>
              <p className="form-control-plaintext">{profileData.bankDetails?.panNumber || 'Not provided'}</p>
            </div>
          </div>
        );

      case 'leave':
        return (
          <div className="row">
            <div className="col-12 mb-4">
              <h6 style={styles.headerGradient} className="mb-4">📊 Current Leave Balance</h6>
              <div className="row">
                <div className="col-md-2 col-6 mb-3">
                  <div 
                    style={{...styles.leaveCard, ...styles.casualLeave}} 
                    className="card text-center"
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {profileData.leaveBalance?.casual || 0}
                      </h5>
                      <p className="card-text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        🏖️ Casual Leave
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-6 mb-3">
                  <div 
                    style={{...styles.leaveCard, ...styles.sickLeave}} 
                    className="card text-center"
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {profileData.leaveBalance?.sick || 0}
                      </h5>
                      <p className="card-text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        🤒 Sick Leave
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-6 mb-3">
                  <div 
                    style={{...styles.leaveCard, ...styles.earnedLeave}} 
                    className="card text-center"
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {profileData.leaveBalance?.earned || 0}
                      </h5>
                      <p className="card-text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        ⭐ Earned Leave
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-6 mb-3">
                  <div 
                    style={{...styles.leaveCard, ...styles.maternityLeave}} 
                    className="card text-center"
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {profileData.leaveBalance?.maternity || 0}
                      </h5>
                      <p className="card-text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        👶 Maternity
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-6 mb-3">
                  <div 
                    style={{...styles.leaveCard, ...styles.paternityLeave}} 
                    className="card text-center"
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        {profileData.leaveBalance?.paternity || 0}
                      </h5>
                      <p className="card-text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        👨‍👶 Paternity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <h6 style={styles.headerGradient} className="mb-3">📅 Upcoming Leave Dates</h6>
              <div style={{
                ...styles.infoCard,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                border: '2px dashed #667eea'
              }}>
                <p className="mb-0" style={{ color: '#667eea', fontWeight: '500' }}>
                  ✨ No upcoming leaves scheduled
                </p>
              </div>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="row">
            <div className="col-12 mb-4">
              <h6 style={styles.headerGradient} className="mb-4">📊 Monthly Attendance Overview</h6>
              <div className="row">
                <div className="col-md-3 col-6 mb-3">
                  <div 
                    style={{...styles.attendanceCard, ...styles.presentCard}} 
                    className="card text-center"
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>22</h5>
                      <p className="card-text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        ✅ Present Days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div 
                    style={{...styles.attendanceCard, ...styles.absentCard}} 
                    className="card text-center"
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>2</h5>
                      <p className="card-text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        ❌ Absent Days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div 
                    style={{...styles.attendanceCard, ...styles.lateCard}} 
                    className="card text-center"
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>1</h5>
                      <p className="card-text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        ⏰ Late Arrivals
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <div 
                    style={{...styles.attendanceCard, ...styles.hoursCard}} 
                    className="card text-center"
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px) scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0) scale(1)'}
                  >
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>176</h5>
                      <p className="card-text" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        🕒 Total Hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <h6 style={styles.headerGradient} className="mb-3">🕐 Recent Punch Records</h6>
              <div style={styles.infoCard}>
                <div className="table-responsive">
                  <table className="table table-sm" style={{ marginBottom: 0 }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #667eea' }}>
                        <th style={{ color: '#667eea', fontWeight: '600' }}>📅 Date</th>
                        <th style={{ color: '#667eea', fontWeight: '600' }}>🕘 Punch In</th>
                        <th style={{ color: '#667eea', fontWeight: '600' }}>🕕 Punch Out</th>
                        <th style={{ color: '#667eea', fontWeight: '600' }}>⏱️ Total Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(102, 126, 234, 0.1)' }}>
                        <td style={{ fontWeight: '500', color: '#2d3748' }}>Today</td>
                        <td style={{ color: '#48bb78' }}>09:15 AM</td>
                        <td style={{ color: '#ed8936' }}>-</td>
                        <td style={{ color: '#667eea' }}>-</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(102, 126, 234, 0.1)' }}>
                        <td style={{ fontWeight: '500', color: '#2d3748' }}>Yesterday</td>
                        <td style={{ color: '#48bb78' }}>09:00 AM</td>
                        <td style={{ color: '#48bb78' }}>06:30 PM</td>
                        <td style={{ color: '#667eea', fontWeight: '600' }}>9h 30m</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payslips':
        return (
          <div className="row">
            <div className="col-12">
              <h6>💰 Monthly Payslips</h6>
              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">December 2024</h6>
                    <small className="text-muted">Generated on: Jan 1, 2025</small>
                  </div>
                  <button className="btn btn-outline-primary btn-sm">Download PDF</button>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">November 2024</h6>
                    <small className="text-muted">Generated on: Dec 1, 2024</small>
                  </div>
                  <button className="btn btn-outline-primary btn-sm">Download PDF</button>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">October 2024</h6>
                    <small className="text-muted">Generated on: Nov 1, 2024</small>
                  </div>
                  <button className="btn btn-outline-primary btn-sm">Download PDF</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="row">
            <div className="col-12 mb-4">
              <h6>🎯 Current Goals & KPIs</h6>
              {profileData.currentGoals && profileData.currentGoals.length > 0 ? (
                <div className="list-group">
                  {profileData.currentGoals.map((goal, index) => (
                    <div key={index} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{goal.title}</h6>
                        <span className={`badge ${goal.status === 'Completed' ? 'bg-success' : goal.status === 'In Progress' ? 'bg-warning' : 'bg-secondary'}`}>
                          {goal.status}
                        </span>
                      </div>
                      <p className="mb-1">{goal.description}</p>
                      <small>Target Date: {formatDate(goal.targetDate)}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-light">No current goals assigned</div>
              )}
            </div>
            <div className="col-12">
              <h6>📈 Last Appraisal</h6>
              {profileData.lastAppraisal ? (
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title">Rating: {profileData.lastAppraisal.rating}</h6>
                    <p className="card-text">{profileData.lastAppraisal.feedback}</p>
                    <small className="text-muted">Date: {formatDate(profileData.lastAppraisal.date)}</small>
                  </div>
                </div>
              ) : (
                <div className="alert alert-light">No appraisal data available</div>
              )}
            </div>
          </div>
        );

      case 'trainings':
        return (
          <div className="row">
            <div className="col-12">
              <h6>🎓 Training Programs</h6>
              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">React Advanced Concepts</h6>
                    <small className="text-muted">Assigned on: Dec 15, 2024</small>
                  </div>
                  <span className="badge bg-warning">In Progress</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Leadership Skills</h6>
                    <small className="text-muted">Completed on: Nov 20, 2024</small>
                  </div>
                  <span className="badge bg-success">Completed</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Data Security Awareness</h6>
                    <small className="text-muted">Assigned on: Jan 5, 2025</small>
                  </div>
                  <span className="badge bg-secondary">Not Started</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="row">
            <div className="col-12">
              <h6>🔔 Recent Notifications</h6>
              <div className="list-group">
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Leave Request Approved</h6>
                    <small>2 hours ago</small>
                  </div>
                  <p className="mb-1">Your leave request for Jan 15-16 has been approved by your manager.</p>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">New Training Assigned</h6>
                    <small>1 day ago</small>
                  </div>
                  <p className="mb-1">You have been assigned a new training: "Data Security Awareness"</p>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Payslip Generated</h6>
                    <small>3 days ago</small>
                  </div>
                  <p className="mb-1">Your payslip for December 2024 is now available for download.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="row">
            <div className="col-12">
              <h6>🔒 Security & Settings</h6>
              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Change Password</h6>
                    <small className="text-muted">Last changed: 30 days ago</small>
                  </div>
                  <button className="btn btn-outline-primary btn-sm">Change</button>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Two-Factor Authentication</h6>
                    <small className="text-muted">Status: Disabled</small>
                  </div>
                  <button className="btn btn-outline-success btn-sm">Enable</button>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">Active Sessions</h6>
                    <small className="text-muted">2 active sessions</small>
                  </div>
                  <button className="btn btn-outline-danger btn-sm">Manage</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div style={styles.container}>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="mb-1" style={styles.headerGradient}>✨ My Profile</h2>
                <p className="mb-0" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.1rem' }}>
                  Welcome back, {user?.firstName}! Manage your profile information.
                </p>
              </div>
              <div>
                <span 
                  style={{
                    ...styles.badge,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    color: 'white',
                    fontSize: '1rem',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  🎯 {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 mb-4">
            <div style={styles.sidebarCard}>
              <div className="card-header" style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white',
                borderRadius: '20px 20px 0 0',
                border: 'none'
              }}>
                <h6 className="mb-0" style={{ fontWeight: '600' }}>🗂️ Profile Sections</h6>
              </div>
              <div className="list-group list-group-flush" style={{ borderRadius: '0 0 20px 20px' }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    style={{
                      ...styles.tabButton,
                      ...(activeTab === tab.id ? styles.activeTab : {}),
                      fontWeight: activeTab === tab.id ? '600' : '500'
                    }}
                    className={`list-group-item list-group-item-action ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.id) {
                        e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                        e.target.style.transform = 'translateX(4px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.id) {
                        e.target.style.background = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <span className="me-2">{tab.icon}</span>
                    {tab.label.replace(/^\S+\s/, '')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8">
            <div style={styles.profileCard}>
              <div className="card-header" style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white',
                borderRadius: '20px 20px 0 0',
                border: 'none'
              }}>
                <h5 className="mb-0" style={{ fontWeight: '600' }}>
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h5>
              </div>
              <div className="card-body" style={{ padding: '2rem' }}>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

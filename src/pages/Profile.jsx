import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, fetchUserInfo } = useAuth();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (!user) {
    return <div className="profile-container">Đang tải...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>👤 Thông Tin Cá Nhân</h1>
        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Điểm số:</span>
            <span className="info-value">{user.score}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Lượt chơi còn lại:</span>
            <span className="info-value">{user.turns}</span>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-number">{user.score}</div>
            <div className="stat-label">Tổng điểm</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{user.turns}</div>
            <div className="stat-label">Lượt còn lại</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

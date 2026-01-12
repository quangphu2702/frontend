import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await userAPI.getLeaderboard();
      setLeaderboard(response.data.topUsers || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="leaderboard-container">Đang tải...</div>;
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <h1>🏆 Bảng Xếp Hạng</h1>
        <p className="leaderboard-subtitle">Top 10 người chơi xuất sắc nhất</p>
        {leaderboard.length === 0 ? (
          <div className="no-data">Chưa có dữ liệu</div>
        ) : (
          <div className="leaderboard-list">
            {leaderboard.map((user, index) => (
              <div
                key={index}
                className={`leaderboard-item ${index < 3 ? `rank-${index + 1}` : ''}`}
              >
                <div className="rank">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `#${index + 1}`}
                </div>
                <div className="user-info">
                  <div className="username">{user.username}</div>
                </div>
                <div className="score">{user.score} điểm</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

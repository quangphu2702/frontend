import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>🎮 Game Đoán Số</h1>
        <p className="home-subtitle">Thử thách khả năng đoán số của bạn!</p>
        {user ? (
          <div className="home-actions">
            <Link to="/game" className="home-button primary">
              Bắt Đầu Chơi
            </Link>
          </div>
        ) : (
          <div className="home-actions">
            <Link to="/login" className="home-button primary">
              Đăng Nhập
            </Link>
            <Link to="/register" className="home-button secondary">
              Đăng Ký
            </Link>
          </div>
        )}
        <div className="home-features">
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>Đoán Số</h3>
            <p>Đoán số từ 1 đến 5 và giành điểm</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>Nhanh Chóng</h3>
            <p>Chơi ngay, không cần cài đặt phức tạp</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎮</div>
            <h3>Vui Vẻ</h3>
            <p>Trải nghiệm game thú vị và hấp dẫn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

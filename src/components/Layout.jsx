import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            🎮 Game Đoán Số
          </Link>
          <div className="nav-menu">
            {user ? (
              <>
                <Link to="/game" className="nav-link">Chơi Game</Link>
                <Link to="/profile" className="nav-link">Thông Tin</Link>
                <span className="nav-user">Xin chào, {user.email}</span>
                <button onClick={handleLogout} className="nav-button">
                  Đăng Xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Đăng Nhập</Link>
                <Link to="/register" className="nav-link">Đăng Ký</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;

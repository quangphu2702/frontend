import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { gameAPI } from '../services/api';
import './Game.css';

const Game = () => {
  const { user, fetchUserInfo } = useAuth();
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buyingTurns, setBuyingTurns] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [password, setPassword] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleGuess = async (number) => {
    if (loading || !user || user.turns <= 0) return;

    setSelectedNumber(number);
    setLoading(true);
    setResult(null);

    try {
      const response = await gameAPI.guess(number);
      setResult(response.data);
      await fetchUserInfo();
    } catch (error) {
      setResult({
        correct: false,
        message: error.response?.data?.message || 'Có lỗi xảy ra',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBuyTurns = async (e) => {
    e?.preventDefault();
    if (buyingTurns) return;

    if (!showPasswordForm) {
      setShowPasswordForm(true);
      setPaymentMessage('');
      return;
    }

    if (!password) {
      setPaymentMessage('Vui lòng nhập mật khẩu');
      return;
    }

    setBuyingTurns(true);
    setPaymentMessage('');
    try {
      const response = await gameAPI.buyTurns(password);
      setPaymentMessage(response.data.message);
      setPassword('');
      setShowPasswordForm(false);
      await fetchUserInfo();
    } catch (error) {
      setPaymentMessage(error.response?.data?.message || 'Thanh toán không thành công');
    } finally {
      setBuyingTurns(false);
    }
  };

  if (!user) {
    return <div className="game-container">Đang tải...</div>;
  }

  return (
    <div className="game-container">
      <div className="game-card">
        <h1>🎮 Game Đoán Số</h1>
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-label">Điểm số:</span>
            <span className="stat-value">{user.score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Lượt còn lại:</span>
            <span className="stat-value">{user.turns}</span>
          </div>
        </div>

        {user.turns <= 0 ? (
          <div className="no-turns">
            <p>Bạn đã hết lượt chơi!</p>
            {showPasswordForm ? (
              <form onSubmit={handleBuyTurns} className="password-form">
                <div className="form-group">
                  <label>Nhập mật khẩu để mua lượt:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
                {paymentMessage && (
                  <div className={`payment-message ${paymentMessage.includes('thành công') ? 'success' : 'error'}`}>
                    {paymentMessage}
                  </div>
                )}
                <div className="form-actions">
                  <button type="submit" className="buy-button" disabled={buyingTurns}>
                    {buyingTurns ? 'Đang xử lý...' : 'Xác Nhận'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPassword('');
                      setPaymentMessage('');
                    }}
                    className="cancel-button"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            ) : (
              <button onClick={handleBuyTurns} className="buy-button">
                Mua 5 Lượt Chơi
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="game-instruction">
              <p>Chọn một số từ 1 đến 5 để đoán:</p>
            </div>
            <div className="number-buttons">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleGuess(num)}
                  disabled={loading}
                  className={`number-button ${selectedNumber === num ? 'selected' : ''} ${loading ? 'disabled' : ''}`}
                >
                  {num}
                </button>
              ))}
            </div>

            {result && (
              <div className={`result ${result.correct ? 'success' : 'failure'}`}>
                <div className="result-icon">
                  {result.correct ? '🎉' : '😔'}
                </div>
                <div className="result-message">{result.message}</div>
                {result.serverNumber && (
                  <div className="result-details">
                    <p>Số bạn đoán: <strong>{result.userGuess}</strong></p>
                    <p>Số của server: <strong>{result.serverNumber}</strong></p>
                    <p>Điểm hiện tại: <strong>{result.score}</strong></p>
                    <p>Lượt còn lại: <strong>{result.remainingTurns}</strong></p>
                  </div>
                )}
              </div>
            )}

            {showPasswordForm ? (
              <form onSubmit={handleBuyTurns} className="password-form">
                <div className="form-group">
                  <label>Nhập mật khẩu để mua lượt:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
                {paymentMessage && (
                  <div className={`payment-message ${paymentMessage.includes('thành công') ? 'success' : 'error'}`}>
                    {paymentMessage}
                  </div>
                )}
                <div className="form-actions">
                  <button type="submit" className="buy-button" disabled={buyingTurns}>
                    {buyingTurns ? 'Đang xử lý...' : 'Xác Nhận'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPassword('');
                      setPaymentMessage('');
                    }}
                    className="cancel-button"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            ) : (
              <button onClick={handleBuyTurns} className="buy-button" disabled={buyingTurns}>
                Mua Thêm 5 Lượt
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Game;

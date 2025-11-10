import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import Signup from './signup';

function Preview() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const randomBudget = 40000;
  const randomExpenses = 28000;
  const randomIncome = 53000;
  const maxValue = Math.max(randomBudget, randomExpenses, randomIncome);
  const barMaxWidth = 220;

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Logged out successfully');
    // Optionally navigate to landing/home page after logout
    navigate('/');
  };

  return (
    <div style={{ position: 'relative', padding: 40, maxWidth: 900, margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      {!isLoggedIn ? (
        <button
          onClick={() => {
            setModalOpen(true);
            setShowLogin(true);
          }}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 100,
            padding: '10px 18px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Login / Signup
        </button>
      ) : (
        <button
          onClick={handleLogout}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 100,
            padding: '10px 18px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#ef4444',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      )}

      {modalOpen && !isLoggedIn && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 101,
        }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 14, minWidth: 320 }}>
            {showLogin ? (
              <Login
                switchToSignup={() => setShowLogin(false)}
                onClose={() => setModalOpen(false)}
                onLoginSuccess={() => {
                  setModalOpen(false);
                  setIsLoggedIn(true);
                }}
              />
            ) : (
              <Signup
                switchToLogin={() => setShowLogin(true)}
                onClose={() => setModalOpen(false)}
              />
            )}
          </div>
        </div>
      )}

      <h1 style={{ marginBottom: 32 }}>Welcome to Finance Manager Preview</h1>

      <div style={{ marginTop: 40, textAlign: 'left' }}>
        <h3>Budget Graph</h3>
        <div style={{
          height: 20, backgroundColor: '#fbbf24', borderRadius: 8,
          width: `${(randomBudget / maxValue) * barMaxWidth}px`, marginBottom: 16
        }}></div>

        <h3>Expenses Graph</h3>
        <div style={{
          height: 20, backgroundColor: '#ef4444', borderRadius: 8,
          width: `${(randomExpenses / maxValue) * barMaxWidth}px`, marginBottom: 16
        }}></div>

        <h3>Income Graph</h3>
        <div style={{
          height: 20, backgroundColor: '#2563eb', borderRadius: 8,
          width: `${(randomIncome / maxValue) * barMaxWidth}px`, marginBottom: 40
        }}></div>
      </div>

      <div style={{ textAlign: 'left' }}>
        <h3>Sample Income Sources</h3>
        <ul>
          <li>Salary - ₹40000</li>
          <li>Freelance - ₹13000</li>
        </ul>

        <h3>Sample Expenses</h3>
        <ul>
          <li>Groceries - ₹15000</li>
          <li>Utilities - ₹8000</li>
          <li>Entertainment - ₹5000</li>
        </ul>
      </div>
    </div>
  );
}

export default Preview;

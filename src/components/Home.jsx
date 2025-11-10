import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedIncome = JSON.parse(localStorage.getItem('incomeSources')) || [];
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setIncomeSources(savedIncome);
    setExpenses(savedExpenses);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
    alert('Logged out successfully');
  };

  const totalIncome = incomeSources.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const savings = totalIncome - totalExpenses;

  const barMaxWidth = 160;
  const maxValue = Math.max(totalIncome, totalExpenses, 1);

  const recentIncomes = incomeSources.slice(-5).reverse();
  const recentExpenses = expenses.slice(-5).reverse();

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      color: '#1f2937',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          borderRadius: '6px',
          border: 'none',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '1rem',
          backgroundColor: '#ef4444',
          color: 'white',
          transition: 'background-color 0.3s ease',
        }}
      >
        Logout
      </button>


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
          <div style={{
            background: '#fff',
            padding: 24,
            borderRadius: 14,
            minWidth: 320
          }}>
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

      <nav style={{ marginBottom: '20px' }}>
        <ul style={{
          display: 'flex',
          gap: '24px',
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          <li><Link to='/home' style={{ textDecoration: 'none' }}>Home</Link></li>
          <li><Link to='/about' style={{ textDecoration: 'none' }}>About</Link></li>
          <li><Link to='/contact' style={{ textDecoration: 'none' }}>Contact</Link></li>
        </ul>
      </nav>

      <aside style={{ marginBottom: '40px' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '16px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          <Link to="/income" style={{
            padding: '12px 28px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
          }}>Add Income</Link>
          <Link to="/expenses" style={{
            padding: '12px 28px',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
          }}>Add Expense</Link>
        </div>
      </aside>

      <h1 style={{ marginBottom: '32px', fontWeight: '700' }}>Dashboard</h1>

      <div style={{ display: 'flex', gap: '32px', marginBottom: '48px' }}>
        {[
          { label: 'Total Income', value: totalIncome, color: '#2563eb' },
          { label: 'Total Expenses', value: totalExpenses, color: '#dc2626' },
          { label: 'Savings', value: savings, color: savings >= 0 ? '#16a34a' : '#991b1b' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            backgroundColor: '#f3f4f6',
            borderRadius: '12px',
            padding: '24px',
            width: '220px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.07)',
          }}>
            <h3 style={{ margin: 0, fontWeight: '700', marginBottom: '14px', color }}>{label}</h3>
            <p style={{ fontWeight: '600', fontSize: '1.8rem', margin: 0 }}>₹{value.toFixed(2)}</p>
            <div style={{
              height: '14px',
              backgroundColor: color,
              width: `${(Math.abs(value) / maxValue) * barMaxWidth}px`,
              borderRadius: '7px',
              marginTop: '12px',
              marginLeft: 'auto',
              marginRight: 'auto',
              transition: 'width 0.3s ease',
            }} />
          </div>
        ))}
      </div>

      <section style={{ width: '100%', maxWidth: '560px', marginBottom: '48px' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '12px' }}>Recent Income Entries</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {recentIncomes.length ? recentIncomes.map((i, idx) => (
            <li key={idx} style={{
              padding: '8px 12px',
              backgroundColor: '#e0f2fe',
              marginBottom: '8px',
              borderRadius: '8px',
            }}>
              {i.source} — ₹{i.amount} — {i.date}
            </li>
          )) : <p>No recent income entries</p>}
        </ul>
      </section>

      <section style={{ width: '100%', maxWidth: '560px' }}>
        <h2 style={{ fontWeight: '700', marginBottom: '12px' }}>Recent Expenses Entries</h2>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {recentExpenses.length ? recentExpenses.map((e, idx) => (
            <li key={idx} style={{
              padding: '8px 12px',
              backgroundColor: '#fee2e2',
              marginBottom: '8px',
              borderRadius: '8px',
            }}>
              {e.source} — ₹{e.amount} — {e.date}
            </li>
          )) : <p>No recent expense entries</p>}
        </ul>
      </section>
    </div>
  );
}

export default Home;

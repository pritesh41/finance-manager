import React, { useState } from 'react';
import { database } from './firebase';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import './login.css';
import { useNavigate } from 'react-router-dom';

function Login({ switchToSignup, onClose, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const usersRef = ref(database, 'users');
      const emailQuery = query(usersRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);

      if (snapshot.exists()) {
        let userFound = false;
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          if (user.password === password) {
            userFound = true;
          }
        });
        if (userFound) {
          alert('Login Successful!');
          onLoginSuccess();
          onClose();
          navigate('/home');
        } else {
          alert('Incorrect password. Please try again.');
        }
      } else {
        alert('User not found. Please sign up.');
      }
    } catch (error) {
      if (error.message.includes('index')) {
        alert('Login failed due to missing database index. Please add ".indexOn": "email" in your Firebase Realtime Database rules.');
      } else {
        alert('Login failed: ' + error.message);
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br />
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            style={{ paddingRight: '30px' }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            style={{
              position: 'absolute',
              right: 6,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={switchToSignup} className="switch-btn">Sign up</button>
      </p>
      <button onClick={onClose} className="close-btn">Close</button>
    </div>
  );
}

export default Login;

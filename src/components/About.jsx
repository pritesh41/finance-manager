import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f9fafb', minHeight: '100vh', padding: '20px' }}>
      <nav style={{
        backgroundColor: '#2563eb',
        padding: '12px 24px',
        borderRadius: '8px',
        marginBottom: '40px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <ul style={{
          display: 'flex',
          gap: '30px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          color: '#fff',
          fontWeight: '600',
          fontSize: '1.1rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <li>
            <Link to='/home' style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.3s ease' }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Home
            </Link>
          </li>
          <li>
            <Link to='/about' style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.3)' }}>
              About
            </Link>
          </li>
          <li>
            <Link to='/contact' style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.3s ease' }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <header style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 8px 20px rgba(0,0,0,0.08)',
        maxWidth: '700px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '16px', color: '#1e40af' }}>About Finance Manager</h1>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.6', color: '#4b5563' }}>
          Finance Manager is your trusted companion for tracking income and expenses efficiently. Our mission is to empower you with insightful dashboards, easy entries, and quick actions to help you manage your personal finances with confidence and ease.
        </p>
        <p style={{ fontSize: '1rem', color: '#6b7280', marginTop: '12px' }}>
          Whether you are budgeting for the month, planning for savings, or analyzing your expenses, our app is designed to provide clarity and control at your fingertips.
        </p>
      </header>
    </div>
  );
}

export default About;

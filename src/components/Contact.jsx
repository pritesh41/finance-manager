import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
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
            <Link to='/about' style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', transition: 'background-color 0.3s ease' }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              About
            </Link>
          </li>
          <li>
            <Link to='/contact' style={{ color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.3)' }}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <main style={{
        backgroundColor: 'white',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#2563eb', textAlign: 'center' }}>Contact Us</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <input
            type="text"
            placeholder="Your Name"
            required
            style={{
              padding: '12px 16px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            style={{
              padding: '12px 16px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'}
          />
          <textarea
            placeholder="Your Message"
            rows="6"
            required
            style={{
              padding: '12px 16px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              outline: 'none',
              resize: 'vertical',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={e => e.target.style.borderColor = '#2563eb'}
            onBlur={e => e.target.style.borderColor = '#d1d5db'}
          ></textarea>
          <button
            type="submit"
            style={{
              padding: '14px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '700',
              border: 'none',
              backgroundColor: '#2563eb',
              color: 'white',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#1e40af'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#2563eb'}
          >Send Message</button>
        </form>

        <div style={{ marginTop: 40, textAlign: 'center', fontSize: '1rem', color: '#374151' }}>
          <p>Contact us at: <a href="mailto:contact@example.com" style={{ color: '#2563eb', textDecoration: 'none' }}>contact@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890" style={{ color: '#2563eb', textDecoration: 'none' }}>+1 234 567 890</a></p>
          <div style={{ marginTop: 16 }}>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" style={{ margin: '0 12px', color: '#e1306c', fontSize: '1.5rem' }}>Instagram</a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" style={{ margin: '0 12px', color: '#0a66c2', fontSize: '1.5rem' }}>LinkedIn</a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer" style={{ margin: '0 12px', color: '#1da1f2', fontSize: '1.5rem' }}>Twitter</a>
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noreferrer" style={{ margin: '0 12px', color: '#1877f2', fontSize: '1.5rem' }}>Facebook</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contact;

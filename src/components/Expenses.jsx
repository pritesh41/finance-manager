import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  // Load saved expenses from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(saved);
  }, []);

  // Save current expenses to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Handle adding or updating an expense
  const handleAdd = (e) => {
    e.preventDefault();
    if (!source || !amount || !date) return;
    if (editIndex >= 0) {
      // Update existing expense
      const updated = [...expenses];
      updated[editIndex] = { source, amount: parseFloat(amount), date };
      setExpenses(updated);
      setEditIndex(-1);
    } else {
      // Add new expense
      setExpenses([...expenses, { source, amount: parseFloat(amount), date }]);
    }
    setSource('');
    setAmount('');
    setDate('');
  };

  // Handle editing an existing expense
  const handleEdit = (index) => {
    const item = expenses[index];
    setSource(item.source);
    setAmount(item.amount.toString());
    setDate(item.date);
    setEditIndex(index);
  };

  // Handle removing an expense
  const handleRemove = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    if (index === editIndex) {
      setSource('');
      setAmount('');
      setDate('');
      setEditIndex(-1);
    }
  };

  // Handle removing all expenses
  const handleRemoveAll = () => {
    setExpenses([]);
    localStorage.setItem('expenses', JSON.stringify([]));
    setEditIndex(-1);
    setSource('');
    setAmount('');
    setDate('');
  };

  // Calculate total expenses amount
  const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <div>
      <div className="nav-bar">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </div>
      <h1>This is Expenses Page</h1>
      <div className="pages">
        <ul>
          <li><Link to='/income'>Income Source</Link></li>
          <li><Link to='/expenses'>Expenses</Link></li>
          <li><Link to='/budget'>Budget</Link></li>
          <li><Link to='/report'>Monthy Report</Link></li>
        </ul>
      </div>
      <form className="input" onSubmit={handleAdd}>
        <input
          type="text"
          required
          placeholder='Enter Expenses'
          value={source}
          onChange={e => setSource(e.target.value)}
          disabled={editIndex >= 0}  // source not editable in edit mode to avoid confusion
        />
        <input
          type="number"
          required
          placeholder='Amount'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <input
          type="date"
          required
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input type="submit" value={editIndex >= 0 ? "Update Expense" : "Add Amount"} />
      </form>
      <div>
        <h3>All Expenses</h3>
        <ul>
          {expenses.map((item, idx) => (
            <li key={idx}>
              {item.source} — ₹{item.amount} — {item.date} {' '}
              <button onClick={() => handleEdit(idx)}>Edit</button>
              <button onClick={() => handleRemove(idx)}>Remove</button>
            </li>
          ))}
        </ul>
        <div style={{ margin: '16px 0', textAlign: 'center', fontSize: '1.15rem', fontWeight: 600 }}>
          Total Expenses: ₹{totalAmount}
        </div>
        <div>
          {expenses.length > 0 && (
            <button
              style={{
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '7px',
                padding: '8px 24px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '6px'
              }}
              onClick={handleRemoveAll}
            >
              Delete All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Expenses;

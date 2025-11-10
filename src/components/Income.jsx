import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './income.css';

function Income() {
  const [incomeSources, setIncomeSources] = useState([]);
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('incomeSources')) || [];
    setIncomeSources(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('incomeSources', JSON.stringify(incomeSources));
  }, [incomeSources]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!source || !amount || !date) return;

    if (editIndex >= 0) {
      // Update mode
      const updatedList = [...incomeSources];
      updatedList[editIndex] = { source, amount: parseFloat(amount), date };
      setIncomeSources(updatedList);
      setEditIndex(-1);
    } else {
      setIncomeSources([...incomeSources, { source, amount: parseFloat(amount), date }]);
    }

    setSource('');
    setAmount('');
    setDate('');
  };

  const handleEdit = (index) => {
    const item = incomeSources[index];
    setSource(item.source);
    setAmount(item.amount.toString());
    setDate(item.date);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    const updated = incomeSources.filter((_, i) => i !== index);
    setIncomeSources(updated);
    if (index === editIndex) {
      setSource('');
      setAmount('');
      setDate('');
      setEditIndex(-1);
    }
  };

  const handleRemoveAll = () => {
    setIncomeSources([]);
    localStorage.setItem('incomeSources', JSON.stringify([]));
    setEditIndex(-1);
    setSource('');
    setAmount('');
    setDate('');
  };

  const totalIncome = incomeSources.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <div>
      <div className="nav-bar">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <h1>This is income Page</h1>
      <div className="pages">
        <ul>
          <li><Link to="/income">Income Source</Link></li>
          <li><Link to="/expenses">Expenses</Link></li>
          <li><Link to="/budget">Budget</Link></li>
          <li><Link to="/report">Monthy Report</Link></li>
        </ul>
      </div>
      <form className="input" onSubmit={handleAdd}>
        <input
          type="text"
          required
          placeholder="Enter Income Source"
          value={source}
          onChange={e => setSource(e.target.value)}
          disabled={editIndex >= 0} 
        />
        <input
          type="number"
          required
          placeholder="Income Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <input
          type="date"
          required
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input type="submit" value={editIndex >= 0 ? "Update Income" : "Add Income"} />
      </form>
      <div>
        <h3>Saved Income Sources</h3>
        <ul>
          {incomeSources.map((item, idx) => (
            <li key={idx}>
              {item.source} — ₹{item.amount} — {item.date}
              <button onClick={() => handleEdit(idx)}>Edit</button>
              <button onClick={() => handleRemove(idx)}>Remove</button>
            </li>
          ))}
        </ul>
        <div style={{ margin: '16px 0', textAlign: 'center', fontSize: '1.15rem', fontWeight: 600 }}>
          Total Income: ₹{totalIncome}
        </div>
        <div style={{ textAlign: 'center' }}>
          {incomeSources.length > 0 && (
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

export default Income;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Report() {
  const [incomeSources, setIncomeSources] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedIncome = JSON.parse(localStorage.getItem('incomeSources')) || [];
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setIncomeSources(savedIncome);
    setExpenses(savedExpenses);
  }, []);

  // Calculate totals
  const totalIncome = incomeSources.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const savings = totalIncome - totalExpenses;

  // Simple bar chart styling
  const barWidth = 200;
  const maxAmount = Math.max(totalIncome, totalExpenses, 1); // avoid div zero width

  return (
    <div>
      <div className="nav-bar" >
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </div>
      <h1>This is Report Page</h1>
      <div className="pages">
        <ul>
          <li><Link to='/income'>Income Source</Link></li>
          <li><Link to='/expenses'>Expenses</Link></li>
          <li><Link to='/budget'>Budget</Link></li>
          <li><Link to='/report'>Monthly Report</Link></li>
        </ul>
      </div>

      <h2>Monthly Financial Summary</h2>
      
      <div>
        <strong>Total Income:</strong> ₹{totalIncome.toFixed(2)}
        <div style={{ background: '#38bdf8', width: `${(totalIncome / maxAmount) * barWidth}px`, height: '20px', borderRadius: '6px' }}></div>
      </div>

      <div>
        <strong>Total Expenses:</strong> ₹{totalExpenses.toFixed(2)}
        <div style={{ background: '#ef4444', width: `${(totalExpenses / maxAmount) * barWidth}px`, height: '20px', borderRadius: '6px' }}></div>
      </div>

      <div>
        <strong>Savings:</strong> ₹{savings.toFixed(2)}
        <div style={{ background: savings >= 0 ? '#22c55e' : '#b91c1c', width: `${(Math.abs(savings) / maxAmount) * barWidth}px`, height: '20px', borderRadius: '6px' }}></div>
      </div>
    </div>
  );
}

export default Report;

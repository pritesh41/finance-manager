import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  // Load budgets from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('budgets')) || [];
    setBudgets(saved);
  }, []);

  // Save budgets to localStorage when changed
  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  // Load expenses from localStorage
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  }, []);

  // Add a new budget
  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!category || !amount) return;
    setBudgets([
      ...budgets,
      { category, amount: parseFloat(amount) }
    ]);
    setCategory('');
    setAmount('');
  };

  // Remove a budget
  const handleRemoveBudget = (idx) => {
    setBudgets(budgets.filter((_, i) => i !== idx));
  };

  // Calculate total spent per category
  const spentInCategory = (cat) => 
    expenses
      .filter(exp => exp.source && exp.source.toLowerCase() === cat.toLowerCase())
      .reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div>
      <div className="nav-bar" >
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </div>
      <h1>This is Budget Page</h1>
      <div className="pages">
        <ul>
          <li><Link to='/income'>Income Source</Link></li>
          <li><Link to='/expenses'>Expenses</Link></li>
          <li><Link to='/budget'>Budget</Link></li>
          <li><Link to='/report'>Monthy Report</Link></li>
        </ul>
      </div>
      <form onSubmit={handleAddBudget}>
        <input 
          type="text" 
          placeholder="Budget Category (e.g. groceries, movies)" 
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        <input 
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />
        <input type="submit" value="Set Budget" />
      </form>
      <div>
        <h3>Budgets for Categories</h3>
        <ul>
          {budgets.map((b, idx) => {
            const spent = spentInCategory(b.category);
            const exceeded = spent > b.amount;
            return (
              <li key={idx}>
                <span>
                  {b.category}: ₹{b.amount} (Spent: ₹{spent}) 
                  {exceeded && <strong> — Over Budget!</strong>}
                </span>
                <button onClick={() => handleRemoveBudget(idx)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Budget;

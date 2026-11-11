import { useState,useEffect } from 'react'
import './App.css'

function ExpenseItem(props) {
  return <p>{props.title}: {props.amount} <button onClick={props.onEdit}>Edit</button><button onClick={props.onDelete}>Delete</button></p>
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/expenses')
    .then((res) => res.json())
    .then((data) => setExpenses(data));
  }, [])
function handleAdd() {
 setError('');
  fetch('http://localhost:3000/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ title, amount: Number(amount) }),
  })
  .then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.error);
      });
    }
    return res.json();
})
  .then((newExpenses) => {
    setExpenses([...expenses, newExpenses])
    setTitle('');
    setAmount('');
})
.catch((err) => setError(err.message));
}

function handleDelete(id) {
  fetch('http://localhost:3000/expenses/' + id, { method: 'DELETE'})
  .then(() => setExpenses(expenses.filter((e) => e.id !== id)))
  .catch((err) => alert('Failed' + err.message));
}

function handleEdit(expense) {
  setEditingId(expense.id);
  setTitle(expense.title);
  setAmount(expense.amount);
}

function handleSave() {
setError(''); 
  fetch('http://localhost:3000/expenses/ ' + editingId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, amount: Number(amount)}),
  })
   .then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.error);
      });
    }
    return res.json();
  })
  .then((updated) => {
    setExpenses(expenses.map((e) => (e.id === editingId ? updated : e)));
    setEditingId(null);
    setTitle('');
    setAmount('');
  })
  .catch((err) => setError(err.message));
}

  return (
  
      <section id="center">
          <h1> My Expenses</h1>
          <input value={title} onChange={ (e) => setTitle(e.target.value)} placeholder='Title' />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' />
          <button onClick={editingId === null ? handleAdd : handleSave}>{editingId === null ? 'Add' : 'Save'}</button>
         {error && <p style={{ color: 'red'}}>{error}</p>}
         {expenses.map((e) => (
          <ExpenseItem key={e.id} title={e.title} amount={e.amount} onDelete={() => handleDelete(e.id)} onEdit={() => handleEdit(e)} />
         ))}
      </section>
  )
}

export default App

import { useState,useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function ExpenseItem(props) {
  return <p>{props.title}: {props.amount} <button onClick={props.onEdit}>Edit</button><button onClick={props.onDelete}>Delete</button></p>
}

function App() {
  const [count, setCount] = useState(0)
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/expenses')
    .then((res) => res.json())
    .then((data) => setExpenses(data));
  }, [])
function handleAdd() {
  fetch('http://localhost:3000/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ title, amount: Number(amount) }),
  })
  .then((res) => res.json())
  .then((newExpenses) => {
    setExpenses([...expenses, newExpenses])
    setTitle('');
    setAmount('');
})
.catch((err) => alert('Failed: ' + err.message));
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
  fetch('http://localhost:3000/expenses/ ' + editingId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, amount: Number(amount)}),
  })
  .then((res) => res.json())
  .then((updated) => {
    setExpenses(expenses.map((e) => (e.id === editingId ? updated : e)));
    setEditingId(null);
    setTitle('');
    setAmount('');
  })
  .catch((err) => alert('Failed: ' + err.message));
}

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1> My Expenses</h1>
          <input value={title} onChange={ (e) => setTitle(e.target.value)} placeholder='Title' />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' />
          <button onClick={editingId === null ? handleAdd : handleSave}>{editingId === null ? 'Add' : 'Save'}</button>
         {expenses.map((e) => (
          <ExpenseItem key={e.id} title={e.title} amount={e.amount} onDelete={() => handleDelete(e.id)} onEdit={() => handleEdit(e)} />
         ))}
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

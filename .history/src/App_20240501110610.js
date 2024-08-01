import { useState } from 'react';
import './index.css';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Chargher", quantity: 11, packed: true },
];

function Logo() {
  return <h1>Far Away</h1>
}

function Form() {
  const [description, setDescription] = useState();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select onChange={e=>setDescription(e.target.value)}>
      {
        Array.from({ length: 20 }, (_, i) => i + 1).map(
          (num) => <option value={num} key={num}>{num}</option>
        )
      }
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={e=>setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
  )
}

function Item({ item: { description, quantity, packed } }) {
  return <li>
    <span style={packed ? { textDecoration: "line-through"} : {}}>{quantity} {description}</span>
    <button>❌</button>
  </li>
}

function PackagingList() {
  return <div className="list">
    <ul>{
      initialItems.map(item => <Item key={item.id} item={item}/>)
    }</ul>
  </div>
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        You have X items on your list and you already packed X (X%)
      </em>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackagingList />
      <Stats />
    </div>
  );
}

export default App;

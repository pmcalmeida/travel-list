import { useState, useEffect } from 'react';
import './index.css';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Chargher", quantity: 11, packed: true },
];

function Logo() {
  return <h1>Far Away</h1>
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: initialItems.length + 2 };
    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select onChange={e=>setQuantity(Number(e.target.value))} value={quantity}>
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

function Item({ item: { id, description, quantity, packed }, onDeleteItem, onCheckItem }) {
  return <li>
    <input type="checkbox" onChange={() => onCheckItem(id)} checked={packed}/>
    <span style={packed ? { textDecoration: "line-through"} : {}}>{quantity} {description}</span>
    <button onClick={() => onDeleteItem(id)}>❌</button>
  </li>
}

function PackagingList({ items, onDeleteItem, onCheckItem }) {
  const [sortBy, setSortBy] = useState("input");

  const sortedItems = items.slice().sort((a, b) => {
    if (sortBy === "input") {
      return a.id - b.id;
    }
    if (sortBy === "description") {
      return a.description.localeCompare(b.description);
    }
    if (sortBy === "packed") {
      return Number(a.packed) - Number(b.packed)
    }
    return 0;
  });

  return (
    <div className="list">
      <ul>{
        sortedItems.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onCheckItem={onCheckItem}/>)
      }</ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">input</option>
          <option value="description">description</option>
          <option value="packed">packed</option>
        </select>
      </div>
    </div>
  )
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        You have {numItems} items on your list and you already packed {numPacked} ({percentage}%)
      </em>
    </footer>
  )
}

function App() {
  const [items, setItems] = useState(initialItems);

  const handleAddItems = (newItem) => {
    setItems([...items, newItem]);
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  }

  const handleCheckItem = (id) => {
    const updatedItems = items.map((item) => {
      return (item.id === id) ? { ...item, packed: !item.packed } : item;
    });
    setItems(updatedItems);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackagingList items={items} onDeleteItem={handleDeleteItem} onCheckItem={handleCheckItem}/>
      <Stats items={items}/>
    </div>
  );
}

export default App;

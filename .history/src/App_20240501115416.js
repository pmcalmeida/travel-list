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
    <input type="checkbox" onChange={(e) => onCheckItem(e.target.value)}/>
    <span style={packed ? { textDecoration: "line-through"} : {}}>{quantity} {description}</span>
    <button onClick={() => onDeleteItem(id)}>❌</button>
  </li>
}

function PackagingList({ items, onDeleteItem, onCheckItem }) {
  return <div className="list">
    <ul>{
      items.map(item => <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onCheckItem={onCheckItem}/>)
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
  const [items, setItems] = useState(initialItems);

  const handleAddItems = (newItem) => {
    setItems([...items, newItem]);
  }

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  }

  const handleCheckItem = (checked) => {
    console.log(checked);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackagingList items={items} onDeleteItem={handleDeleteItem} onCheckItem={handleCheckItem}/>
      <Stats />
    </div>
  );
}

export default App;

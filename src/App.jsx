import React, { useState } from 'react';
import "./index.css";
import Login from './Pages/Login';
import { SIGN_OUT_SCOPES } from '@supabase/supabase-js';
import SignUp from './Pages/Signup';
import Navbar from './navbar/navbar';
// sb_publishable_F6eS6VIAapARHz8kKXTZHg_smnY3LAH
//   https://ljwbtuxtevvfbgubcsbi.supabase.co/rest/v1/
const initialData = [
  { id: 1, title: 'Today', cards: ['Coding', 'Google Research'] },
  { id: 2, title: 'This Week', cards: ['Google Design'] },
  { id: 3, title: 'Later', cards: ['Google Documentary'] },
];

function App() {
  const [data, setData] = useState(initialData);

  // 1. Add Card
  const addCard = (listId) => {
    const cardText = prompt("Enter task name:");
    if (!cardText) return;
    setData(data.map(list =>
      list.id === listId ? { ...list, cards: [...list.cards, cardText] } : list
    ));
  };

  // 2. Delete Card
  const deleteCard = (listId, cardIndex) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setData(data.map(list => {
        if (list.id === listId) {
          const newCards = list.cards.filter((_, index) => index !== cardIndex);
          return { ...list, cards: newCards };
        }
        return list;
      }));
    }
  };

  // 3. Edit Card
  const editCard = (listId, cardIndex, oldText) => {
    const newText = prompt("Edit your task:", oldText);
    if (!newText || newText === oldText) return;

    setData(data.map(list => {
      if (list.id === listId) {
        const newCards = [...list.cards];
        newCards[cardIndex] = newText;
        return { ...list, cards: newCards };
      }
      return list;
    }));
  };

  // 4. Add List
  const addList = () => {
    const title = prompt("Enter list title:");
    if (!title) return;
    setData([...data, { id: Date.now(), title, cards: []}]);
  };

  return (
    <div className="trello-wrapper">
      
      <main className="board-container">
        <header className="board-header">
          <h2>My Trello board</h2>
        </header>

        <div className="lists-container">
          {data.map((list) => (
            <div key={list.id} className="list-column">
              <div className="list-header" style={{ borderTop: `5px solid ${list.color}` }}>
                {list.title}
              </div>
              <div className="cards-area">
                {list.cards.map((card, index) => (
                  <div key={index} className="card">
                    <span>{card}</span>
                    <div className="card-actions">
                      <button onClick={() => editCard(list.id, index, card)} title="Edit">Edit</button>
                      <button onClick={() => deleteCard(list.id, index)} title="Delete">Delete</button>
                    </div>
                  </div>
                ))}
                <button className="add-card-btn" onClick={() => addCard(list.id)}>
                  + Add a card
                </button>
              </div>
            </div>
          ))}
          <div className="add-list-column" onClick={addList}>
            + Add another list
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
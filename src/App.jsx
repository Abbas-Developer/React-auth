import React, { useState, useEffect } from 'react';
import { supabase } from './Supabase/supabaseClient';
import "./index.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  async function fetchBoards() {
    const { data: boards, error } = await supabase
      .from('crud-table')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) console.error(error);
    else setData(boards || []);
    setLoading(false);
  }

  const addCard = async (listId, currentCards) => {
    const cardText = prompt("Enter task name:");
    if (!cardText) return;

    const newCards = [...(currentCards || []), cardText];

    const { error } = await supabase
      .from('crud-table')
      .update({ cards: newCards })
      .eq('id', listId);

    if (!error) fetchBoards();
  };

  const deleteCard = async (listId, cardIndex, currentCards) => {
    if (!window.confirm("Are you sure?")) return;

    const newCards = currentCards.filter((_, index) => index !== cardIndex);

    const { error } = await supabase
      .from('crud-table')
      .update({ cards: newCards })
      .eq('id', listId);

    if (!error) fetchBoards();
  };

  const editCard = async (listId, cardIndex, currentCards) => {
    const oldText = currentCards[cardIndex];
    const newText = prompt("Edit your task:", oldText);
    if (!newText || newText === oldText) return;

    const newCards = [...currentCards];
    newCards[cardIndex] = newText;

    const { error } = await supabase
      .from('crud-table')
      .update({ cards: newCards })
      .eq('id', listId);

    if (!error) fetchBoards();
  };

  const addList = async () => {
    const title = prompt("Enter list title:");
    if (!title) return;

    const { error } = await supabase
      .from('crud-table')
      .insert([{ title, cards: [] }]);

    if (!error) fetchBoards();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="trello-wrapper">
      <main className="board-container">
        <header className="board-header">
          <h2>My Trello Board</h2>
        </header>

        <div className="lists-container">
          {data.map((list) => (
            <div key={list.id} className="list-column">
              <div className="list-header">{list.title}</div>
              <div className="cards-area">
                {(list.cards || []).map((card, index) => (
                  <div key={index} className="card">
                    <span>{card}</span>
                    <div className="card-actions">
                      <button onClick={() => editCard(list.id, index, list.cards)}>Edit</button>
                      <button onClick={() => deleteCard(list.id, index, list.cards)}>Delete</button>
                    </div>
                  </div>
                ))}
                <button className="add-card-btn" onClick={() => addCard(list.id, list.cards)}>
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
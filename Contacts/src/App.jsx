import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    fetchContacts();
  }, []);
  
  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:8080/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowForm(false);
  };
  
  const handleAddContact = async (newContact) => {
    try {
      const response = await fetch('http://localhost:8080/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });
      
      if (response.ok) {
        fetchContacts();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };
  
  return (
    <div className="app">
      <header>
        <h1>Contacts</h1>
        <button className="add-button" onClick={() => {
          setShowForm(true);
          setSelectedContact(null);
        }}>
          Add Contact
        </button>
      </header>
      
      <div className="content">
        <ContactList contacts={contacts} onContactClick={handleContactClick} selectedId={selectedContact?.id} />
        
        <div className="details-container">
          {showForm ? ( <ContactForm onSubmit={handleAddContact} /> ) 
          : selectedContact ? ( <ContactDetails contact={selectedContact} /> ) : (
            <div className="placeholder">
              <p>Select or Add Contact</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
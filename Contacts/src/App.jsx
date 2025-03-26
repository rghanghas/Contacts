import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import ContactForm from './ContactForm';
import LoginForm from './LoginForm';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    if (currentUser) {
      fetchContacts();
    }
  }, [currentUser]);
  
  const fetchContacts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/contacts/${currentUser.id}`);
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
    setEditMode(false);
  };

  const handleAddNew = () => {
    setShowForm(true);
    setSelectedContact(null);
    setEditMode(false);
  }

  const handleEditClick = () => {
    setShowForm(true);
    setEditMode(true);
  }
  
  const handleAddContact = async (newContact) => {
    try {
      const contactWithUserId = {
        ...newContact,
        userId: currentUser.id
      };

      const response = await fetch('http://localhost:8080/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactWithUserId),
      });
      
      if (response.ok) {
        fetchContacts();
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleUpdateContact = async (updatedContact) => {
    try {
      const contactWithUserId = {
        ...updatedContact,
        userId: currentUser.id
      };

      const response = await fetch('http://localhost:8080/contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactWithUserId),
      });
      if(response.ok) {
        fetchContacts();
        setSelectedContact(updatedContact);
        setShowForm(false);
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  }

  const handleDeleteContact = async (id) => {
    if(window.confirm('Want to delete?')) {
      try {
        const response = await fetch(`http://localhost:8080/contacts/${id}`, {
          method: 'DELETE',
        });
        if(response.ok) {
          fetchContacts();
          setSelectedContact(null);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  }

  const handleLogin = (user) => {
    setCurrentUser(user);
  }

  const handleLogout = () => {
    setCurrentUser(null);
    setContacts([]);
    setSelectedContact(null);
  }
  
  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header>
        <h1>Contacts</h1>
        <div className="header-right">
          <div className="user-info">
            <span>Welcome, {currentUser.name}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
          <button className="add-button" onClick={handleAddNew}>
            Add Contact
          </button>
        </div>
      </header>
      
      <div className="content">
        <ContactList contacts={contacts} onContactClick={handleContactClick} selectedId={selectedContact?.id} />
        
        <div className="details-container">
          {showForm ? ( 
            <ContactForm 
              onSubmit={editMode ? handleUpdateContact : handleAddContact} 
              initialData={editMode ? selectedContact : null}
              formTitle={editMode ? "Edit Contact" : "Add New Contact"} 
            /> 
          ) : selectedContact ? ( 
            <ContactDetails contact={selectedContact} onEdit={handleEditClick} onDelete={() => handleDeleteContact(selectedContact.id)} /> 
          ) : (
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
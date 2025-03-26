import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? 'register' : 'login';
      const response = await fetch(`http://localhost:8080/users/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
      } else {
        const errorMsg = await response.text();
        alert(errorMsg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required={isRegister} />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-actions">
          <button type="submit"> {isRegister ? 'Register' : 'Login'} </button>
          <p onClick={() => setIsRegister(!isRegister)} style={{cursor: 'pointer', color: 'blue'}}>
            {isRegister ? 'Already have an account? Login' : 'New User'}
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
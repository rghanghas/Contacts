import React from 'react';

function ContactDetails({ contact }) {
  return (
    <div className="contact-details">
      <h2>Contact Details</h2>
      <div className="detail-item">
        <label>First Name:</label>
        <span>{contact.firstName}</span>
      </div>
      <div className="detail-item">
        <label>Last Name:</label>
        <span>{contact.lastName}</span>
      </div>
      <div className="detail-item">
        <label>Email:</label>
        <span>{contact.email}</span>
      </div>
      <div className="detail-item">
        <label>Phone:</label>
        <span>{contact.phoneNumber}</span>
      </div>
    </div>
  );
}

export default ContactDetails;
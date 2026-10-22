import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validation Logic
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.date) {
      tempErrors.date = "Date is required";
      isValid = false;
    }

    if (!formData.time) {
      tempErrors.time = "Time is required";
      isValid = false;
    }

    // Edge case: Guests must be between 1 and 10
    if (formData.guests < 1 || formData.guests > 10) {
      tempErrors.guests = "Guests must be between 1 and 10";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      console.log("Booking Data:", formData);
      // Here you would normally send data to an API
    }
  };

  return (
    <div className="app-container">
      <h1>Little Lemon Restaurant</h1>
      <h2>Book a Table</h2>

      {isSubmitted ? (
        <div className="success-message" role="alert">
          <h3>Booking Confirmed!</h3>
          <p>Thank you, {formData.name}. Your table for {formData.guests} is booked on {formData.date} at {formData.time}.</p>
          <button onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', date: '', time: '', guests: 1 }); }}>
            Book Another Table
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              aria-describedby="name-error"
            />
            {errors.name && <span id="name-error" className="error-text" role="alert">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              aria-describedby="email-error"
            />
            {errors.email && <span id="email-error" className="error-text" role="alert">{errors.email}</span>}
          </div>

          {/* Date Field */}
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              aria-describedby="date-error"
            />
            {errors.date && <span id="date-error" className="error-text" role="alert">{errors.date}</span>}
          </div>

          {/* Time Field */}
          <div className="form-group">
            <label htmlFor="time">Time *</label>
            <input 
              type="time" 
              id="time" 
              name="time" 
              value={formData.time} 
              onChange={handleChange} 
              aria-describedby="time-error"
            />
            {errors.time && <span id="time-error" className="error-text" role="alert">{errors.time}</span>}
          </div>

          {/* Guests Field */}
          <div className="form-group">
            <label htmlFor="guests">Number of Guests *</label>
            <input 
              type="number" 
              id="guests" 
              name="guests" 
              min="1" 
              max="10"
              value={formData.guests} 
              onChange={handleChange} 
              aria-describedby="guests-error"
            />
            {errors.guests && <span id="guests-error" className="error-text" role="alert">{errors.guests}</span>}
          </div>

          <button type="submit" className="submit-btn">Book Table</button>
        </form>
      )}
    </div>
  );
}

export default App;
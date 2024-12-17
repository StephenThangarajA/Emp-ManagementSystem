import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './style/Form.css';

const Form = () => {
  const [formData, setFormData] = useState({ name: '', age: '', email: '', phone: '', emp_id: '', emp_dept: '', emp_doj: '', emp_role: ''});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 20 || formData.age > 60) {
      newErrors.age = 'Age must be between 20 and 60';
    }
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) {
      newErrors.phoneNo = 'Phone Number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Enter a valid Phone Number';
    }
    if (!formData.emp_id) newErrors.emp_id = 'Employee Id is required';
    if (!formData.emp_dept) newErrors.emp_dept = 'Please select a Department';
    if (!formData.emp_doj) {
      newErrors.emp_doj = 'Please choose a Date';
    } else if (new Date(formData.emp_doj) > new Date()) {
      newErrors.emp_doj = 'Date of Joining cannot be in the future';
    }
    if (!formData.emp_role) newErrors.emp_role = 'Please select a Role';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/api/v1/employeemanagement/formpost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log('Response data:', responseData);
          alert(responseData.message || 'Employee details added to the database!');
          const emailResponse = await emailjs.send('service_3spj3sg','template_i4me2h5',e.target,'RyRHD8EOt-EpDBkL6');
          if (emailResponse.status === 200) {
            console.log('Email sent successfully:', emailResponse.text);
            alert('Employee details have been sent via email!');
          } else {
            console.error('Email sending failed:', emailResponse.text);
            alert('There was an issue sending the email.');
          }
          setFormData({ name: '', age: '', email: '', phone: '', emp_id: '', emp_dept: '', emp_doj: '', emp_role: ''});
          setErrors({});
          navigate('/home');
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          alert(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error posting form data:', error);
        alert('An error occurred while submitting the form. Please try again.');
      }
    }
  };

  const handleReset = () => {
    setFormData({ name: '', age: '', email: '', phone: '', emp_id: '', emp_dept: '', emp_doj: '', emp_role: ''});
    setErrors({});
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Employee Detail Form</h1>
      <form onSubmit={handleSubmit}>
        <h3>Personal Details</h3>
        <div className="form-group-1">
          <div className="form-group">
            <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`}/>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          <div className="form-group">
            <input type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleChange} className={`form-control ${errors.age ? 'is-invalid' : ''}`}/>
            {errors.age && <div className="error-message">{errors.age}</div>}
          </div>
        </div>
        <div className="form-group-2">
          <div className="form-group">
            <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="form-group">
            <input type="number" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} className={`form-control ${errors.phone ? 'is-invalid' : ''}`}/>
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
        </div>
        <h3 className="group-title">Job Details</h3>
        <div className="form-group-3">
          <div className="form-group">
            <input type="text" name="emp_id" placeholder="Employee ID *" value={formData.emp_id} onChange={handleChange} className={`form-control ${errors.emp_id ? 'is-invalid' : ''}`}/>
            {errors.emp_id && <div className="error-message">{errors.emp_id}</div>}
          </div>
          <div className="form-group">
            <select name="emp_dept" value={formData.emp_dept} onChange={handleChange} className={`form-select ${errors.emp_dept ? 'is-invalid' : ''}`}>
              <option value="">Department *</option>
              <option value="humanresource">Human Resource</option>
              <option value="finance">Finance</option>
              <option value="sales&marketing">Sales & Marketing</option>
              <option value="development&testing">Development & Testing</option>
              <option value="networking">Networking</option>
            </select>
            {errors.emp_dept && <div className="error-message">{errors.emp_dept}</div>}
          </div>
        </div>
        <div className="form-group-4">
          <div className="form-group">
            <input type="date" name="emp_doj" placeholder="DOJ *" max={new Date().toISOString().split('T')[0]} value={formData.emp_doj} onChange={handleChange} className={`form-control ${errors.emp_doj ? 'is-invalid' : ''}`}/>
            {errors.emp_doj && <div className="error-message">{errors.emp_doj}</div>}
          </div>
          <div className="form-group">
            <select name="emp_role" value={formData.emp_role} onChange={handleChange} className={`form-select ${errors.emp_role ? 'is-invalid' : ''}`}>
              <option value="">Role *</option>
              <option value="hr">HR</option>
              <option value="businessanalyst">Business Analyst</option>
              <option value="productmanager">Product Manager</option>
              <option value="developer">Developer</option>
              <option value="tester">Tester</option>
            </select>
            {errors.emp_role && <div className="error-message">{errors.emp_role}</div>}
          </div>
        </div>
        <div className="form-group-5">
          <div className="form-group">
            <button type="submit" className="btn submit-button">
              Submit
            </button>
          </div>
          <div className="form-group">
            <button type="button" className="btn reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
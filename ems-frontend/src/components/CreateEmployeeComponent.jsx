import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const CreateEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeFirstNameHandler = (event) => setFirstName(event.target.value);
  const changeLastNameHandler = (event) => setLastName(event.target.value);
  const changeEmailHandler = (event) => setEmail(event.target.value);

  const validateForm = () => {
    const errors = {};
    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const employee = { firstName, lastName, email };
    try {
      await EmployeeService.createEmployee(employee);
      setLoading(false);
      alert('Employee created successfully!');
      navigate('/employees');
    } catch (error) {
      setLoading(false);
      alert('Failed to create employee. Please try again.');
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    navigate('/employees');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center">Add Employee</h3>
          <div className="card-body">
            <form>
              <div className="form-group mb-3">
                <label>First Name:</label>
                <input
                  placeholder="First Name"
                  name="firstName"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={firstName}
                  onChange={changeFirstNameHandler}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="form-group mb-3">
                <label>Last Name:</label>
                <input
                  placeholder="Last Name"
                  name="lastName"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={lastName}
                  onChange={changeLastNameHandler}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
              <div className="form-group mb-3">
                <label>Email:</label>
                <input
                  placeholder="Email Address"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={changeEmailHandler}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <button
                className="btn btn-success me-2"
                onClick={saveEmployee}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                className="btn btn-danger"
                onClick={cancel}
                disabled={loading}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
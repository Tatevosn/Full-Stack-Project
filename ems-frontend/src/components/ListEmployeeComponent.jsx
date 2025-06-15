import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        EmployeeService.getEmployees()
            .then(res => {
                setEmployees(Array.isArray(res.data) ? res.data : []);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
                setEmployees([]);
            });
    };

    const deleteEmployee = (id) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        
        if (confirmDelete) {
            EmployeeService.deleteEmployee(id)
                .then(() => {
                    getAllEmployees(); // Refresh the list after deletion
                })
                .catch(error => {
                    console.error('Error deleting employee:', error);
                    alert('Failed to delete employee');
                });
        }
    };

    const addEmployee = () => {
        navigate('/add-employee');
    };

    const editEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    };

    const viewEmployee = (id) => {
        navigate(`/view-employee/${id}`);
    };

     return (
        <div>
            <h2 className="text-center">Employees List</h2>
            <div>
                <button className="btn btn-primary mb-2" onClick={() => navigate('/add-employee')}>
                    Add Employee
                </button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button 
                                        className="btn btn-info"
                                        onClick={() => navigate(`/update-employee/${employee.id}`)}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="btn btn-danger mx-2"
                                        onClick={() => deleteEmployee(employee.id)}
                                    >
                                        Delete
                                    </button>
                                    <button 
                                        className="btn btn-info"
                                        onClick={() => navigate(`/view-employee/${employee.id}`)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmployeeComponent;
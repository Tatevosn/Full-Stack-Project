import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function UpdateEmployeeComponent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            const { firstName, lastName, email } = res.data;
            setEmployee({ firstName, lastName, email });
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateEmployee = (e) => {
        e.preventDefault();
        EmployeeService.updateEmployee(employee, id).then(() => {
            navigate('/employees');
        });
    };

    const cancel = () => {
        navigate('/employees');
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">Update Employee</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name:</label>
                                    <input
                                        placeholder="First Name"
                                        name="firstName"
                                        className="form-control"
                                        value={employee.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input
                                        placeholder="Last Name"
                                        name="lastName"
                                        className="form-control"
                                        value={employee.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        placeholder="Email"
                                        name="email"
                                        className="form-control"
                                        value={employee.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className="btn btn-success" onClick={updateEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateEmployeeComponent;
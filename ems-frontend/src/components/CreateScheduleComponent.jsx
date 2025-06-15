import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import ScheduleService from '../services/ScheduleService';

function CreateScheduleComponent() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [schedule, setSchedule] = useState({
        date: '',
        shiftType: '',
        employeeIds: []
    });

    useEffect(() => {
        EmployeeService.getEmployees()
            .then(res => setEmployees(res.data))
            .catch(error => console.error('Error loading employees:', error));
    }, []);

    const handleChange = (e) => {
        setSchedule(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleEmployeeSelect = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => Number(option.value));
        setSchedule(prev => ({
            ...prev,
            employeeIds: selectedIds
        }));
    };

    const saveSchedule = (e) => {
        e.preventDefault();
        ScheduleService.createSchedule(schedule).then(() => {
            navigate('/schedule');
        });
    };

    return (
        <div className="container mt-3">
            <h2 className="text-center">Create New Schedule</h2>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group mb-3">
                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={schedule.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Shift:</label>
                            <select
                                name="shiftType"
                                className="form-control"
                                value={schedule.shiftType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Shift</option>
                                <option value="MORNING">Morning</option>
                                <option value="AFTERNOON">Afternoon</option>
                                <option value="NIGHT">Night</option>
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label>Employees:</label>
                            <select
                                multiple
                                name="employeeIds"
                                className="form-control"
                                value={schedule.employeeIds}
                                onChange={handleEmployeeSelect}
                                required
                            >
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.firstName} {emp.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className="btn btn-success" onClick={saveSchedule}>Save</button>
                        <button 
                            className="btn btn-danger mx-2" 
                            type="button"
                            onClick={() => navigate('/schedule')}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateScheduleComponent;
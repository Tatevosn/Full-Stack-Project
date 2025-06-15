import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import ScheduleService from '../services/ScheduleService';

function SchedulePage() {
    const [schedules, setSchedules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadSchedules();
    }, []);

    const loadSchedules = () => {
        ScheduleService.getSchedules()
            .then(res => {
                setSchedules(Array.isArray(res.data) ? res.data : []);
            })
            .catch(error => {
                console.error('Error loading schedules:', error);
                setSchedules([]);
            });
    };

    const handleAddSchedule = () => {
        navigate('/add-schedule');
    };

    return (
        <div className="container">
            <h2 className="text-center">Employee Schedules</h2>
            <div className="mb-3">
                <button className="btn btn-primary" onClick={handleAddSchedule}>
                    Add Schedule
                </button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Shift Type</th>
                            <th>Employees</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map(schedule => (
                            <tr key={schedule.id}>
                                <td>{schedule.date}</td>
                                <td>{schedule.shiftType}</td>
                                <td>
                                    {schedule.employees?.map(emp => 
                                        `${emp.firstName} ${emp.lastName}`
                                    ).join(', ')}
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-info btn-sm"
                                        onClick={() => navigate(`/edit-schedule/${schedule.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm mx-2"
                                        onClick={() => handleDelete(schedule.id)}
                                    >
                                        Delete
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

export default SchedulePage;
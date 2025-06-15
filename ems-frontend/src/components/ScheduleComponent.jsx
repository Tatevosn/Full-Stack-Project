import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleComponent = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/schedules');
      // Extract only the necessary data from the response
      const simplifiedSchedules = response.data.map(schedule => ({
        id: schedule.id,
        date: schedule.date,
        shiftType: schedule.shiftType,
        employees: schedule.employees ? schedule.employees.map(emp => ({
          id: emp.id,
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email
        })) : []
      }));
      setSchedules(simplifiedSchedules);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Schedule List</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Shift Type</th>
              <th>Employees</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.id}</td>
                <td>{schedule.date}</td>
                <td>{schedule.shiftType || 'Not assigned'}</td>
                <td>
                  {schedule.employees && schedule.employees.map(emp => (
                    <div key={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleComponent;